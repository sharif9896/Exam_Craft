import express from 'express';
import { addepartment, deleteDepartment, getDepartments, searchByDepartName, updateDepartment } from '../controllers/DepartmentController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const departmentRouter = express.Router();

departmentRouter.post('/adddepartment', adminMiddleware, addepartment);
departmentRouter.get('/getdepartments', adminMiddleware, getDepartments);
departmentRouter.put('/updatedepartment/:id', adminMiddleware, updateDepartment);
departmentRouter.delete('/deletedepartment/:id', adminMiddleware, deleteDepartment);
departmentRouter.get('/searchdepartment/:name', adminMiddleware, searchByDepartName);

export default departmentRouter;