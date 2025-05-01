"use client"

import { useState } from "react"

// FAQ data organized by categories
const faqData = {
  jobSeekers: [
    {
      question: "How do I register with NK Recruitment?",
      answer:
        "You can register with NK Recruitment by completing our online registration form, uploading your resume, and providing details about your career preferences. Once registered, one of our recruitment consultants will review your profile and contact you to discuss potential opportunities.",
    },
    {
      question: "Is there a fee for job seekers to use your services?",
      answer:
        "No, our services are completely free for job seekers. We are paid by the employers who hire through us. You'll never be charged for finding a job through NK Recruitment.",
    },
    {
      question: "How long does the recruitment process typically take?",
      answer:
        "The recruitment timeline varies depending on the position, employer requirements, and your availability. Some placements happen within days, while others might take several weeks. We work to make the process as efficient as possible while ensuring the right match.",
    },
    {
      question: "What types of positions do you recruit for?",
      answer:
        "We recruit for a wide range of positions across various industries including IT, finance, healthcare, engineering, marketing, and more. We handle roles from entry-level to executive positions, both permanent and contract-based.",
    },
    {
      question: "How should I prepare for interviews arranged through NK Recruitment?",
      answer:
        "We provide comprehensive interview preparation for all candidates. This includes company research, potential questions, presentation tips, and sometimes mock interviews. Your dedicated consultant will guide you through the entire process to maximize your chances of success.",
    },
  ],
  employers: [
    {
      question: "How does NK Recruitment find candidates for my open positions?",
      answer:
        "We use a multi-channel approach to source candidates, including our extensive database of pre-screened professionals, targeted headhunting, referral networks, job boards, social media, and industry-specific platforms. Our goal is to present you with only the most qualified candidates.",
    },
    {
      question: "What is your fee structure for employers?",
      answer:
        "Our fee structure is typically based on a percentage of the candidate's first-year salary. The exact percentage depends on the complexity of the search, seniority of the position, and whether you opt for our standard or retained search services. We're happy to provide a detailed quote based on your specific requirements.",
    },
    {
      question: "Do you offer any guarantees on placements?",
      answer:
        "Yes, we offer a replacement guarantee period for all permanent placements. If a candidate leaves within a specified period (typically 3-6 months depending on the position), we will find a replacement at no additional cost. This reflects our confidence in our selection process.",
    },
    {
      question: "How do you ensure candidates are a good fit for our company culture?",
      answer:
        "We take time to understand your company culture, values, and work environment. Our screening process includes evaluating cultural fit alongside skills and experience. We can also arrange for personality assessments and team meetings to ensure alignment before final hiring decisions.",
    },
    {
      question: "Can you handle high-volume recruitment projects?",
      answer:
        "Absolutely. We have experience managing high-volume recruitment campaigns for new office openings, expansions, and project-based needs. Our team can scale to meet your requirements, providing the same level of quality and attention regardless of volume.",
    },
  ],
  services: [
    {
      question: "What makes NK Recruitment different from other recruitment agencies?",
      answer:
        "NK Recruitment stands out through our personalized approach, industry specialization, extensive network, and commitment to long-term relationships. Our consultants are experts in their respective fields, providing insights beyond just filling positions. We focus on quality matches rather than quantity of placements.",
    },
    {
      question: "Do you offer international recruitment services?",
      answer:
        "Yes, we have extensive experience in international recruitment across multiple countries. We understand visa requirements, work permits, relocation challenges, and cultural considerations. Our global network allows us to source talent worldwide for both local and international positions.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We specialize in several key industries including Information Technology, Finance & Banking, Healthcare, Engineering, Marketing & Creative, and Executive Leadership. Each industry vertical is managed by consultants with relevant background and expertise in that field.",
    },
    {
      question: "Can you help with temporary or contract staffing?",
      answer:
        "Yes, we offer comprehensive contract and temporary staffing solutions. Whether you need staff for a specific project, to cover leave, or to manage seasonal demands, we can provide qualified professionals quickly. We handle all payroll, benefits, and administrative aspects for contract staff.",
    },
    {
      question: "What career coaching services do you offer?",
      answer:
        "Our career coaching services include resume optimization, interview preparation, salary negotiation guidance, career path planning, personal branding, and professional development advice. These services can be provided as standalone offerings or as part of our recruitment process.",
    },
  ],
  company: [
    {
      question: "How long has NK Recruitment been in business?",
      answer:
        "NK Recruitment has been in business for over 15 years. Since our founding, we've grown from a small local agency to a respected name in the recruitment industry with a global reach and thousands of successful placements.",
    },
    {
      question: "Where are your offices located?",
      answer:
        "Our headquarters is in New York, with additional offices in London, Singapore, and Sydney. We also have remote consultants in various locations, allowing us to serve clients and candidates worldwide regardless of geography.",
    },
    {
      question: "Are your recruiters certified or specially trained?",
      answer:
        "Yes, our recruiters undergo rigorous training and many hold certifications from recognized bodies such as the Institute of Recruitment Professionals (IRP), the Society for Human Resource Management (SHRM), and industry-specific certifications. We also provide ongoing professional development to keep our team updated on best practices.",
    },
    {
      question: "How do you handle confidentiality and data protection?",
      answer:
        "We take confidentiality and data protection extremely seriously. We comply with all relevant data protection regulations including GDPR. All candidate and client information is handled with strict confidentiality, and we have robust systems in place to protect personal data. Our privacy policy provides detailed information on how we collect, store, and process data.",
    },
    {
      question: "Do you have any partnerships or affiliations?",
      answer:
        "NK Recruitment maintains strategic partnerships with various professional associations, industry bodies, and educational institutions. These partnerships enhance our ability to source specialized talent and stay connected with emerging trends in different sectors.",
    },
  ],
}

// Custom Accordion Item Component
const AccordionItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left font-medium text-gray-900 hover:text-primary focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-3 px-2 text-gray-600">{answer}</div>
      </div>
    </div>
  )
}

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("jobSeekers")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const tabs = [
    { id: "jobSeekers", label: "For Job Seekers" },
    { id: "employers", label: "For Employers" },
    { id: "services", label: "Our Services" },
    { id: "company", label: "About Us" },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Have Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to commonly asked questions about our recruitment services, processes, and how we can help
            advance your career or build your team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Custom Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id ? "bg-primary text-white" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {tabs.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                {faqData[tab.id as keyof typeof faqData].map((item, index) => (
                  <AccordionItem
                    key={`${tab.id}-${index}`}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openItems[`${tab.id}-${index}`] || false}
                    onClick={() => toggleItem(`${tab.id}-${index}`)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Don&apos;t see your question here? Contact our team for personalized assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
