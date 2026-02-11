import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import {addepartment, getDepartments, updateDepartment, deleteDepartment, searchByDepartName} from '../controllers/DepartmentController.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';

const departmentRouter = express.Router();

departmentRouter.post('/addepartment', authHeaderforall, addepartment);
departmentRouter.get('/getdepartments', authHeaderforall, getDepartments);
departmentRouter.put('/updatedepartment/:id', authHeaderforall, updateDepartment);
departmentRouter.delete('/deletedepartment/:id', authHeaderforall, deleteDepartment);
departmentRouter.get('/searchdepartment/:name', authHeaderforall, searchByDepartName);

export default departmentRouter;