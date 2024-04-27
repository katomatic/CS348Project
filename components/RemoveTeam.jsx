"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveTeam({ id }) {
    const router = useRouter();
    
    const removeTeam = async () => {
        const confirmed = confirm("Are you sure?");
    
        if (confirmed) {
            try {
                const res = await fetch(`http://localhost:3000/api/teams?id=${id}`, {
                    method: "DELETE",
                });
    
                if (res.ok) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 250);
                } else {
                    throw new Error("Failed to delete team");
                }
            } catch (error) {
                console.error("Error deleting team:", error);
            }
        }
    };

    return (
        <button onClick={removeTeam} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}