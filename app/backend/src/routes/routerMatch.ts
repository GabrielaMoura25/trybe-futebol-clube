import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const controller = new MatchController();

router.get('/', controller.getMatches.bind(controller));

export default router;
