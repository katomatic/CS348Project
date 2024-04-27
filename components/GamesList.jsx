import Link from "next/link";
import RemoveGame from "./RemoveGame";
import {HiPencilAlt} from 'react-icons/hi';

const getGames = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/games", {
            cache: "no-store",
        });

        if(!res.ok) {
            throw new Error("Failed to fetch games");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading games: ", error);
    }
}

export default async function GamesList() {
    const { games } = await getGames();

    return (
        <>
        <h1 className="font text-4xl underline">Games</h1>
        {games?.map(g => (
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{g.wTeam} defeats {g.lTeam}</h2>
                    <h2 className="text-xl">{g.wScore}-{g.lScore}</h2>
                    <h2 className="italic">{g.gameDate}</h2>
                </div>

                <div className="flex gap-2">
                    <RemoveGame id={g._id} />
                    <Link href={`/editGame/${g._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
            ))}
        </>
    );
}