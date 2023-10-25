import { favoriteList } from "@prisma/client";
import axios from "axios";

const getFavorite = async (): Promise<favoriteList> => {
  const res = await axios.get(`/api/userMediaList/favoriteList`);


  return res.data;
};

export default getFavorite;
