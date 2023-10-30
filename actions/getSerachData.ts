import axios from "axios";

const getSearchData = async (query: string, page: string) => {
 const res =  await axios
    .get(`/api/search`, {
      params: {
        query,
        page,
      },
    })
    

    return res.data
};

export default getSearchData;
