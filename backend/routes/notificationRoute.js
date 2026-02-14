import express from "express";
import { sendPermissionEmail } from "../controllers/notificationController.js";
// Assuming you have an auth middleware
// import { authStaff } from "../middleware/auth.js"; 

const notificationRouter = express.Router();

// Route: POST /api/notifications/send-email
notificationRouter.post("/send-email", sendPermissionEmail);

export default notificationRouter;