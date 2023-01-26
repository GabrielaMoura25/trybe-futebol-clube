import { IMatch } from './IMatches';
import ITeams from './ITeam';

export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IResult extends ITeams {
  homeGame?: IMatch[];
  awayGame?: IMatch[];
}
