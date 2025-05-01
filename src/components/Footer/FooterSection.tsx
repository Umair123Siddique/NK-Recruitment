import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-12 w-40">
                <Image
                  src="/images/nk-recruitment-logo-white.png"
                  alt="NK Recruitment"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              NK Recruitment is a leading recruitment agency specializing in connecting talented professionals with
              premier job opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white transition-colors">
                  Job Listings
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/executive-recruitment"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Executive Recruitment
                </Link>
              </li>
              <li>
                <Link href="/services/permanent-staffing" className="text-gray-400 hover:text-white transition-colors">
                  Permanent Staffing
                </Link>
              </li>
              <li>
                <Link href="/services/contract-staffing" className="text-gray-400 hover:text-white transition-colors">
                  Contract Staffing
                </Link>
              </li>
              <li>
                <Link href="/services/career-coaching" className="text-gray-400 hover:text-white transition-colors">
                  Career Coaching
                </Link>
              </li>
              <li>
                <Link href="/services/talent-acquisition" className="text-gray-400 hover:text-white transition-colors">
                  Talent Acquisition
                </Link>
              </li>
              <li>
                <Link href="/services/hr-consulting" className="text-gray-400 hover:text-white transition-colors">
                  HR Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Business Avenue, Suite 500, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@nkrecruitment.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-bold mb-2">Working Hours</h4>
              <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} NK Recruitment. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
