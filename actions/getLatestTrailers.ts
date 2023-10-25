import {   TrailerData } from "@/types";
import axios from "axios";

const getLatestTrailers = async (list: string): Promise<TrailerData[]> => {
  const res = await axios.get(`api/latestTrailers/${list}`);

  return res.data;
};

export default getLatestTrailers;
