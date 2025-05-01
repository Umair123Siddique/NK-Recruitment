import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re looking for your next career opportunity or seeking top talent for your organization, NK
            Recruitment is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-primary font-medium py-4 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/free-quote"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-medium py-4 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
