import express from 'express';
import { addsyllabus, deleteSyllabus, deleteSyllabusById, getSyllabus, getSyllabusById, updateSyllabus } from '../controllers/SyllabusController.js';
import upload from '../middlewares/multer.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';

const syllabusRouter = express.Router();

syllabusRouter.post('/addsyllabus', authHeaderforall, upload.single('syllabusFile'), addsyllabus);

syllabusRouter.get('/getsyllabus', authHeaderforall,  getSyllabus);
syllabusRouter.get('/getsyllabus/:id', authHeaderforall, getSyllabusById);
syllabusRouter.put('/updatesyllabus/:id', authHeaderforall, updateSyllabus);
syllabusRouter.delete('/deletesyllabus/:id', authHeaderforall, deleteSyllabus);
syllabusRouter.delete('/deletesyllabusbyid/:id', authHeaderforall, deleteSyllabusById);

export default syllabusRouter;


