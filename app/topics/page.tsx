import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sun,
  Wind,
  Recycle,
  Lightbulb,
  Leaf,
  Droplets,
  Factory,
  Globe,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
} from "lucide-react"

export default function TopicsPage() {
  const mainTopics = [
    {
      title: "Solar Energy",
      description: "Harness the power of the sun with photovoltaic technology and solar thermal systems",
      icon: Sun,
      href: "/solar-energy",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
      lessons: 12,
      duration: "2 hours",
      level: "Beginner",
      students: "15.2k",
    },
    {
      title: "Wind Energy",
      description: "Convert wind power into clean electricity using modern turbine technology",
      icon: Wind,
      href: "/wind-energy",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      lessons: 10,
      duration: "1.5 hours",
      level: "Beginner",
      students: "12.8k",
    },
    {
      title: "Recycling & Waste Management",
      description: "Transform waste into valuable resources through effective recycling practices",
      icon: Recycle,
      href: "/recycling",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50 hover:bg-green-100",
      lessons: 8,
      duration: "1 hour",
      level: "Beginner",
      students: "18.5k",
    },
    {
      title: "Energy Efficiency",
      description: "Optimize energy consumption for homes, businesses, and industrial applications",
      icon: Lightbulb,
      href: "/energy-efficiency",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50 hover:bg-amber-100",
      lessons: 15,
      duration: "2.5 hours",
      level: "Intermediate",
      students: "14.1k",
    },
  ]

  const additionalTopics = [
    {
      title: "Sustainable Agriculture",
      description: "Farming practices that protect the environment and support communities",
      icon: Leaf,
      color: "from-green-500 to-lime-500",
      bgColor: "bg-green-50 hover:bg-green-100",
      lessons: 9,
      duration: "1.5 hours",
      level: "Intermediate",
      comingSoon: true,
    },
    {
      title: "Water Conservation",
      description: "Strategies for preserving and efficiently using our most precious resource",
      icon: Droplets,
      color: "from-blue-500 to-teal-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      lessons: 7,
      duration: "1 hour",
      level: "Beginner",
      comingSoon: true,
    },
    {
      title: "Green Manufacturing",
      description: "Sustainable production methods and circular economy principles",
      icon: Factory,
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      lessons: 11,
      duration: "2 hours",
      level: "Advanced",
      comingSoon: true,
    },
    {
      title: "Climate Change Science",
      description: "Understanding the science behind climate change and mitigation strategies",
      icon: Globe,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      lessons: 13,
      duration: "3 hours",
      level: "Advanced",
      comingSoon: true,
    },
  ]

  const stats = [
    { value: "50+", label: "Topics Covered", icon: BookOpen },
    { value: "100+", label: "Hours of Content", icon: Clock },
    { value: "75k+", label: "Active Learners", icon: Users },
    { value: "95%", label: "Completion Rate", icon: ArrowRight },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Explore
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                All Topics
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive learning paths covering every aspect of sustainability, renewable energy, and environmental
              conservation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Main Topics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Core Topics</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master the fundamentals of sustainability with our comprehensive courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainTopics.map((topic, index) => (
              <Link key={index} href={topic.href}>
                <Card
                  className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${topic.bgColor} overflow-hidden animate-slide-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${topic.color} rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                      >
                        <topic.icon className="h-8 w-8 text-white" />
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-sm text-gray-500">{topic.students} students</div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{topic.level}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {topic.lessons} lessons
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {topic.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors">
                        <span className="text-sm font-medium">Start Learning</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Topics */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exciting new topics in development to expand your sustainability knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalTopics.map((topic, index) => (
              <Card
                key={index}
                className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${topic.bgColor} overflow-hidden relative animate-slide-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  {topic.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      Coming Soon
                    </div>
                  )}

                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${topic.color} rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <topic.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {topic.lessons} lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {topic.duration}
                    </span>
                  </div>

                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
                    {topic.level}
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
            <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of learners who are already making a positive impact on our planet
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Begin Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
