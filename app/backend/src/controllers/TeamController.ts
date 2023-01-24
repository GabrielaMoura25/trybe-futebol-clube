import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _service = new TeamService()) {}

  getTeams = async (_req: Request, res: Response) => {
    const { code, response } = await this._service.getTeams();

    return res.status(code).json(response);
  };

  getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('IDDDDD', id);

    // const numberId = Number(id);

    const { code, response } = await this._service.getTeam(id);

    return res.status(code).json(response);
  };
}
