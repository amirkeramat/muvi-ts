import axios from "axios";
import { Data } from "@/types";
const getHomeData = async (
  type: string,
  list: string,
  page: number
): Promise<Data | undefined> => {
  const baseUrl = process.env.NEXT_APP_BASE_URL;

  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;
  const options = (type: string, list: string, page: number) => {
    return {
      method: "GET",
      url: `${baseUrl}/${type}/${list}`,
      params: { language: "en-US", page },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
  };

  try {
    const res = await axios.request(options(type, list, page));

    return res.data;
  } catch (error) {
    console.log("Error in fetching data", error);

    return undefined;
  }
};

export default getHomeData;
