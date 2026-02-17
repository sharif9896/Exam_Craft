import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongodb from './config/mongodb.js';
import userRouter from './routes/userroutes.js';
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express';
import syllabusRouter from './routes/Syllabusroutes.js';
import thingsRouter from './routes/AllowedThingsroutes.js';
import staffRouter from './routes/staffroutes.js';
import departmentRouter from './routes/Departmentroutes.js';
import classRouter from './routes/Classesroutes.js';
import notificationRouter from './routes/notificationRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3095;
mongodb();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));

// MIDDLEWERE
// fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: "File not found" });
    }
  });
});


app.get('/', (req, res) => {
  res.send('Api is running!');
});

// API ENDPOINTS
app.use('/api/user', userRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/classes', classRouter)
app.use('/api/staff', staffRouter);
app.use('/api/syllabus', syllabusRouter);
app.use('/api/allowedthings', thingsRouter);
app.use("/api/notifications", notificationRouter);

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