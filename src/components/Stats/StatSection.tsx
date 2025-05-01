import { Users, Briefcase, Building2, Globe } from "lucide-react"

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      number: "15,000+",
      label: "Candidates Placed",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      number: "5,000+",
      label: "Job Openings",
    },
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      number: "500+",
      label: "Partner Companies",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      number: "20+",
      label: "Countries Served",
    },
  ]

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center bg-white/10 rounded-full p-4 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
