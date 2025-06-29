import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Award, Globe, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Srijit Das",
      description: "Leading researcher in renewable energy systems with 15+ years experience.",
    },
    {
      name: "Srishankar P R",
      description: "Passionate about making sustainability education accessible to everyone.",
    },
    {
      name: "Sukeerth G Kashyap",
      description: "Creating intuitive learning experiences for complex environmental topics.",
    },
    {
      name: "T G Sanika",
      description: "Tracking environmental impact and measuring learning outcomes.",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To educate and empower individuals to make sustainable choices that protect our planet for future generations.",
    },
    {
      icon: Globe,
      title: "Vision",
      description:
        "A world where everyone has the knowledge and tools to live sustainably and contribute to environmental preservation.",
    },
    {
      icon: Award,
      title: "Values",
      description: "Integrity, innovation, accessibility, and environmental stewardship guide everything we do.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              About
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're dedicated to making sustainability education accessible, engaging, and actionable for learners
              worldwide. Together, we can build a more sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and commitment to sustainability education
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-green-50"
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full shadow-lg">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate experts working to make sustainability education accessible to all
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Join Our Community</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Be part of a global movement towards sustainability. Start learning, take action, and make a difference
              today.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
