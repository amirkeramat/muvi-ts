import { Media } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";
import { any } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { list: string } }
) {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;

  try {
    const options = () => {
      return {
        method: "GET",
        url: `${baseUrl}/${params.list}/popular`,
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };
    };

    const allData = await axios.request(options());

    const ids = allData.data.results.map((item: Media) => item.id);

    const trailers = ids.map(async (id: string) => {
      try {
        const options = () => {
          return {
            method: "GET",
            url: `${baseUrl}/${params.list}/${id}/videos`,
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          };
        };

        const res = await axios.request(options());
        if (!res.data) {
          return [];
        }
        return res.data;
      } catch (error) {
        return [];
      }
    });

    const trailerRes = await Promise.all(trailers);

    const filteredTrailers = trailerRes
      .filter((item) => item.results.length > 0)
      .map((tr) => {
        return {
          ...tr,
          results: tr.results[0],
        };
      })
      .slice(0, 15);

    const data = filteredTrailers.map((item) => {
      return {
        ...item,
        name:
          params.list === "movie"
            ? allData.data.results.find((data: Media) => data.id === item.id)
                .original_title
            : allData.data.results.find((data: Media) => data.id === item.id)
                .original_name,
        media_type: params.list,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 501 });
  }
}


