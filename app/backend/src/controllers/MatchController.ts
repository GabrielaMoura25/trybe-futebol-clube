import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _service = new MatchService()) {}

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { code, message } = await this._service.getMatches(inProgress as unknown as string);

    return res.status(code).json(message);
  };

  saveMatch = async (req: Request, res: Response) => {
    const match = req.body;
    const { code, message } = await this._service.saveMatch(match);
    if (code === 422 || code === 404) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(message);
  };

  matchOver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, message } = await this._service.matchOver(id);
    return res.status(code).json({ message });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const { code, message } = await this._service.update(id, body);

    return res.status(code).json({ message });
  };
}
