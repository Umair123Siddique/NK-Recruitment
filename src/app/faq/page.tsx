import FAQSection from '@/components/Faq/FaqSection'
import React from 'react'

function page() {
  return (
    <div>
      <div className="pt-32 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">FAQ</h1>
          <p className="text-white/90 text-lg md:text-xl text-center mt-4 max-w-3xl mx-auto">
          Find quick answers to common questions about NK Recruitments job seekeres, employers, services, process, and support.
          </p>
        </div>
      </div>
      <FAQSection/>
    </div>
  )
}

export default page
