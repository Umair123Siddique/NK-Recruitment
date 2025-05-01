"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlideContent = {
  tagline: string;
  heading: string;
  description: string;
  image: string;
  buttons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Carousel content
  const slides: SlideContent[] = [
    {
      tagline: "WE HELP FOR RECRUITMENT",
      heading: "Best Recruitment & Job Consultations",
      description:
        "Our business consulting providing actionable recommendations to help your career transformation.",
      image: "/images/hero/banner-01.jpg",
      buttons: {
        primary: {
          text: "LEARN MORE",
          link: "/about",
        },
        secondary: {
          text: "HOW WE WORK",
          link: "/services",
        },
      },
    },
    {
      tagline: "WE HELP FOR RECRUITMENT",
      heading: "Simple Process For Job Seekers",
      description:
        "Our business consulting providing actionable recommendations to help your career transformation.",
      image: "/images/hero/banner-02.jpg",
      buttons: {
        primary: {
          text: "LEARN MORE",
          link: "/about",
        },
        secondary: {
          text: "HOW WE WORK",
          link: "/services",
        },
      },
    },
    {
      tagline: "WE HELP FOR RECRUITMENT",
      heading: "Best Solution to All Employment Matters",
      description:
        "Our business consulting providing actionable recommendations to help your career transformation.",
      image: "/images/hero/banner-03.jpg",
      buttons: {
        primary: {
          text: "LEARN MORE",
          link: "/about",
        },
        secondary: {
          text: "HOW WE WORK",
          link: "/services",
        },
      },
    },
    {
      tagline: "WE HELP FOR RECRUITMENT",
      heading: "Expert Career Guidance & Placement",
      description:
        "Our team of experts provides personalized career guidance to help you achieve your professional goals.",
      image: "/images/hero/blog-01.jpg",
      buttons: {
        primary: {
          text: "LEARN MORE",
          link: "/about",
        },
        secondary: {
          text: "HOW WE WORK",
          link: "/services",
        },
      },
    },
    {
      tagline: "WE HELP FOR RECRUITMENT",
      heading: "Professional Interview Preparation",
      description:
        "Get comprehensive interview coaching and preparation to help you land your dream job with confidence.",
      image: "/images/hero/blog-02.jpg",
      buttons: {
        primary: {
          text: "LEARN MORE",
          link: "/about",
        },
        secondary: {
          text: "HOW WE WORK",
          link: "/services",
        },
      },
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-rotate carousel with pause on hover
  useEffect(() => {
    // if (isHovered) return

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      };
    },
  };

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      <div className="absolute inset-0 z-[-2]">
        <AnimatePresence custom={1} initial={false}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover object-center"
              priority={currentSlide === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="absolute left-20 bottom-10 z-20 flex space-x-2">
        <button
          onClick={prevSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
        {/* <button
          onClick={nextSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button> */}
      </div>
      <div className="absolute right-20 bottom-10 z-20 flex space-x-2">
        {/* <button
          onClick={prevSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button> */}
        <button
          onClick={nextSlide}
          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex justify-start">
      <div className="relative z-10 container">
        <motion.div
          className="-mx-4 flex flex-wrap"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentSlide}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  {/* Tagline */}
                  <motion.p className="text-green-400 mb-2 text-sm font-semibold sm:text-base">
                    {slides[currentSlide].tagline}
                  </motion.p>

                  {/* Heading */}
                  <motion.h1 className="mb-5 text-5xl leading-tight font-bold text-primary sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                    {slides[currentSlide].heading}
                  </motion.h1>

                  {/* Description */}
                  <motion.p className="mb-8 text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Buttons Container - Moved Here */}
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                    variants={fadeIn}
                  >
                    <Link
                      href={slides[currentSlide].buttons.primary.link}
                      className="bg-primary hover:bg-primary/80 rounded-md px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out sm:px-10 sm:py-4"
                    >
                      {slides[currentSlide].buttons.primary.text}
                    </Link>
                    <Link
                      href={slides[currentSlide].buttons.secondary.link}
                      className="inline-block rounded-md border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-white/10 sm:px-10 sm:py-4"
                    >
                      {slides[currentSlide].buttons.secondary.text}
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
