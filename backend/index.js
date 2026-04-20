import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/userroutes.js';
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express';
import syllabusRouter from './routes/Syllabusroutes.js';
import thingsRouter from './routes/AllowedThingsroutes.js';
import staffRouter from './routes/staffroutes.js';
import departmentRouter from './routes/Departmentroutes.js';
import classRouter from './routes/Classesroutes.js';
import questionPaperRoutes from './routes/questionPaperRoutes.js';
import notificationRouter from './routes/notificationRoute.js';
import { createClient } from 'redis';
import connectDB from './config/mongodb.js';
import { connectToRabbitMQ } from "./config/amqplib.js";
import { startSendOtpConsumer } from "./config/consumer.js";
import userRoutes from './routes/Userroutess.js';
import Document from './models/Document.js';
import multer from 'multer';
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3095;
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));

// MIDDLEWERE
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('Api is running!');
});

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.connect()
    .then(() => console.log("✅ Connected to Redis"))
    .catch((err) => {
        console.error("Redis connection error:", err);
        process.exit(1);
});
connectToRabbitMQ();
startSendOtpConsumer();


// API ENDPOINTS
const storage = multer.diskStorage({
  destination:"uploads/",
  filename:(req,file,cb)=>{
    cb(null, Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});

app.post("/upload", upload.single("image"), (req,res)=>{
  res.json({
    url:`http://localhost:3095/uploads/${req.file.filename}`
  });
});

app.post("/save", async(req,res)=>{

  const post = new Document({
    content:req.body.content
  });

  await post.save();

  res.json({message:"saved"});
});


app.use('/api/user', userRouter);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRouter);
app.use('/api/classes', classRouter);
app.use('/api/staff', staffRouter);
app.use('/api/syllabus', syllabusRouter);
app.use('/api/allowedthings', thingsRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/papers", questionPaperRoutes);
// app.use("/api/dashboard", dashboardRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










// app.use(clerkMiddleware());
// app.get('/admin', requireAuth(), (req, res) => {
//   const { userId } = getAuth(req);
//   res.json({ message: `Welcome, user ${userId}! This is protected data.` });
// });

// // 4. Accessing User Data via Clerk Client
// app.get('/profile', async (req, res) => {
//   const { userId } = getAuth(req);
  
//   if (!userId) {
//     return res.status(401).send('Unauthorized');
//   }

//   try {
//     // You can fetch full user details from Clerk's Backend API
//     const user = await clerkClient.users.getUser(userId);
//     res.json({ email: user.emailAddresses[0].emailAddress, firstName: user.firstName });
//   } catch (error) {
//     res.status(500).send('Error fetching user');
//   }
// });