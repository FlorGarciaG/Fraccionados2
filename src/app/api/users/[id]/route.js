import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const user = await User.findById(id);

        if (!user) {
            return new NextResponse("Usuario no encontrado", { status: 404 });
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (err) {
        return new NextResponse("Error de la base de datos", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return new NextResponse("Usuario no encontrado", { status: 404 });
        }

        return new NextResponse("Usuario eliminado exitosamente", { status: 200 });
    } catch (err) {
        return new NextResponse("Error de la base de datos", { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    const { id } = params;
    const body = await request.json();

    try {
        await connect();
        body.password = await bcrypt.hash(body.password, 5);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return new NextResponse("Usuario no encontrado", { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        return new NextResponse("Error al actualizar el usuario", { status: 500 });
    }
};
