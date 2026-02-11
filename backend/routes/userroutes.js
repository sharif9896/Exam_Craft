import express from 'express';
import { login, signup, userprofile, userprofilebyId } from '../controllers/usercontroller.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/fetchUsers', authHeaderforall, userprofile);
userRouter.get('/fetchUser', authHeaderforall, userprofilebyId);

export default userRouter;