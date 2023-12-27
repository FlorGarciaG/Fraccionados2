import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Problem from "@/models/ProblemsEs";

export const GET = async (request) => {
    try {
        await connect();

        const problems = await Problem.find();

        return new NextResponse(JSON.stringify(problems), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();

    const newProblem = new Problem(body);

    try {
        await connect();

        await newProblem.save();

        return new NextResponse("Problema ha sido creado", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

