import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-5 py-3">
            <Link className="text-white font-bold text-xl" href={"/"}>
                March Madness 2024
            </Link>
            <nav className="flex items-right">
                <Link className="mx-1 bg-white p-2" href={"/generateReport"}>
                    Generate Report
                </Link>
                <Link className="mx-1 bg-white p-2" href={"/addGame"}>
                    Add Game
                </Link>
                <Link className="mx-1 bg-white p-2" href={"/addTeam"}>
                    Add Team
                </Link>
            </nav>
        </nav>
    );
}