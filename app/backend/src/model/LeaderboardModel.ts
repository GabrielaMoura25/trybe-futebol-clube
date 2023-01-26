import Teams from '../database/models/Team';
import Matches from '../database/models/Match';
import { IResult } from '../interfaces/ILeaderboard';

export default class LeaderboardModel {
  protected model = Teams;

  async getAll(accordingTo: string): Promise<IResult[] | null> {
    console.log(accordingTo);

    return this.model.findAll({
      include: [{ model: Matches, as: accordingTo, where: { inProgress: false } }],
    });
  }
}
