import Link from "next/link"
import { ArrowRight, Users, FileSearch, Award, Briefcase, GraduationCap, Target } from "lucide-react"

const ServicesSection = () => {
  const services = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Executive Recruitment",
      description: "Specialized recruitment for senior management and executive positions across various industries.",
      link: "/services/executive-recruitment",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Permanent Staffing",
      description: "Full-time placement services matching qualified candidates with suitable permanent positions.",
      link: "/services/permanent-staffing",
    },
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based needs and temporary workforce requirements.",
      link: "/services/contract-staffing",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Career Coaching",
      description: "Professional guidance for career development, including resume building and interview preparation.",
      link: "/services/career-coaching",
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Talent Acquisition",
      description: "Strategic talent sourcing and acquisition services to meet specific organizational needs.",
      link: "/services/talent-acquisition",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "HR Consulting",
      description: "Expert HR consulting services to optimize recruitment processes and workforce management.",
      link: "/services/hr-consulting",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive Recruitment & Career Services
          </h2>
          <p className="text-gray-600 text-lg">
            We offer a wide range of recruitment and career development services to help both employers find the right
            talent and job seekers advance their careers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href={service.link}
                className="inline-flex items-center text-primary font-medium group-hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors inline-block"
          >
            VIEW ALL SERVICES
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
