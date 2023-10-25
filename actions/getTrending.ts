import { Data } from "@/types";
import axios from "axios";

const getTrending =async (
    list:string
):Promise<Data>=>{

    const res =await axios.get(`api/trending/${list}`)

    return res.data

}

export default getTrending