import express from 'express';
import { AddallowedThings, DeleteAllowedThings, GetAllowedThings, UpdateAllowedThings } from '../controllers/AllowedThingsController.js';

const thingsRouter = express.Router();

thingsRouter.post('/addthings', AddallowedThings);
thingsRouter.get('/getthings', GetAllowedThings);
thingsRouter.put('/updatethings', UpdateAllowedThings);
thingsRouter.delete('/deletethings/:id', DeleteAllowedThings);

export default thingsRouter;