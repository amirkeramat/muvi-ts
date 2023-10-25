import { prismadb } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
export async function POST(
  request: Request,
  { params }: { params: { list: string } }
) {
  try {
    const session = await getSession();

    if (session?.user?.email) {
      return new NextResponse("UnAuthorized", { status: 404 });
    }

    const body = await request.json();

    const { title, mediaId, mediaType } = body;

    if (!title || !mediaId || !mediaType) {
      return new NextResponse("Fields is required", { status: 401 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return new NextResponse("User not Exist", { status: 403 });
    }

    if (params.list === "watchList") {
      const isExisted = await prismadb.watchList.findUnique({
        where: {
          mediaId: mediaId,
        },
      });

      if (!isExisted) {
        // const watchList = await prismadb.watchList.deleteMany({
        //   where: {
        //     mediaId: mediaId,
        //   },
        // });

        // return NextResponse.json(watchList);
        const watchList = await prismadb.watchList.create({
          data: {
            mediaId,
            mediaType,
            userId: user.id,
          },
        });
        return NextResponse.json(watchList);
      }
      return new NextResponse(`Already added to your ${params.list}`, {
        status: 201,
      });
    } else {
      const isExisted = await prismadb.favoriteList.findUnique({
        where: {
          mediaId: mediaId,
        },
      });
      if (!isExisted) {
        // const favoriteList = await prismadb.favoriteList.deleteMany({
        //   where: {
        //     mediaId: mediaId,
        //   },
        // });

        // return NextResponse.json(favoriteList);
        const favoriteList = await prismadb.favoriteList.create({
          data: {
            mediaId,
            mediaType: mediaType,
            userId: user.id,
          },
        });
        return NextResponse.json(favoriteList);
      }

      return new NextResponse(`Already added to your ${params.list}`, {
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { list: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("UnAuthorized", { status: 404 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return new NextResponse("Not user find", { status: 501 });
    }

    if (params.list === "watchList") {
      const watchList = await prismadb.watchList.findMany({
        where: {
          userId: user?.id,
        },
      });
      return NextResponse.json(watchList);
    } else {
      const favoriteList = await prismadb.favoriteList.findMany({
        where: {
          userId: user?.id,
        },
      });

      return NextResponse.json(favoriteList);
    }
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
