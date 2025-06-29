import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Coffee,
  Laptop,
} from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Sustainability Educator",
      department: "Education",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5+ years",
      salary: "₹12-18 LPA",
      description:
        "Lead the development of cutting-edge sustainability curricula and educational content. Work with subject matter experts to create engaging learning experiences.",
      requirements: [
        "Master's degree in Environmental Science or related field",
        "5+ years in educational content development",
        "Experience with online learning platforms",
        "Strong communication and presentation skills",
      ],
      featured: true,
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India / Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹10-15 LPA",
      description:
        "Build and maintain our learning platform using modern web technologies. Focus on creating intuitive user experiences and scalable backend systems.",
      requirements: [
        "Bachelor's degree in Computer Science or equivalent",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Knowledge of database design and optimization",
      ],
      featured: false,
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹8-12 LPA",
      description:
        "Design intuitive and engaging user interfaces for our sustainability learning platform. Collaborate with educators and developers to create exceptional user experiences.",
      requirements: [
        "Bachelor's degree in Design or related field",
        "Proficiency in Figma, Adobe Creative Suite",
        "Experience with user research and testing",
        "Portfolio demonstrating UX/UI design skills",
      ],
      featured: false,
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4+ years",
      salary: "₹9-13 LPA",
      description:
        "Develop and execute content marketing strategies to promote sustainability education. Create compelling content across multiple channels and platforms.",
      requirements: [
        "Bachelor's degree in Marketing or Communications",
        "4+ years in content marketing or digital marketing",
        "Experience with SEO and social media marketing",
        "Excellent writing and storytelling skills",
      ],
      featured: false,
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Bangalore, India / Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹12-18 LPA",
      description:
        "Analyze learning data to improve educational outcomes and platform performance. Develop predictive models and insights to enhance user experience.",
      requirements: [
        "Master's degree in Data Science or related field",
        "Proficiency in Python, R, and SQL",
        "Experience with machine learning frameworks",
        "Strong statistical analysis skills",
      ],
      featured: false,
    },
    {
      title: "Partnership Manager",
      department: "Business Development",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5+ years",
      salary: "₹15-22 LPA",
      description:
        "Build strategic partnerships with educational institutions, corporations, and NGOs to expand our reach and impact in sustainability education.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "5+ years in partnership development or sales",
        "Experience in education or sustainability sector",
        "Strong negotiation and relationship building skills",
      ],
      featured: false,
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Continuous learning opportunities, conference attendance, and skill development programs",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous vacation policy",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Laptop,
      title: "Equipment & Tools",
      description: "Latest technology, software licenses, and ergonomic workspace setup",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment, team building activities, and inclusive workplace",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Impact & Purpose",
      description: "Work on meaningful projects that create positive environmental impact globally",
      color: "from-teal-500 to-cyan-500",
    },
  ]

  const stats = [
    { value: "50+", label: "Team Members", icon: Users },
    { value: "15+", label: "Countries", icon: Globe },
    { value: "4.8/5", label: "Employee Rating", icon: Heart },
    { value: "95%", label: "Retention Rate", icon: Zap },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-100 text-green-800"
      case "Part-time":
        return "bg-blue-100 text-blue-800"
      case "Contract":
        return "bg-purple-100 text-purple-800"
      case "Internship":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Join Our
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Help us build the future of sustainability education. Join a passionate team dedicated to creating
              positive environmental impact through innovative learning experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our team and help shape the future of sustainability education
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm animate-slide-in-up ${
                  position.featured ? "ring-2 ring-green-500" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                        {position.featured && (
                          <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">Featured</Badge>
                        )}
                        <Badge className={getTypeColor(position.type)}>{position.type}</Badge>
                      </div>

                      <div className="flex items-center gap-6 text-gray-600 flex-wrap">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {position.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed">{position.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {position.requirements.slice(0, 2).map((req, reqIndex) => (
                            <li key={reqIndex} className="text-gray-600 text-sm flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex-shrink-0 space-y-3">
                      <Button className="w-full lg:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full px-6 py-3 transition-all duration-300 transform hover:scale-105">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full lg:w-auto border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full px-6 py-3"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive benefits and a supportive work environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/90 backdrop-blur-sm animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full shadow-lg`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
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
            <h2 className="text-4xl lg:text-5xl font-bold">Ready to Make an Impact?</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join our mission to educate the world about sustainability and create a better future for our planet.
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>HR Contact:</strong> careers@sustainabilitylearn.edu
              </p>
              <p className="text-lg">
                <strong>Phone:</strong> +91 80 2861 1004
              </p>
            </div>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
