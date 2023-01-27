import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import tokenMiddleware from '../middleware/tokenMiddleware';

const router = Router();

const controller = new MatchController();

router.patch('/:id/finish', controller.matchOver.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.get('/search', controller.getMatches.bind(controller));
router.get('/', controller.getMatches.bind(controller));
router.post('/', tokenMiddleware, controller.saveMatch.bind(controller));

export default router;
