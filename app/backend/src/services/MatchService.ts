import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(private _model = Match) {}

  getMatches = async (inProgress: string) => {
    const where = inProgress ? { inProgress: inProgress === 'true' } : undefined;
    const matches = await this._model.findAll({
      where,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return { code: 200, response: matches };
  };
}
