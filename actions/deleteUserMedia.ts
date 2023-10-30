import axios from "axios";

const deleteUserMedia = async (list: string, id: string): Promise<number> => {
  const res = await axios.delete(`/api/userMediaList/${list}`, {
    params: {
      id,
    },
  });

  return res.status;
};

export default deleteUserMedia;
