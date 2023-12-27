import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Problem from "@/models/ProblemsIm";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const problem = await Problem.findById(id);

        if (!problem) {
            return new NextResponse("Problema no encontrado", { status: 404 });
        }

        return new NextResponse(JSON.stringify(problem), { status: 200 });
    } catch (err) {
        return new NextResponse("Error de la base de datos", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const deletedProblem = await Problem.findByIdAndDelete(id);

        if (!deletedProblem) {
            return new NextResponse("Problema no encontrado", { status: 404 });
        }

        return new NextResponse("Problema eliminado exitosamente", { status: 200 });
    } catch (err) {
        return new NextResponse("Error de la base de datos", { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    const { id } = params;
    const body = await request.json();
    
    try {
        await connect();

        const updatedProblem = await Problem.findByIdAndUpdate(
            id,
            body,
            {
                new: true, 
                runValidators: true,
            }
        );

        if (!updatedProblem) {
            return new NextResponse("Problema no encontrado", { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedProblem), { status: 200 });
    } catch (err) {
        console.error("Error al actualizar el problema:", err);
        return new NextResponse("Error al actualizar el problema", { status: 500 });
    }
};

