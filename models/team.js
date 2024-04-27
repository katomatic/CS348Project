import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
    {
        teamName: String,
        isEliminated: Boolean,
        wins: Number
    }, 
    {
        timestamps: true,
    }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;