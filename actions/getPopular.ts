import { Data } from "@/types";
import axios from "axios";

const getPopular =async (
    list:string
):Promise<Data>=>{

    const res =await axios.get(`api/popular/${list}`)

    return res.data

}

export default getPopular