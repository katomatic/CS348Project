"use client";

import { useState, useEffect } from 'react';

export default function GenerateReportPage() {
    const [teamNames, setTeamNames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teams');
            if (response.ok) {
                const teams = await response.json();
                setTeamNames(teams);
            } else {
                console.error('Failed to fetch teams');
            }
        };
        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teamName: selectedTeam })
        });

        if (response.ok) {
            const games = await response.json();

            let totalScore = 0, totalOpponentScore = 0;
            games.forEach(game => {
                if (game.wTeam === selectedTeam) {
                    totalScore += game.wScore;
                    totalOpponentScore += game.lScore;
                } else {
                    totalScore += game.lScore;
                    totalOpponentScore += game.wScore;
                }
            });

            const averageScore = games.length > 0 ? totalScore / games.length : 0;
            const averageOpponentScore = games.length > 0 ? totalOpponentScore / games.length : 0;
            setReportData({averageScore, averageOpponentScore, games});
        } else {
            console.error("Failed to fetch report data");
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            textAlign: 'center',
        },
        form: {
            marginBottom: '20px',
        },
        select: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
        },
        button: {
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#aff5fa',
            border: 'solid'
        },
        list: {
            listStyleType: 'none',
            padding: 0,
        },
        listItem: {
            background: '#f0f0f0',
            padding: '10px',
            margin: '5px 0',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Generate Game Report</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <select style={styles.select} value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
                    <option value="">Select Team</option>
                    {teamNames.map(team => (
                        <option key={team.teamName} value={team.teamName}>{team.teamName}</option>
                    ))}
                </select>
                <button style={styles.button} type="submit">Generate Report</button>
            </form>
            {reportData && (
                <div>
                    <p>Average Score: {reportData.averageScore.toFixed(2)}</p>
                    <p>Average Opponent Score: {reportData.averageOpponentScore.toFixed(2)}</p>
                    <ul style={styles.list}>
                        {reportData.games.map(game => (
                            <li key={game._id} style={styles.listItem}>{game.wTeam} {game.wScore} - {game.lScore} {game.lTeam}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
