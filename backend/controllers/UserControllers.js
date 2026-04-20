import { redisClient } from "../index.js";
import { publishToQueue } from "../config/amqplib.js";
import TryCatch from "../middlewares/TryCatch.js";
import User from "../models/User.js";
import { generateToken } from "../config/Token.js";
import Staff from "../models/staffmodels.js";

const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;

    console.log(email);
    const staff_existing = await Staff.findOne({ email });
    if(!staff_existing){
        return res.status(404).json({ message: "Staff member not found. Please contact admin." });
    }
    const rateLimitKey = `otp:ratelimit:${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);

    // Check if the count has reached 5
    if (rateLimit && parseInt(rateLimit) >= 5) {
        return res.status(429).json({ message: "Too many OTP requests. Please try again later." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;

    // 1. Store the OTP
    await redisClient.set(otpKey, otp, { EX: 300 });

    // 2. Fix: Increment the rate limit count
    // If the key doesn't exist, INCR will create it starting at 0 and set it to 1.
    await redisClient.incr(rateLimitKey);

    // 3. Set expiry ONLY if it's the first attempt (to prevent resetting the timer)
    const ttl = await redisClient.ttl(rateLimitKey);
    if (ttl < 0) {
        await redisClient.expire(rateLimitKey, 60); 
    }

    const message = {
        to: email,
        subject: "ExamCraft Question Paper Setter - Your OTP Code",
        body: `Officially from DIYA PRO SOFT: Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await publishToQueue("send-otp", message);
    return res.status(200).json({ message: "OTP sent to email successfully.", email });
});


const verifyUser = TryCatch(async (req, res) => {
    const { email, otp } = req.body;
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);    
    
    if(!email || !storedOtp){
        return  res.status(400).json({ message: "OTP has expired or does not exist." });
    }
    let user = await User.findOne({email});
    if(!user){
        const name = email.slice(0,8);
        user = await User.create({name, email});
    }
    const token = generateToken(user);

    return res.json({
        message: "User Verified",
        user,
        token
    })
});


const myProfile = TryCatch(async (req, res) => {
    const {userId} = req;
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({
        message: "Profile retrieved successfully",
        user
    });
});

const updateUser = TryCatch(async (req, res) => {
    const {userId} = req;
    const user = await User.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    await user.save();

    const token = generateToken(user);

    return res.json({
        message: "User updated successfully",
        user, 
        token
    });
});

const getAllUsers = TryCatch(async (req, res) => {
    const users = await User.find().select("-password");    
    return res.json({
        message: "Users retrieved successfully",
        users
    });
});

const getUser = TryCatch(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");   
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({
        message: "User retrieved successfully",
        user
    });
});

export {loginUser, verifyUser, myProfile, updateUser, getAllUsers, getUser};