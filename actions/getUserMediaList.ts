import { userMediaList } from "@/types";
import axios from "axios";

const getUserMediaList = async (
  list: string,
  page: number
): Promise<userMediaList> => {
  const res = await axios.get(`/api/userMediaList/${list}`, {
    params: {
      page,
    },
  });

  return res.data;
};

export default getUserMediaList;
