import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { School, MessageSquare, Building, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">About RUNGTAI</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg text-gray-700 mb-4">
            RUNGTAI is an interactive AI agent designed to provide comprehensive virtual tours of our college campus.
            Available 24/7, RUNGTAI offers detailed information about building locations, historical facts, and
            available facilities.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you're a prospective student, a new arrival, or just looking to learn more about our campus, RUNGTAI
            is here to help you navigate and discover everything our institution has to offer.
          </p>
          <p className="text-lg text-gray-700">
            The name "RUNGTAI" represents our commitment to being a reliable, understanding, nurturing guide through
            academic institutions.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/RC.jpg?height=300&width=400"
            alt="RUNGTAI AI Assistant"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Building className="h-10 w-10 text-emerald-600" />}
          title="Campus Information"
          description="Detailed information about all campus buildings, their history, and available facilities."
        />
        <FeatureCard
          icon={<MessageSquare className="h-10 w-10 text-emerald-600" />}
          title="24/7 Chatbot"
          description="Always available to answer questions about campus life, academic deadlines, and services."
        />
        <FeatureCard
          icon={<School className="h-10 w-10 text-emerald-600" />}
          title="Academic Resources"
          description="Information about academic programs, deadlines, and educational resources."
        />
        <FeatureCard
          icon={<Clock className="h-10 w-10 text-emerald-600" />}
          title="Always Available"
          description="Access campus information and assistance any time, day or night."
        />
      </div>

      <h2 className="text-2xl font-bold text-emerald-800 mb-6">How RUNGTAI Works</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <p className="text-gray-700 mb-4">
          RUNGTAI uses advanced artificial intelligence to provide accurate and helpful information about our campus.
          The system is designed to understand natural language questions and provide relevant, detailed responses.
        </p>
        <p className="text-gray-700 mb-4">
          Our AI agent is continuously updated with the latest information about campus facilities, events, and
          services, ensuring that you always receive the most current and accurate details.
        </p>
        <p className="text-gray-700">
          RUNGTAI is designed to be user-friendly and accessible, providing a comprehensive virtual campus experience
          for all users, regardless of their technical expertise.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4 mb-8">
        <FAQItem
          question="How accurate is the information provided by RUNGTAI?"
          answer="RUNGTAI is regularly updated with the latest campus information to ensure accuracy. The system draws from official university databases and resources."
        />
        <FAQItem
          question="Can RUNGTAI help me find specific locations on campus?"
          answer="Yes, RUNGTAI can provide detailed directions to any building or facility on campus, including information about accessibility options."
        />
        <FAQItem
          question="Is RUNGTAI available on mobile devices?"
          answer="Yes, RUNGTAI is fully responsive and can be accessed on any device with a web browser, including smartphones and tablets."
        />
        <FAQItem
          question="How does RUNGTAI stay updated with campus changes?"
          answer="Our team regularly updates RUNGTAI's knowledge base with information about new buildings, renovations, policy changes, and upcoming events."
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl text-emerald-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function FAQItem({ question, answer }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-emerald-800 mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  )
}

