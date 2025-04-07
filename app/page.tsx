import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building, Calendar, Info, MapPin, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-emerald-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">Explore Our Campus with RUNGTAI</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Your 24/7 virtual guide to campus buildings, history, facilities, and student life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
                    <Link href="/tour">
                      Start Virtual Tour <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                    <Link href="/chat">
                      Ask RUNGTAI <MessageSquare className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/RC.JPG?height=400&width=600"
                  alt="Campus Overview"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">What RUNGTAI Can Help You With</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Building className="h-10 w-10 text-emerald-600" />}
                title="Campus Buildings"
                description="Get detailed information about academic buildings, dorms, and facilities."
              />
              <FeatureCard
                icon={<MapPin className="h-10 w-10 text-emerald-600" />}
                title="Navigation"
                description="Find your way around campus with detailed directions and maps."
              />
              <FeatureCard
                icon={<Info className="h-10 w-10 text-emerald-600" />}
                title="Campus History"
                description="Learn about the rich history and traditions of our institution."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-emerald-600" />}
                title="Campus Life"
                description="Information about events, dining options, and extracurricular activities."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Ready to Explore?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              RUNGTAI is available 24/7 to answer your questions about campus life, academic deadlines, counseling
              services, dining options, and more.
            </p>
            <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
              <Link href="/chat">
                Chat with RUNGTAI Now <MessageSquare className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-emerald-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

