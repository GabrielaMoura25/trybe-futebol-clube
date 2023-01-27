import ILeaderboard from '../interfaces/ILeaderboard';

export default class FullLeaderboard {
  private _homeLeaderboard;
  private _awayLeaderboard;

  constructor(homeLeaderboard: ILeaderboard[], awayLeaderboard: ILeaderboard[]) {
    this._homeLeaderboard = homeLeaderboard;
    this._awayLeaderboard = awayLeaderboard;
  }

  private getTotalPoints = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homePoints = homeTeam.totalPoints as number;
    const awayPoints = awayTeam?.totalPoints as number;

    return homePoints + awayPoints;
  };

  private getTotalGames = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeGames = homeTeam.totalGames as number;
    const awayGames = awayTeam?.totalGames as number;

    return homeGames + awayGames;
  };

  private getTotalVictories = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeVictories = homeTeam.totalVictories as number;
    const awayVictories = awayTeam?.totalVictories as number;

    return homeVictories + awayVictories;
  };

  private getTotalDraws = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeDraws = homeTeam.totalDraws as number;
    const awayDraws = awayTeam?.totalDraws as number;

    return homeDraws + awayDraws;
  };

  private getTotalLosses = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeLosses = homeTeam.totalLosses as number;
    const awayLosses = awayTeam?.totalLosses as number;

    return homeLosses + awayLosses;
  };

  private getTotalGoalsFavor = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeGoalsFavor = homeTeam.goalsFavor as number;
    const awayGoalsFavor = awayTeam?.goalsFavor as number;

    return homeGoalsFavor + awayGoalsFavor;
  };

  private getTotalGoalsOwn = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeGoalsOwn = homeTeam.goalsOwn as number;
    const awayGoalsOwn = awayTeam?.goalsOwn as number;

    return homeGoalsOwn + awayGoalsOwn;
  };

  private getTotalGoalsBalance = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const homeGoalsBalance = homeTeam.goalsBalance as number;
    const awayGoalsBalance = awayTeam?.goalsBalance as number;

    return homeGoalsBalance + awayGoalsBalance;
  };

  private getTotalEfficiency = (homeTeam: ILeaderboard, awayTeam: ILeaderboard) => {
    const points = this.getTotalPoints(homeTeam, awayTeam);
    const games = this.getTotalGames(homeTeam, awayTeam);

    const efficiency = ((points / (games * 3)) * 100).toFixed(2);

    return efficiency;
  };

  public createFullLeaderboard = () => (this._homeLeaderboard.map((homeTeam) => {
    const awayTeam = this._awayLeaderboard.find((awayT) =>
      awayT.name === homeTeam.name) as unknown as ILeaderboard;

    return {
      name: homeTeam.name,
      totalPoints: this.getTotalPoints(homeTeam, awayTeam),
      totalGames: this.getTotalGames(homeTeam, awayTeam),
      totalVictories: this.getTotalVictories(homeTeam, awayTeam),
      totalDraws: this.getTotalDraws(homeTeam, awayTeam),
      totalLosses: this.getTotalLosses(homeTeam, awayTeam),
      goalsFavor: this.getTotalGoalsFavor(homeTeam, awayTeam),
      goalsOwn: this.getTotalGoalsOwn(homeTeam, awayTeam),
      goalsBalance: this.getTotalGoalsBalance(homeTeam, awayTeam),
      efficiency: this.getTotalEfficiency(homeTeam, awayTeam),
    };
  })).sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
}
