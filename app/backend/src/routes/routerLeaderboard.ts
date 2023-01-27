import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const controller = new LeaderboardController();

router.get('/home', controller.getHomeLeaderboard.bind(controller));
router.get('/away', controller.getAwayLeaderboard.bind(controller));
router.get('/', controller.getAll.bind(controller));

export default router;
