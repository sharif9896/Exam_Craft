import express from 'express';
import { stafflogin, StaffProfileById, StaffProfileDeletById, StaffProfileslists, StaffProfileUpdatedById, StaffRegister, StaffsDelete } from '../controllers/staffcontroller.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';

const staffRouter = express.Router();

staffRouter.post('/register', authHeaderforall, StaffRegister);
staffRouter.post('/login', stafflogin);
staffRouter.get('/getstaff/:id', authHeaderforall, StaffProfileById);
staffRouter.get('/getstaffs', authHeaderforall, StaffProfileslists);
staffRouter.put('/staffupdate/:id', authHeaderforall, StaffProfileUpdatedById);
staffRouter.delete('/staffdelete/:id', authHeaderforall, StaffProfileDeletById);
staffRouter.delete('/staffsdelete', authHeaderforall, StaffsDelete);
export default staffRouter;