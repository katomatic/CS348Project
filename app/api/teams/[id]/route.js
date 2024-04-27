import connectMongoDB from "@/libs/mongodb";
import Team from "@/models/team";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTeamName: teamName} = await request.json()
    await connectMongoDB();
    await Team.findByIdAndUpdate(id, {teamName})
    return NextResponse.json({message: "Team updated"}, {status: 200})
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const team = await Team.findOne({_id: id})
    return NextResponse.json({team}, {status: 200})
}