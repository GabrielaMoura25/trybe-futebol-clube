import Teams from '../database/models/Team';

export default class TeamService {
  constructor(private _model = Teams) {}

  getTeams = async () => {
    const teams = await this._model.findAll();

    return { code: 200, response: teams };
  };

  getTeam = async (id: string) => {
    const team = await this._model.findByPk(id);

    return { code: 200, response: team };
  };
}
