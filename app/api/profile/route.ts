import { prismadb } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 402 });
  }

  try {
    const user = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        watchList: true,
        favoriteList: true,
      },
    });

    if (!user) {
      return new NextResponse("User not Find", { status: 403 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("Internal Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
