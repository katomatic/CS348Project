import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
    {
        wTeam: String,
        lTeam: String,
        wScore: Number,
        lScore: Number,
        gameDate: String
    }, 
    {
        timestamps: true,
    }
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;