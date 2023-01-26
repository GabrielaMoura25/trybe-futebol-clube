import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatches from '../interfaces/IMatches';
// import TokenConfig from '../utils/TokenConfig';

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

    return { code: 200, message: matches };
  };

  saveMatch = async (match: IMatches) => {
    const verifyTeamsIds = match.homeTeamId === match.awayTeamId;
    if (verifyTeamsIds) {
      return {
        code: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const homeTeam = await Team.findByPk(match.homeTeamId);
    const awayTeam = await Team.findByPk(match.awayTeamId);
    if (!homeTeam || !awayTeam) return { code: 404, message: 'There is no team with such id!' };
    const matchSave = await this._model.create({ ...match, inProgress: true });
    return { code: 201, message: matchSave };
  };

  matchOver = async (id: string) => {
    await this._model.update({ inProgress: false }, { where: { id } });
    return { code: 200, message: 'Finished' };
  };

  update = async (id: string, match: IMatches) => {
    await this._model.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
    return { code: 200, message: 'Match is updated!' };
  };
}
