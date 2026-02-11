import express from 'express';
import { addClasses, deleteClasses, getClassesById, getClasseses, updateClasses } from '../controllers/ClassesController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';
const classRouter = express.Router();

classRouter.post("/addclass", authHeaderforall,  addClasses);
classRouter.get("/getclasses", authHeaderforall, getClasseses);
classRouter.get("/getclass/:id", authHeaderforall,  getClassesById);
classRouter.put("/editById/:id", authHeaderforall, updateClasses);
classRouter.delete("/del/:id", authHeaderforall, deleteClasses);

export default classRouter;


  