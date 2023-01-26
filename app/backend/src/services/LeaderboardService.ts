import CreateLeaderboard from '../utils/Leaderboard';
import LeaderboardModel from '../model/LeaderboardModel';
import ILeaderboard from '../interfaces/ILeaderboard';

type output = { code: number, message?: string, board?: ILeaderboard[] };

export default class LeaderboardService {
  constructor(
    private _model = new LeaderboardModel(),
    private _leaderboard = new CreateLeaderboard(),
  ) {}

  getAll = async (accordingTo: string): Promise<output> => {
    const matches = await this._model.getAll(accordingTo);

    if (!matches) return { code: 401, message: 'Bad request' };

    const board = this._leaderboard.getLeaderboard(matches);

    return { code: 200, board };
  };
}
