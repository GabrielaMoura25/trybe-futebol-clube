import IMatches from '../interfaces/IMatches';
import ILeaderboard, { IResult } from '../interfaces/ILeaderboard';

export default class CreateLeaderboard {
  private static _createBoard(match: IResult): ILeaderboard {
    let game: IMatches[] = [];
    if (match.awayGame) game = match.awayGame as unknown as IMatches[];
    if (match.homeGame) game = match.homeGame as unknown as IMatches[];

    const score = this.TotalScore(game, match);
    const eff = this.TotalEfficiency(this.TotalPoints(game, match), game.length);

    const board = {
      name: match.teamName,
      totalPoints: this.TotalPoints(game, match),
      totalGames: game.length,
      totalVictories: this.TotalVictories(game, match),
      totalDraws: this.TotalDraws(game),
      totalLosses: this.TotalLosses(game, match),
      goalsFavor: score.goalsFavor,
      goalsOwn: score.goalsOwn,
      goalsBalance: score.goalsBalance,
      efficiency: eff,
    };
    return board;
  }

  static TotalLosses = (game: IMatches[], match: IResult) => {
    const resultHome = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    const resultAway = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return match.homeGame ? resultHome : resultAway;
  };

  static TotalDraws = (game: IMatches[]) => {
    const result = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return result;
  };

  static TotalVictories = (game: IMatches[], match: IResult) => {
    const resultHome = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    const resulAway = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return match.homeGame ? resultHome : resulAway;
  };

  static TotalPoints = (game: IMatches[], match: IResult) => {
    const resultHome = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    const resultAway = game.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc + 0;
    }, 0);
    return match.homeGame ? resultHome : resultAway;
  };

  static TotalEfficiency = (points: number, games: number) => {
    const result = ((points / (games * 3)) * 100).toFixed(2);
    return result;
  };

  static TotalScore = (game: IMatches[], match: IResult) => {
    const goalsFavor:
    number = match.homeGame
      ? game.reduce((acc: number, curr: IMatches) => acc + curr.homeTeamGoals, 0)
      : game.reduce((acc: number, curr: IMatches) => acc + curr.awayTeamGoals, 0);

    const goalsOwn:
    number = match.awayGame
      ? game.reduce((acc: number, curr: IMatches) => acc + curr.homeTeamGoals, 0)
      : game.reduce((acc: number, curr: IMatches) => acc + curr.awayTeamGoals, 0);

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
