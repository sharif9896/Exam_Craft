import express from 'express';
import { addClasses, deleteClasses, getClassesById, getClasseses, updateClasses } from '../controllers/ClassesController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
const classRouter = express.Router();

classRouter.post("/addclass", adminMiddleware,  addClasses);
classRouter.get("/getclasses", adminMiddleware, getClasseses);
classRouter.get("/getclass/:id", adminMiddleware,  getClassesById);
classRouter.put("/editById/:id", adminMiddleware, updateClasses);
classRouter.delete("/del/:id", adminMiddleware, deleteClasses);

export default classRouter;


  