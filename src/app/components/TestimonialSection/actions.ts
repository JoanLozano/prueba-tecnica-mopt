import axios from "axios";
import { Testimonial } from "./types";

export async function fetchTestimonials(): Promise<Testimonial[]> {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    try {
        const response = await axios.get<Testimonial[]>(`${apiUrl}/post`);
        return response.data;
    } catch (error) {
        console.error('fetchTestimonials error:', error);
        return [] as Testimonial[];
    }
}
