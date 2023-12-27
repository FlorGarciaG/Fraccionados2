import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, password, role = 'user' } = await request.json();

  await connect();

  const existingUser = await User.findOne({ name });

  if (existingUser) {
    return new NextResponse("User already exists", { status: 409 });
  }

  // Si el usuario no existe, se realiza la creación
  const hashedPassword = await bcrypt.hash(password, 5);

  // console.log('Valor de role:', role); 
  const newUser = new User({
    name,
    role,
    password: hashedPassword,
  });

  // console.log('Nuevo usuario:', newUser);

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
