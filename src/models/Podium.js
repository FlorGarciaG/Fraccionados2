import mongoose from "mongoose";

const { Schema } = mongoose;

const podiumSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.models.Podium || mongoose.model("Podium", userSchema);