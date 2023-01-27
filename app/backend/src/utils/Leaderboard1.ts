import ILeaderboards from '../interfaces/ILeaderboard';

const createLeaderboard = (home: ILeaderboards[], away: ILeaderboards[]) => away.map((e) => {
  const equals = home.find((el) => el.name === e.name);
  if (!equals) return;
  return {
    ...e,
    totalPoints: e.totalPoints + equals.totalPoints,
    totalGames: e.totalGames + equals.totalGames,
    totalVictories: e.totalVictories + equals.totalVictories,
    totalDraws: e.totalDraws + equals.totalDraws,
    totalLosses: e.totalLosses + equals.totalLosses,
    goalsFavor: e.goalsFavor + equals.goalsFavor,
    goalsOwn: e.goalsOwn + equals.goalsOwn,
    goalsBalance: e.goalsBalance + equals.goalsBalance,
    efficiency: (((e.totalPoints + equals.totalPoints)
      / ((e.totalGames + equals.totalGames) * 3)) * 100).toFixed(2) };
});

export default createLeaderboard;
