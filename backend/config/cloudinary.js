import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

// This ensures it finds the .env file in your root backend folder
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verification Log - check your terminal when the server starts
if (!process.env.CLOUDINARY_API_KEY) {
    console.error("CRITICAL ERROR: Cloudinary API Key is missing from .env file!");
} else {
    console.log("Cloudinary Configuration Loaded Successfully.");
}

export default cloudinary;