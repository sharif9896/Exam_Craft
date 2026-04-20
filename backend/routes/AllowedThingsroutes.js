import express from 'express';
import { AddallowedThings, DeleteAllowedThings, GetAllowedThings, UpdateAllowedThings, staffalowedget } from '../controllers/AllowedThingsController.js';
import authHeaderforall from '../middlewares/adminMiddleware.js';

const thingsRouter = express.Router();

thingsRouter.post('/addthings', authHeaderforall, AddallowedThings);
thingsRouter.get('/getthings', authHeaderforall, GetAllowedThings);
thingsRouter.put('/updatethings/:id', authHeaderforall, UpdateAllowedThings);
thingsRouter.delete('/deletethings/:id', authHeaderforall, DeleteAllowedThings);
thingsRouter.get("/getsaffthing/:staffId", staffalowedget);
export default thingsRouter;