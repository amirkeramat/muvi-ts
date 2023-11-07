import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export  async function GET(req: Request) {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;

  try {
    const options = {
      method: "GET",
      url: `${baseUrl}/person/popular`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const res = await axios.request(options);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Internal Error", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}


export  async function POST(
  req: Request,
){

}