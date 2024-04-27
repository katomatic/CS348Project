import Game from "@/models/game";
import Team from "@/models/team";

async function recalculateTeamStats(teamName) {
    const games = await Game.find({ $or: [{ wTeam: teamName }, { lTeam: teamName }] });

    const wins = games.filter(game => game.wTeam === teamName).length;
    const isEliminated = games.some(game => game.lTeam === teamName);

    await Team.updateOne({ teamName }, {
        wins,
        isEliminated
    }, { upsert: true });
}

export default recalculateTeamStats;
