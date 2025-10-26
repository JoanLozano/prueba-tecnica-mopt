"use client"

import { Testimonial } from "./types"

export default function CardTestimonial({ testimonial }: { testimonial: Testimonial }) {
    return (
        <section className="w-full h-full border border-gray-100 shadow rounded relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 snap-center shrink-0">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] dark:opacity-10" />
            {/* fondo decorativo: reducido a 120% y centrado para evitar overflow horizontal */}
            <div className="absolute inset-y-0 left-1/2 -z-10 -translate-x-1/2 w-[120%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 dark:bg-gray-900 dark:shadow-indigo-500/5 dark:ring-white/5 pointer-events-none" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="">
                    <blockquote className="text-center text-lg font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        <p>
                            {testimonial.title}
                        </p>
                    </blockquote>
                    <blockquote className="text-center text-base font-semibold text-gray-900 mt-5 dark:text-white">
                        <p>
                            {testimonial.body}
                        </p>
                    </blockquote>
                </figure>
            </div>
        </section>
    )
}
