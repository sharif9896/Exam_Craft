import { User } from "../models/usermodels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    try{
        const user = await User.findOne({ email });
        if(user){
            return  res.status(400).json({ message: "User already exists" });
        }
        const saltRounds = 10;
        const hashboard = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, hashboard);
        const responde = await User.create({ username, email, password: hashedPassword });
        return res.status(201).json({ message: "User created successfully", user: responde });
    }catch(err){
        return res.status(500).json({ message: "Internal Server Error! Error in signup" });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const response = await User.findOne({ email });
        if(!response){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, response.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: response._id }, process.env.JWT_ADMIN, { expiresIn: '1d' });
        const cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        };
        res.cookie('token', token, cookieOption);
        return res.status(200).json({ message: "Login successful", user: response, token });

    }   catch(err){
        return res.status(500).json({ message: "Internal Server Error! Error in login" });
    }
}

const userprofile = async (req,res) => {
    try{
        const response = await User.find({});
        if(!response){
            res.status(400).josn({message: "No users found"});
        }

        return res.status(200).json({message: "Users found", users: response});
    }catch(err){
        return res.status(500).json({message: "Internal Server Error! Error in fetching users"});
    }
}
const userprofilebyId = async (req,res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({message: "User ID is required"});
    }
    try{
        const response = await User.findById(id);
        if(!response){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User found", user: response});
    }catch(e){
        return res.status(500).json({message: "Internal Server Error! Error in fetching user by ID"});
    }
}
export { signup, login, userprofile, userprofilebyId };