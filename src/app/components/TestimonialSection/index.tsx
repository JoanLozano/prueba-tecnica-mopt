
import { fetchTestimonials } from "./actions";
import SliderCards from "./SliderCards";
export default async function TestimonialSection() {

    const testimonials = await fetchTestimonials();


    return (
        <section className="bg-white my-10 dark:bg-gray-900 max-w-7xl w-full min-w-[200px] mx-auto">
            <div className="px-4 lg:px-6 py-5">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                        Testimonios
                    </h2>
                    {!testimonials || testimonials.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No se encontraron testimonios.</div>
                    ) : (
                        <SliderCards testimonials={testimonials} />
                    )}
                </div>
            </div>
        </section>
    )
}
