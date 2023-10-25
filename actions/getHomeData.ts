import axios from "axios";
import { Data } from "@/types";
const getHomeData = async (
  type: string,
  list: string,
  page: number
): Promise<Data> => {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  
  const apiKey = process.env.NEXT_APP_TMDB_API_KEY;
  const options = (type: string, list: string, page: number) => {
    return {
      method: "GET",
      url: `${baseUrl}/${type}/${list}/?page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
  };

  const res = await axios.request(options(type, list, page));

  return res.data;
};

export default getHomeData;
