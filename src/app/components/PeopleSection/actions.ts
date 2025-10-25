import axios from "axios";
import { People } from "./types";

export async function fetchPeople(): Promise<People> {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    try {
        const response = await axios.get<People>(`${apiUrl}/users`);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error as any;
    }
}
