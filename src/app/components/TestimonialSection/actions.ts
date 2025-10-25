import { Testimonial } from "./types";
import AxiosInstance from "@/api/AxiosInstance";

export async function fetchTestimonials(): Promise<Testimonial[]> {
    
    try {
        const response = await AxiosInstance().get<Testimonial[]>(`/posts`);
        return response.data;
    } catch (error) {
        console.error('fetchTestimonials error:', error);
        return [] as Testimonial[];
    }
}
