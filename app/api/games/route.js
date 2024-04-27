import connectMongoDB from "@/libs/mongodb";
import Game from "@/models/game";
import { NextResponse } from "next/server";
import recalculateTeamStats from "@/components/recalculateTeamStats";

export async function POST(request) {
    const { wTeam, lTeam, wScore, lScore, gameDate } = await request.json();
    await connectMongoDB();
    await Game.create({ wTeam, lTeam, wScore, lScore, gameDate });
    await recalculateTeamStats(wTeam);
    await recalculateTeamStats(lTeam);
    return NextResponse.json({ message: "Game Created" }, { status: 201 });
    
}

export async function GET() {
    await connectMongoDB();
    const games = await Game.find().sort({gameDate: -1});
    return NextResponse.json({ games });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Game.findByIdAndDelete(id);
    await recalculateTeamStats(wTeam);
    await recalculateTeamStats(lTeam);
    return NextResponse.json({ message: "Game deleted" }, { status: 200 });
}

export async function PUT(request, {params}) {
    const {id} = params;
    const {newWTeam: wTeam, newLTeam: lTeam, newWScore: wScore, newLScore: lScore, newGameDate: gameDate} = await request.json();
    await connectMongoDB();
    const updatedGame = await Game.findByIdAndUpdate(id, { wTeam, lTeam, wScore, lScore, gameDate }, { new: true });
    if (!updatedGame) {
        return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }
    await recalculateTeamStats(wTeam);
    await recalculateTeamStats(lTeam);
    return NextResponse.json({ message: "Game updated", game: updatedGame }, { status: 200 });
}