"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveGame({ id }) {
    const router = useRouter();
    const removeGame = async () => {
        const confirmed = confirm("Are you sure?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/games?id=${id}`, {
                method: "DELETE",
            });

            if(res.ok) {
                router.refresh();
            }
        }
    };

    return (
        <button onClick={removeGame} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}