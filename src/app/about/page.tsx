import AboutSection from "@/components/About/AboutSection";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="About Page"
        description=""
      /> */}
      {/* <AboutSectionOne />
      <AboutSectionTwo /> */}
      <div className="pt-32 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">About Us</h1>
          <p className="text-white/90 text-lg md:text-xl text-center mt-4 max-w-3xl mx-auto">
          Our professionals driving NK Recruitments mission to connect talent with opportunity across the globe.
          </p>
        </div>
      </div>
      <AboutSection/>
    </>
  );
};

export default AboutPage;
