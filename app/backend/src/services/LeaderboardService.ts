import CreateLeaderboard from '../utils/Leaderboard';
import Matches from '../database/models/Match';
import Teams from '../database/models/Team';
import { IResult } from '../interfaces/ILeaderboard';
import FullLeaderboard from '../utils/LeaderboardFull';

export default class LeaderboardService {
  constructor(
    private _modelMatches = Matches,
    private _modelTeam = Teams,
    private _leaderboard = new CreateLeaderboard(),
  ) {}

  getHomeLeaderboard = async () => {
    const homeMatches = await this._modelTeam.findAll({
      include: [
        {
          model: this._modelMatches,
          as: 'homeGame',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IResult[];
    const result = this._leaderboard.getLeaderboard(homeMatches);

    return { code: 200, result };
  };

  getAwayLeaderboard = async () => {
    const awayMatches = await this._modelTeam.findAll({
      include: [
        {
          model: this._modelMatches,
          as: 'awayGame',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IResult[];
    const result = this._leaderboard.getLeaderboard(awayMatches);

    return { code: 200, result };
  };

  getAll = async () => {
    const { result: home } = await this.getHomeLeaderboard();
    const { result: away } = await this.getAwayLeaderboard();

    const full = new FullLeaderboard(home, away);

    const result = full.createFullLeaderboard();

    return { code: 200, result };
  };
}
