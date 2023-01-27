import { RequestHandler } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _service = new LeaderboardService()) {}

  getHomeLeaderboard: RequestHandler = async (_req, res) => {
    const { code, result } = await this._service.getHomeLeaderboard();

    return res.status(code).json(result);
  };

  getAwayLeaderboard: RequestHandler = async (_req, res) => {
    const { code, result } = await this._service.getAwayLeaderboard();

    return res.status(code).json(result);
  };

  getAll: RequestHandler = async (_req, res) => {
    const { code, result } = await this._service.getAll();

    return res.status(code).json(result);
  };
}
