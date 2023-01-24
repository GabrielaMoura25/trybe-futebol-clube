import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _service = new MatchService()) {}

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { code, response } = await this._service.getMatches(inProgress as unknown as string);

    return res.status(code).json(response);
  };
}
