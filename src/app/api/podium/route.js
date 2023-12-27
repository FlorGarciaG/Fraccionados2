import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Podium from "@/models/Podium";

export const GET = async (request) => {
    try {
        await connect();

        const podium = await Podium.find();

        return new NextResponse(JSON.stringify(podium), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();

    const newPodium = new Podium(body);

    try {
        await connect();

        await newPodium.save();

        return new NextResponse("Podium ha sido creado", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

