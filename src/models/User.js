import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

//Si la coleccion User no existe crea una nueva.
export default mongoose.models.User || mongoose.model("User", userSchema);