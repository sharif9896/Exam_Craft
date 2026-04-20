import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chat_app_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Cloudinary uses snake_case
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

export default upload;