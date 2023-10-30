import { Data } from "@/types";
import axios from "axios";

const getHeroSectionData = async (list: string, type: string): Promise<Data> => {
  const res = await axios.get(`api/${type}/${list}`);

  return res.data;
};

export default getHeroSectionData;
