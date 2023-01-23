import * as express from 'express';
import UserController from '../controllers/UserController';
import UserMidd from '../middleware/UserMiddleware';

const router = express.Router();

const controller = new UserController();

router.post('/login', UserMidd, controller.login.bind(controller));
router.get('/login/validate', controller.validateLogin.bind(controller));

export default router;
