import connectMongoDB from "@/libs/mongodb";
import Game from "@/models/game";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { teamName } = await request.json();
    await connectMongoDB();

    const games = await Game.find({
        $or: [{ wTeam: teamName }, { lTeam: teamName }]
    }).sort(({gameDate: -1}));
    
    return NextResponse.json(games);
}
