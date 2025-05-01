import { ArrowRight } from "lucide-react"

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Submit Your Profile",
      description: "Register with NK Recruitment and submit your resume and career preferences to our database.",
    },
    {
      number: "02",
      title: "Initial Consultation",
      description: "Meet with our recruitment specialists to discuss your career goals and job requirements.",
    },
    {
      number: "03",
      title: "Job Matching",
      description: "We match your skills and experience with suitable job opportunities from our extensive network.",
    },
    {
      number: "04",
      title: "Interview Preparation",
      description: "Receive comprehensive interview coaching and preparation to maximize your chances of success.",
    },
    {
      number: "05",
      title: "Job Placement",
      description: "Once selected, we assist with the job offer negotiation and ensure a smooth onboarding process.",
    },
    {
      number: "06",
      title: "Ongoing Support",
      description: "We provide continuous support even after placement to ensure your long-term career success.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
            OUR PROCESS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How NK Recruitment Works
          </h2>
          <p className="text-gray-600 text-lg">
            Our streamlined recruitment process is designed to efficiently connect talented professionals with their
            ideal career opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg relative group hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <div className="absolute top-6 right-6 text-4xl font-bold text-gray-100 group-hover:text-white/20">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white">{step.title}</h3>
              <p className="text-gray-600 group-hover:text-white/90">{step.description}</p>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
