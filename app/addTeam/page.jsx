"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTeam() {
    const [teamName, setTeamName] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!teamName) {
            alert("All fields are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/teams", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({teamName})
            });

            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                throw new Error("Failed to create a team")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                onChange = {(e) => setTeamName(e.target.value)}
                value = {teamName}
                className="border border-slate-500 px-8 py-2"
                type="text" 
                placeholder="Team Name"
            />

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Add Game
            </button>
        </form>
    )
}