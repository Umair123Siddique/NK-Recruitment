import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import AboutPage from "./about/page";
import AboutSection from "@/components/About/AboutSection";
import ServicesSection from "@/components/Services/ServicesSection";
import StatsSection from "@/components/Stats/StatSection";
import ProcessSection from "@/components/Process/ProcessSection";
import TestimonialsSection from "@/components/Testimonials/TestimonialSection";
import CTASection from "@/components/CTA/CtaSection";
import ContactSection from "@/components/Contact/ContactSection";
import FAQSection from "@/components/Faq/FaqSection";

export const metadata: Metadata = {
  title: "NK Recruitment",
  description: "Your future aur mission",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSection/>
      <ServicesSection/>
      <StatsSection/>
      <ProcessSection/>
      <TestimonialsSection/>
      <FAQSection/>
      <CTASection/>
      <ContactSection/>
      {/* <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact /> */}
    </>
  );
}
