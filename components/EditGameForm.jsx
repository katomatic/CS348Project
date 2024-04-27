"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditGameForm({id, wTeam, lTeam, wScore, lScore, gameDate}) {
    const [newWTeam, setNewWTeam] = useState(wTeam);
    const [newWScore, setNewWScore] = useState(wScore);
    const [newLTeam, setNewLTeam] = useState(lTeam);
    const [newLScore, setNewLScore] = useState(lScore);
    const [newGameDate, setNewGameDate] = useState(gameDate);
    const [teamNames, setTeamNames] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/games/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({newWTeam, newLTeam, newWScore, newLScore, newGameDate}),
            });

            if (!res.ok) {
                throw new Error("Failed to update game");
            }
            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchTeams() {
        try {
            const response = await fetch('/api/teams', { method: 'GET' });
            const teams = await response.json();
            const teamNames = teams.map(team => team.teamName);
            setTeamNames(teamNames);
        } catch (error) {
            console.log('Failed to fetch teams:', error);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select
                onChange={(e) => setNewWTeam(e.target.value)}
                value={wTeam}
                className="border border-slate-500 px-8 py-2"
            >
                <option key="winning-default" value="">Select Winning Team</option>
                {teamNames.map((teamName, index) => (
                    <option key={`winning-${teamName}`} value={teamName}>{teamName}</option>
                ))}
            </select>

            <select
                onChange={(e) => setNewLTeam(e.target.value)}
                value={lTeam}
                className="border border-slate-500 px-8 py-2"
            >
                <option key="losing-default" value="">Select Losing Team</option>
                {teamNames.map((teamName, index) => (
                    <option key={`losing-${teamName}`} value={teamName}>{teamName}</option>
                ))}
            </select>

            <input 
                onChange={e => setNewWScore(e.target.value)}
                value={newWScore}
                className="border border-slate-500 px-8 py-2"
                type="text" 
                placeholder="Winning Team Score"
            />

            <input 
                onChange={e => setNewLScore(e.target.value)}
                value={newLScore}
                className="border border-slate-500 px-8 py-2"
                type="text" 
                placeholder="Losing Team Score"
            />

            <input 
                onChange={e => setNewGameDate(e.target.value)}
                value={newGameDate}
                className="border border-slate-500 px-8 py-2"
                type="text" 
                placeholder="Game Date"
            />

            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Update Game
            </button>
        </form>
    );
}