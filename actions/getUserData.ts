import { User, favoriteList, watchList,Review } from "@prisma/client";
import axios from "axios";

const getUserData = async (): Promise<
  User & { watchList: watchList[]; favoriteList: favoriteList[] ,reviews:Review[]}
> => {
  const res = await axios("/api/profile");

  return res.data;
};

export default getUserData;
