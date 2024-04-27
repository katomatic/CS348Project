"use client"

import { useState, useEffect } from 'react';
import RemoveTeam from "./RemoveTeam";

export default function TeamsList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/teams', {method: "GET"});
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div>
            <h1 className="font text-4xl underline">Teams</h1>
            {teams && teams.map((team, index) => (
                <div key={index} className={`p-2 border border-slate-300 my-3 flex justify-between items-start gap-2 ${team.isEliminated ? 'bg-red-50' : ''}`}>
                    <div>
                        <h2 className="text-2xl">{team.teamName}</h2>
                        <h2 className="text-sm text-gray-500">{team.wins} wins</h2>
                    </div>
                    <div className="flex gap-2">
                        <RemoveTeam id={team._id} />
                    </div>
                </div>
            ))}
        </div>
    );
}
