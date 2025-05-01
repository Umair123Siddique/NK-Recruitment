"use client"

import { useState } from "react"
import Image from "next/image"

// Team data organized by departments
const teamData = {
  leadership: [
    {
      id: 1,
      name: "Nathan King",
      position: "Founder & CEO",
      image: "/images/team/nathan-king.png",
      bio: "With over 20 years of experience in recruitment and HR consulting, Nathan founded NK Recruitment with a vision to transform how companies find talent and professionals advance their careers.",
      social: {
        linkedin: "https://linkedin.com/in/nathanking",
        twitter: "https://twitter.com/nathanking",
        email: "nathan@nkrecruitment.com",
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Chief Operations Officer",
      image: "/images/team/sarah-johnson.png",
      bio: "Sarah oversees all operational aspects of NK Recruitment, ensuring our processes deliver exceptional results for both clients and candidates. Her background in business transformation has been instrumental in our growth.",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        email: "sarah@nkrecruitment.com",
      },
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "/images/team/michael-chen.png",
      bio: "Michael leads our technology initiatives, developing innovative solutions that enhance our recruitment capabilities. His expertise in AI and data analytics has revolutionized our candidate matching process.",
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelchen",
        email: "michael@nkrecruitment.com",
      },
    },
  ],
  specialists: [
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "IT Recruitment Specialist",
      image: "/images/team/emily-rodriguez.png",
      bio: "Emily specializes in tech recruitment, with particular expertise in software development, data science, and cybersecurity roles. Her technical background allows her to match candidates with precision.",
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        email: "emily@nkrecruitment.com",
      },
    },
    {
      id: 5,
      name: "David Thompson",
      position: "Finance Recruitment Lead",
      image: "/images/team/david-thompson.png",
      bio: "David heads our finance recruitment division, placing professionals in banking, investment, accounting, and fintech roles. His network in the financial sector is unparalleled.",
      social: {
        linkedin: "https://linkedin.com/in/davidthompson",
        email: "david@nkrecruitment.com",
      },
    },
    {
      id: 6,
      name: "Priya Patel",
      position: "Healthcare Recruitment Specialist",
      image: "/images/team/priya-patel.png",
      bio: "Priya focuses on healthcare recruitment, from clinical roles to healthcare administration. Her understanding of medical qualifications ensures perfect matches for these specialized positions.",
      social: {
        linkedin: "https://linkedin.com/in/priyapatel",
        email: "priya@nkrecruitment.com",
      },
    },
    {
      id: 7,
      name: "James Wilson",
      position: "Engineering Recruitment Lead",
      image: "/images/team/james-wilson.jpg",
      bio: "James specializes in engineering and manufacturing recruitment. With a background in mechanical engineering, he understands the technical requirements for roles across various industries.",
      social: {
        linkedin: "https://linkedin.com/in/jameswilson",
        email: "james@nkrecruitment.com",
      },
    },
    {
      id: 8,
      name: "Sophia Martinez",
      position: "Marketing & Creative Specialist",
      image: "/images/team/sophia-martinez.jpg",
      bio: "Sophia leads our marketing and creative recruitment division, connecting talented professionals with roles in advertising, design, digital marketing, and communications.",
      social: {
        linkedin: "https://linkedin.com/in/sophiamartinez",
        email: "sophia@nkrecruitment.com",
      },
    },
    {
      id: 9,
      name: "Robert Kim",
      position: "Executive Search Consultant",
      image: "/images/team/robert-kim.jpg",
      bio: "Robert specializes in executive and C-suite placements. His discreet approach and extensive network make him the go-to consultant for senior leadership recruitment.",
      social: {
        linkedin: "https://linkedin.com/in/robertkim",
        email: "robert@nkrecruitment.com",
      },
    },
  ],
  consultants: [
    {
      id: 10,
      name: "Olivia Taylor",
      position: "Career Development Coach",
      image: "/images/team/olivia-taylor.jpg",
      bio: "Olivia provides expert career coaching, helping professionals optimize their resumes, prepare for interviews, and develop career advancement strategies.",
      social: {
        linkedin: "https://linkedin.com/in/oliviataylor",
        email: "olivia@nkrecruitment.com",
      },
    },
    {
      id: 11,
      name: "Daniel Garcia",
      position: "HR Consultant",
      image: "/images/team/daniel-garcia.jpg",
      bio: "Daniel advises organizations on HR strategy, recruitment processes, and talent retention. His consultancy helps companies build effective recruitment frameworks.",
      social: {
        linkedin: "https://linkedin.com/in/danielgarcia",
        email: "daniel@nkrecruitment.com",
      },
    },
    {
      id: 12,
      name: "Lisa Wong",
      position: "International Recruitment Specialist",
      image: "/images/team/lisa-wong.jpg",
      bio: "Lisa manages our international recruitment initiatives, with expertise in global mobility, visa requirements, and cross-cultural workplace dynamics.",
      social: {
        linkedin: "https://linkedin.com/in/lisawong",
        email: "lisa@nkrecruitment.com",
      },
    },
  ],
}

// Social media icons as inline SVGs
const SocialIcons = {
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  ),
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
}

// Team member card component
const TeamMemberCard = ({ member }: { member: any }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg?height=320&width=320"}
          alt={member.name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex space-x-2 justify-center">
            {Object.entries(member.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url as string}
                className="bg-white/20 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s ${platform}`}
              >
                {SocialIcons[platform as keyof typeof SocialIcons]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.position}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
      </div>
    </div>
  )
}

const OurTeamSection = () => {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All Team" },
    { id: "leadership", label: "Leadership" },
    { id: "specialists", label: "Specialists" },
    { id: "consultants", label: "Consultants" },
  ]

  // Combine all team members or filter by active tab
  const displayedTeam =
    activeTab === "all"
      ? [...teamData.leadership, ...teamData.specialists, ...teamData.consultants]
      : teamData[activeTab as keyof typeof teamData]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
            OUR TEAM
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Meet Our Recruitment Experts
          </h2>
          <p className="text-gray-600 text-lg">
            Our team of experienced recruitment specialists is dedicated to connecting talented professionals with their
            ideal career opportunities and helping organizations build exceptional teams.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto">
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

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-20 bg-white p-8 md:p-12 rounded-lg shadow-sm text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Join Our Team</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented recruitment professionals to join our growing team. If you&apos;re passionate
            about connecting people with opportunities and helping organizations build exceptional teams, we&apos;d love to
            hear from you.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  )
}

export default OurTeamSection
