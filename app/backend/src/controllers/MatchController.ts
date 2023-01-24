import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _service = new MatchService()) {}

  getMatches = async (_req: Request, res: Response) => {
    const { code, response } = await this._service.getMatches();

    return res.status(code).json(response);
  };
}
