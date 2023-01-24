import * as express from 'express';
import UserController from '../controllers/UserController';
import UserMidd from '../middleware/UserMiddleware';

const router = express.Router();

const controller = new UserController();

router.post('/', UserMidd, controller.login.bind(controller));
router.get('/validate', controller.validateLogin.bind(controller));

export default router;
