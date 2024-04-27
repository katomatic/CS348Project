"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function addGame() {
    const [wTeam, setWTeam] = useState("");
    const [lTeam, setLTeam] = useState("");
    const [wScore, setWScore] = useState("");
    const [lScore, setLScore] = useState("");
    const [gameDate, setGameDate] = useState("");
    const [teamNames, setTeamNames] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!wTeam || !lTeam || !wScore || !lScore || !gameDate) {
            alert("All fields are required.");
            return;
        }
    
        try {
            const res = await fetch("http://localhost:3000/api/games", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ wTeam, lTeam, wScore, lScore, gameDate })
            });
    
            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                throw new Error("Failed to create a game");
            }
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
                onChange={(e) => setWTeam(e.target.value)}
                value={wTeam}
                className="border border-slate-500 px-8 py-2"
            >
                <option key="winning-default" value="">Select Winning Team</option>
                {teamNames.map((teamName, index) => (
                    <option key={`winning-${teamName}`} value={teamName}>{teamName}</option>
                ))}
            </select>

            <select
                onChange={(e) => setLTeam(e.target.value)}
                value={lTeam}
                className="border border-slate-500 px-8 py-2"
            >
                <option key="losing-default" value="">Select Losing Team</option>
                {teamNames.map((teamName, index) => (
                    <option key={`losing-${teamName}`} value={teamName}>{teamName}</option>
                ))}
            </select>

            <input
                onChange={(e) => setWScore(e.target.value)}
                value={wScore}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Winning Team Score"
            />

            <input
                onChange={(e) => setLScore(e.target.value)}
                value={lScore}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Losing Team Score"
            />

            <input
                onChange={(e) => setGameDate(e.target.value)}
                value={gameDate}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Game Date"
            />

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Add Game
            </button>
        </form>
    )
}
