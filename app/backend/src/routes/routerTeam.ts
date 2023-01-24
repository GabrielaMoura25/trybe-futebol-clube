import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const controller = new TeamController();

router.get('/:id', controller.getTeam.bind(controller));
router.get('/', controller.getTeams.bind(controller));

export default router;
