import OurTeamSection from "@/components/OurTeam/OurTeamSection";


export default function TeamPage() {
  return (
    <main>
      <div className="pt-32 pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">Our Team</h1>
          <p className="text-white/90 text-lg md:text-xl text-center mt-4 max-w-3xl mx-auto">
            Meet the dedicated professionals behind NK Recruitment&apos;s success
          </p>
        </div>
      </div>
      <OurTeamSection/>
    </main>
  )
}
