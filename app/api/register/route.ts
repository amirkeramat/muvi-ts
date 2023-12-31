import bcrypt from "bcrypt";
import { prismadb } from "@/libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing Info", { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const isExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isExist) {
      return new NextResponse("email is exist try to sign in!Or use another email address", { status: 402 });
    }

    const newUser = await prismadb.user.create({
      data: {
        name,
        hashedPassword,
        email,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
