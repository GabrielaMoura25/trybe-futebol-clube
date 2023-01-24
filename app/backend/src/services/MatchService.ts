import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(private _model = Match) {}

  getMatches = async () => {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return { code: 200, response: matches };
  };
}
