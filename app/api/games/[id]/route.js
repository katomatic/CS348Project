import connectMongoDB from "@/libs/mongodb";
import Game from "@/models/game";
import { NextResponse } from "next/server";
import recalculateTeamStats from "@/components/recalculateTeamStats";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newWTeam: wTeam, newLTeam: lTeam, newWScore: wScore, newLScore: lScore, newGameDate: gameDate} = await request.json();
    await connectMongoDB();
    await Game.findByIdAndUpdate(id, {wTeam, lTeam, wScore, lScore, gameDate});
    await recalculateTeamStats(wTeam);
    await recalculateTeamStats(lTeam);
    return NextResponse.json({message: "Game updated"}, {status: 200});
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const game = await Game.findOne({_id: id})
    return NextResponse.json({game}, {status: 200})
}