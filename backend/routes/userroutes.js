import express from 'express';
import { login, signup, userprofile, userprofilebyId } from '../controllers/usercontroller.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/fetchUsers', userprofile);
userRouter.get('/fetchUser/:id', userprofilebyId);

export default userRouter;