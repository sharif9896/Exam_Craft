import express from 'express';
import { addClasses, deleteClasses, getClassesById, getClasseses, updateClasses } from '../controllers/ClassesController';

const classRouter = express.Router();

classRouter.post("/addclass", addClasses);
classRouter.get("/getclasses", getClasseses);
classRouter.get("/getclass/:id", getClassesById);
classRouter.put("/editById/:id", updateClasses);
classRouter.delete("/del/:id", deleteClasses);

export default classRouter;


  