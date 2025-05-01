"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Software Engineer",
    company: "TechCorp Inc.",
    image: "/images/testimonial-1.png",
    rating: 5,
    text: "NK Recruitment helped me land my dream job at a leading tech company. Their career coaching and interview preparation were invaluable. I highly recommend their services to anyone looking to advance their career.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Finance Manager",
    company: "Global Finance Group",
    image: "/images/testimonial-2.png",
    rating: 5,
    text: "I was impressed by the personalized approach NK Recruitment took to understand my career goals. They matched me with the perfect opportunity that aligned with my skills and aspirations. Excellent service!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Creative Solutions",
    image: "/images/testimonial-3.png",
    rating: 5,
    text: "After struggling to find the right position for months, NK Recruitment connected me with multiple great opportunities within weeks. Their team was professional, responsive, and truly cared about finding the right fit for me.",
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Project Manager",
    company: "Construction Experts Ltd.",
    image: "/images/testimonial-4.png",
    rating: 5,
    text: "NK Recruitment's industry knowledge and connections are unmatched. They understood the specific requirements of my field and found me a position that offered both the challenge and compensation I was looking for.",
  },
]

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 6000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(nextSlide, 6000)
    }
  }

  const handlePrev = () => {
    prevSlide()
    resetInterval()
  }

  const handleNext = () => {
    nextSlide()
    resetInterval()
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from professionals who have successfully advanced their careers with NK Recruitment&apos;s expert guidance
            and placement services.
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isAnimating ? "opacity-80" : "opacity-100"
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">
                          {testimonial.position}, {testimonial.company}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic">&quot;{testimonial.text}&quot;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  resetInterval()
                }}
                className={`h-2 mx-1 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-primary" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
