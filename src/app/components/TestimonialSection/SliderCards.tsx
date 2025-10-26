"use client"

import { useKeenSlider } from "keen-slider/react"
import { useState, useEffect } from "react"
import { Testimonials } from "./types"
import CardTestimonial from "./CardTestimonial"
import TestimonialSkeleton from "./TestimonialSkeleton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

export default function SliderCards({ testimonials }: { testimonials: Testimonials }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {[1, 2, 3].map((n) => (
          <TestimonialSkeleton key={n} />
        ))}
      </div>
    )
  }

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
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
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver || !isAutoPlay) return
          timeout = setTimeout(() => {
            slider.next()
          }, 4000)
        }
        
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  useEffect(() => {
    if (slider.current && !isAutoPlay) {
      slider.current.update()
    }
  }, [isAutoPlay, slider])

  return (
    <div className="relative w-full overflow-hidden mt-5">
      {/* Header with counter and controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {currentSlide + 1}
          </span>
          {" / "}
          <span>{testimonials.length}</span>
          {" testimonios"}
        </div>
        
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label={isAutoPlay ? "Pausar auto-play" : "Iniciar auto-play"}
        >
          <FontAwesomeIcon
            icon={isAutoPlay ? faPause : faPlay}
            className="w-3 h-3"
          />
          <span className="hidden sm:inline">
            {isAutoPlay ? "Pausar" : "Reproducir"}
          </span>
        </button>
      </div>

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

      {/* Navigation arrows - Hidden on mobile, use swipe */}
      <button
        type="button"
        aria-label="Anterior"
        title="Anterior"
        className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/60 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-black hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-10 transition-all"
        onClick={() => slider?.current?.prev()}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="w-5 h-5 text-gray-700 dark:text-gray-200"
        />
      </button>

      <button
        type="button"
        aria-label="Siguiente"
        title="Siguiente"
        className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/60 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-black hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-10 transition-all"
        onClick={() => slider?.current?.next()}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          className="w-5 h-5 text-gray-700 dark:text-gray-200"
        />
      </button>

      {/* Dots indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              slider?.current?.moveToIdx(idx)
            }}
            className={`transition-all rounded-full ${
              currentSlide === idx
                ? "w-8 h-2 bg-blue-600"
                : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Ir al testimonio ${idx + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe indicator */}
      <div className="sm:hidden text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
        👆 Desliza para ver más testimonios
      </div>
    </div>
  )
}
