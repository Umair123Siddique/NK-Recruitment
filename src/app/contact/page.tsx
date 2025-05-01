import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import ContactSection from "@/components/Contact/ContactSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="Contact Page"
        description=""
      /> */}

      {/* <Contact /> */}
      <div className="pt-32 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">Contact Us</h1>
          <p className="text-white/90 text-lg md:text-xl text-center mt-4 max-w-3xl mx-auto">
          Have questions or ready to partner with us?
          </p>
          <p className="text-white/90 text-lg md:text-xl text-center mt-4 max-w-3xl mx-auto">
          Reach out to the NK Recruitment team we are here to help.
          </p>
        </div>
      </div>
      <ContactSection/>
    </>
  );
};

export default ContactPage;
