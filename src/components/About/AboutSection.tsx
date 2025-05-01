import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/about-main.jpg"
                alt="NK Recruitment Team"
                width={600}
                height={450}
                className="rounded-lg shadow-xl object-cover w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 z-0 w-64 h-64 rounded-full bg-primary/10 hidden md:block"></div>
            <div className="absolute -top-8 -left-8 z-0 w-32 h-32 rounded-full bg-primary/20 hidden md:block"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg p-6 w-40 h-40 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-primary">15+</span>
              <span className="text-gray-600 text-center mt-2">Years Experience</span>
            </div>
          </div>

          <div>
            <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
              OUR COMPANY INTRO
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Obtaining The Best Career Opportunities & Advice
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              NK Recruitment is a leading recruitment agency specializing in connecting talented professionals with
              premier job opportunities worldwide. Our expert consultants provide personalized guidance for your career
              journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Expert Recruiters</h3>
                  <p className="text-gray-600">Industry specialists with deep market knowledge</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Global Network</h3>
                  <p className="text-gray-600">Access to opportunities worldwide</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Personalized Service</h3>
                  <p className="text-gray-600">Tailored approach for each candidate</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Career Coaching</h3>
                  <p className="text-gray-600">Professional development guidance</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors text-center"
              >
                LEARN MORE
              </Link>
              <Link
                href="/services"
                className="border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-md transition-colors text-center"
              >
                OUR SERVICES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
