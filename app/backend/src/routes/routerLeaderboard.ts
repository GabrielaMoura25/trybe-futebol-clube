import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const controller = new LeaderboardController();

router.get('/home', controller.getAllTeamHome.bind(controller));
router.get('/away', controller.getAllTeamAway.bind(controller));

export default router;
