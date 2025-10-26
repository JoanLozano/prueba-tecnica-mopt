
import { fetchTestimonials } from "./actions";
import SliderCards from "./SliderCards";
import { Suspense } from 'react'
import EmptyState from "../EmptyState";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function TestimonialLoading() {
    return (
        <div className="p-6 text-center text-sm text-gray-500">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto dark:bg-gray-700" />
                <div className="h-64 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
        </div>
    )
}

export default async function TestimonialSection() {
    const testimonials = await fetchTestimonials();

    return (
        <section id="testimonials" className="bg-white my-10 dark:bg-gray-900 max-w-7xl w-full min-w-[200px] mx-auto">
            <div className="px-4 lg:px-6 py-5">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-[32px] dark:text-white">
                        Testimonios
                    </h2>
                    <Suspense fallback={<TestimonialLoading />}>
                        {!testimonials || testimonials.length === 0 ? (
                            <EmptyState
                                icon={faComments}
                                title="No hay testimonios disponibles"
                                description="Vuelve pronto para ver nuevos testimonios de nuestro equipo y clientes."
                            />
                        ) : (
                            <SliderCards testimonials={testimonials} />
                        )}
                    </Suspense>
                </div>
            </div>
        </section>
    )
}
