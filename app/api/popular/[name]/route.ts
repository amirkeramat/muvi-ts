import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;

  try {
    if (!params.name) {
      return new NextResponse("Trending Name is Required", { status: 400 });
    }

    const options = () => {
      return {
        method: "GET",
        url: `${baseUrl}/${params.name}/popular`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };
    };

    const popular = await axios.request(options());

    return NextResponse.json(popular.data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
