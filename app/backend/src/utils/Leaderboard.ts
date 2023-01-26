import IMatches from '../interfaces/IMatches';
import ILeaderboard, { IResult } from '../interfaces/ILeaderboard';

export default class CreateLeaderboard {
  private static _createBoard(match: IResult): ILeaderboard {
    let game: IMatches[] = [];
    if (match.awayGame) game = match.awayGame;
    if (match.homeGame) game = match.homeGame;

    const score = this.TotalScore(game);
    const eff = this.TotalEfficiency(this.TotalPoints(game), game.length);

    const board = {
      name: match.teamName,
      totalPoints: this.TotalPoints(game),
      totalGames: game.length,
      totalVictories: this.TotalVictories(game),
      totalDraws: this.TotalDraws(game),
      totalLosses: this.TotalLosses(game),
      goalsFavor: score.goalsFavor,
      goalsOwn: score.goalsOwn,
      goalsBalance: score.goalsBalance,
      efficiency: eff,
    };
    return board;
  }

  static TotalLosses = (game: IMatches[]) => {
    const result = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return result;
  };

  static TotalDraws = (game: IMatches[]) => {
    const result = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return result;
  };

  static TotalVictories = (game: IMatches[]) => {
    const result = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return result;
  };

  static TotalPoints = (game: IMatches[]) => {
    const result = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return result;
  };

  static TotalEfficiency = (points: number, games: number) => {
    const result = ((points / (games * 3)) * 100).toFixed(2);
    return result;
  };

  static TotalScore = (game: IMatches[]) => {
    const goalsFavor:
    number = game.reduce((acc: number, curr: IMatches) => acc + curr.homeTeamGoals, 0);

    const goalsOwn:
    number = game.reduce((acc: number, curr: IMatches) => acc + curr.awayTeamGoals, 0);

    const goalsBalance: number = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  };

  getLeaderboard = (matches: IResult[]) => {
    const ratingBoard = matches.map((match) => CreateLeaderboard._createBoard(match));
    return ratingBoard.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;

      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;

      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;

      return 0;
    });
  };
}
