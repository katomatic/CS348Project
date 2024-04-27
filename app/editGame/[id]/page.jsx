import EditGameForm from "@/components/EditGameForm";

const getGameById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/games/${id}`, {
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Failed to fetch game");
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function editGame({params}) {
    const {id} = params;
    const {game} = await getGameById(id);
    const {wTeam, lTeam, wScore, lScore, gameDate} = game;

    return <EditGameForm id={id} wTeam={wTeam} lTeam={lTeam} wScore={wScore} lScore={lScore} gameDate={gameDate} />;
}