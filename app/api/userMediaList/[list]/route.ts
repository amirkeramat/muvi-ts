import { prismadb } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(
  request: Request,
  { params }: { params: { list: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("UnAuthorized", { status: 404 });
    }

    const body = await request.json();

    const { mediaId, mediaType } = body;

    if (!mediaId || !mediaType) {
      return new NextResponse("Fields is required", { status: 401 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user || !user.email) {
      return new NextResponse("User not Exist", { status: 403 });
    }

    if (params.list === "watchList") {
      const isExisted = await prismadb.watchList.findFirst({
        where: {
          mediaId: mediaId,
          userId: user.id,
        },
      });
      if (!isExisted) {
        const watchList = await prismadb.watchList.create({
          data: {
            ...body,
            userId: user.id,
          },
        });
        return NextResponse.json(watchList);
      }
      return new NextResponse(`Already added to your ${params.list}`, {
        status: 201,
      });
    } else {
      const isExisted = await prismadb.favoriteList.findFirst({
        where: {
          mediaId: mediaId,
          userId: user.id,
        },
      });
      if (!isExisted) {
        const favoriteList = await prismadb.favoriteList.create({
          data: {
            ...body,
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
      include: {
        watchList: true,
        favoriteList: true,
      },
    });

    if (!user) {
      return new NextResponse("Not user find", { status: 501 });
    }

    // Extract the page parameter from the query string (default to 1 if not provided).
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const pageParam = urlParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (params.list === "watchList") {
      // Adjust the number of items per page and calculate the offset based on the page.
      const itemsPerPage = 10;
      const offset = (page - 1) * itemsPerPage;

      const allWatchList = user.watchList;

      const total_pages = Math.ceil(allWatchList.length / 10);

      const total_results = allWatchList.length;

      const watchList = await prismadb.watchList.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: itemsPerPage, // Limit the number of items per page
        skip: offset, // Skip items based on the page
      });

      const resData = {
        page,
        results: watchList,
        total_pages,
        total_results,
      };

      return NextResponse.json(resData);
    } else {
      const itemsPerPage = 10;

      const offset = (page - 1) * itemsPerPage;

      const allFavoriteList = user.favoriteList;

      const total_pages = Math.ceil(allFavoriteList.length / 10);

      const total_results = allFavoriteList.length;

      const favoriteList = await prismadb.favoriteList.findMany({
        where: {
          userId: user.id,
        },
        take: itemsPerPage, // Limit the number of items per page
        skip: offset, // Skip items based on the page
        orderBy: {
          createdAt: "desc",
        },
      });

      const resData = {
        page,
        results: favoriteList,
        total_pages,
        total_results,
      };
      return NextResponse.json(resData);
    }
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { list: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("UnAuthorized", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return new NextResponse("User Not Find!", { status: 401 });
    }
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const idParam = urlParams.get("id");

    

    if (!idParam) {
      return new NextResponse("The media Id is required", { status: 404 });
    }

    const mediaId = idParam || "";

    if (params.list === "watchList") {
      const watchList = await prismadb.watchList.deleteMany({
        where: {
          userId: user.id,
          mediaId,
        },
      });

      return NextResponse.json(watchList);
    } else {
      const favoriteList = await prismadb.favoriteList.deleteMany({
        where: {
          userId: user.id,
          mediaId,
        },
      });

      return NextResponse.json(favoriteList);
    }
  } catch (error) {
    console.log("Internal Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
