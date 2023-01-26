import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import tokenMiddleware from '../middleware/tokenMiddleware';

const router = Router();

const controller = new MatchController();

router.post('/', tokenMiddleware, controller.saveMatch.bind(controller));
router.patch('/:id/finish', controller.update.bind(controller));
router.get('/search', controller.getMatches.bind(controller));
router.get('/', controller.getMatches.bind(controller));

export default router;
