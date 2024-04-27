import connectMongoDB from "@/libs/mongodb";
import Team from "@/models/team";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { teamName } = await request.json();
    await connectMongoDB();
    await Team.create({ teamName, isEliminated: false, wins: 0 });
    return NextResponse.json({ message: "Team Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const teams = await Team.find().sort({wins: -1});
    return NextResponse.json(teams);
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Team.findByIdAndDelete(id);
    return NextResponse.json({ message: "Tean deleted" }, { status: 200 });
}