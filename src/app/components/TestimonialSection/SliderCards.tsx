"use client"

import { useKeenSlider } from "keen-slider/react"
import { Testimonials } from "./types"
import CardTestimonial from "./CardTestimonial"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function SliderCards({ testimonials }: { testimonials: Testimonials }) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    mode: "free-snap",
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 640px)": { slides: { perView: 1, spacing: 10 } },
      "(min-width: 641px) and (max-width: 1024px)": { slides: { perView: 2, spacing: 12 } },
      "(min-width: 1025px)": { slides: { perView: 3, spacing: 16 } },
    },
  })

  return (
    <div className="relative w-full overflow-hidden mt-5">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider w-full">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`keen-slider__slide number-slide${index + 1} flex justify-center w-full box-border min-w-0`}
          >
            <div className="w-full min-w-0 box-border">
              <CardTestimonial testimonial={testimonial} />
            </div>
          </div>
        ))}
      </div>

      {/* Flecha izquierda */}
      <button
        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black z-10"
        onClick={() => slider?.current?.prev()}
      >
        <FontAwesomeIcon icon={faAngleLeft}  className="w-5 h-5 text-gray-700 dark:text-gray-200"/>
      </button>

      {/* Flecha derecha */}
      <button
        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black z-10"
        onClick={() => slider?.current?.next()}
      >
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-700 dark:text-gray-200"/>
      </button>
    </div>
  )
}
