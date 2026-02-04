import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import {addepartment, getDepartments, updateDepartment, deleteDepartment, searchByDepartName} from '../controllers/DepartmentController.js';

const departmentRouter = express.Router();

departmentRouter.post('/addepartment', adminMiddleware, addepartment);
departmentRouter.get('/getdepartments', adminMiddleware, getDepartments);
departmentRouter.put('/updatedepartment/:id', adminMiddleware, updateDepartment);
departmentRouter.delete('/deletedepartment/:id', adminMiddleware, deleteDepartment);
departmentRouter.get('/searchdepartment/:name', adminMiddleware, searchByDepartName);

export default departmentRouter;