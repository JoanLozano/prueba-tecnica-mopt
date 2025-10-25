import axios from "axios";
import { People } from "./types";

export async function fetchPeople(): Promise<People> {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    try {
        const response = await axios.get<People>(`${apiUrl}/users`);
        return response.data;
    } catch (error) {
        console.error('fetchPeople error:', error);
        return [] as People;
    }
}
