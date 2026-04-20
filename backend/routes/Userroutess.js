import express from "express";
import { getAllUsers, getUser, loginUser, myProfile, updateUser, verifyUser } from "../controllers/UserControllers.js";
import AuthenticatedRequest from "../middlewares/IsAuth.js";
const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/verify", verifyUser);
userRoutes.get("/profile", AuthenticatedRequest, myProfile);
userRoutes.get("/user/all", AuthenticatedRequest, getAllUsers);
userRoutes.get("/user/:id", AuthenticatedRequest, getUser);
userRoutes.post("/update", AuthenticatedRequest, updateUser);

export default userRoutes;