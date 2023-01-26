import { RequestHandler } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _service = new LeaderboardService()) {}

  getAllTeamHome: RequestHandler = async (_req, res) => {
    const accordingTo = 'homeGame';
    const { code, message, board } = await this._service.getAll(accordingTo);
    if (board) {
      return res.status(code).json(board);
    }
    return res.status(code).json({ message });
  };

  getAllTeamAway: RequestHandler = async (_req, res) => {
    const accordingTo = 'awayGame';
    const { code, message, board } = await this._service.getAll(accordingTo);
    if (board) {
      return res.status(code).json(board);
    }
    return res.status(code).json({ message });
  };
}
