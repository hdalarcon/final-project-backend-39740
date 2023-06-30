import { Router } from 'express';
import { current, login, logout, signup } from '../../presentation/controllers/sessionController.js'
import auth from '../middlewares/auth.js';

const sessionRouter = Router();


sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/logout', logout);
sessionRouter.post('/signup', signup);

export default sessionRouter;


