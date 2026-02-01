import express from 'express';
import { addsyllabus, deleteSyllabus, deleteSyllabusById, getSyllabus, getSyllabusById, updateSyllabus } from '../controllers/SyllabusController.js';
import upload from '../middlewares/multer.js';
import staffMiddleware from '../middlewares/staffMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const syllabusRouter = express.Router();

syllabusRouter.post('/addsyllabus', staffMiddleware, adminMiddleware, upload.single('file'), addsyllabus);
syllabusRouter.get('/getsyllabus', getSyllabus);
syllabusRouter.get('/getsyllabus/:id', getSyllabusById);
syllabusRouter.put('/updatesyllabus/:id', updateSyllabus);
syllabusRouter.delete('/deletesyllabus/:id', deleteSyllabus);
syllabusRouter.delete('/deletesyllabusbyid/:id', deleteSyllabusById);

export default syllabusRouter;