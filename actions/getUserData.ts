import { User } from "@prisma/client";
import axios from "axios";

const getUserData = async (): Promise<User> => {
  const res = await axios("/api/profile");

  return res.data;
};

export default getUserData;
