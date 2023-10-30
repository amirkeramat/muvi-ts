import axios from "axios";
import { NextResponse } from "next/server";

async function fetchData(
  baseUrl: string,
  apiKey: string,
  query: string,
  page: string,
  list: string
) {
  const options = {
    method: "GET",
    url: `${baseUrl}/search/${list}`,
    params: { query, language: "en-US", include_adult: "false", page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error in fetching ${list} data`, error);
    throw error;
  }
}

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_APP_BASE_URL || "";
  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;

  if (!apiKey) return new NextResponse("Missing API Key", { status: 403 });

  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const query = urlParams.get("query");
  const pageParam = urlParams.get("page");
  const page = pageParam || "1";

  if (!query)
    return new NextResponse("Search Value is required", { status: 402 });

  try {
    const listNames = [
      "multi",
      "tv",
      "movie",
      "collection",
      "company",
      "keyword",
      "person",
    ];
    const requests = listNames.map(async (list) =>
      fetchData(baseUrl, apiKey, query, page, list)
    );

    const responses = await Promise.all(requests);

    const res = Object.fromEntries(
      listNames.map((list, index) => [list, responses[index]])
    );
    

    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("INTERNAL ERROR", { status: 500 });
  }
}
