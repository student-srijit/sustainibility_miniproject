import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sun,
  Wind,
  Recycle,
  Lightbulb,
  ArrowRight,
  Globe,
  Zap,
  Sparkles,
  TreePine,
  Droplets,
  Leaf,
  Star,
  Award,
  Users,
  TrendingUp,
  Shield,
  Heart,
  Rocket,
  Target,
} from "lucide-react"
import Image from "next/image"
import { Testimonials } from "@/components/testimonials"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth-service"

export default async function HomePage() {
  // Auth check
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value
  let isAuthenticated = false
  if (token) {
    const decoded = await verifyToken(token)
    if (decoded && decoded.userId) {
      isAuthenticated = true
    }
  }

  const topics = [
    {
      title: "Solar Energy",
      description:
        "Master photovoltaic technology and solar panel systems with cutting-edge simulations and real-world case studies",
      icon: Sun,
      href: "/solar-energy",
      color: "from-yellow-400 via-orange-400 to-red-500",
      bgColor: "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600",
      stats: "2.8 TW Global Capacity",
      growth: "+23% YoY",
      difficulty: "Intermediate",
      duration: "6 weeks",
      students: "45K+",
    },
    {
      title: "Wind Energy",
      description:
        "Explore advanced wind turbine technology and offshore wind farms with interactive 3D models and simulations",
      icon: Wind,
      href: "/wind-energy",
      color: "from-blue-400 via-cyan-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
      stats: "899 GW Global Capacity",
      growth: "+18% YoY",
      difficulty: "Advanced",
      duration: "8 weeks",
      students: "38K+",
    },
    {
      title: "Recycling",
      description:
        "Transform waste into valuable resources through innovative circular economy principles and advanced recycling technologies",
      icon: Recycle,
      href: "/recycling",
      color: "from-green-400 via-emerald-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      stats: "75% Recycling Rate Goal",
      growth: "+12% YoY",
      difficulty: "Beginner",
      duration: "4 weeks",
      students: "62K+",
    },
    {
      title: "Energy Efficiency",
      description:
        "Optimize energy consumption with smart technologies, IoT sensors, and AI-powered energy management systems",
      icon: Lightbulb,
      href: "/energy-efficiency",
      color: "from-amber-400 via-yellow-400 to-lime-500",
      bgColor: "bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-50",
      iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
      stats: "40% Energy Savings",
      growth: "+31% YoY",
      difficulty: "Intermediate",
      duration: "5 weeks",
      students: "53K+",
    },
  ]

  const stats = [
    {
      icon: Globe,
      value: "195+",
      label: "Countries Covered",
      color: "from-blue-500 to-purple-600",
      description: "Global reach across all continents",
      trend: "+15%",
    },
    {
      icon: TreePine,
      value: "2.5M+",
      label: "Trees Saved",
      color: "from-green-500 to-emerald-600",
      description: "Through our sustainability initiatives",
      trend: "+28%",
    },
    {
      icon: Zap,
      value: "85%",
      label: "Energy Reduction",
      color: "from-yellow-500 to-orange-600",
      description: "Average efficiency improvement",
      trend: "+12%",
    },
    {
      icon: Droplets,
      value: "1.2B",
      label: "Liters Water Saved",
      color: "from-cyan-500 to-blue-600",
      description: "Through conservation programs",
      trend: "+22%",
    },
  ]

  const features = [
    {
      title: "Interactive Learning",
      description: "Engage with immersive 3D simulations, AR experiences, and hands-on virtual labs",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Expert Content",
      description: "Learn from Nobel laureates, industry leaders, and sustainability pioneers",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real Impact",
      description: "Track your environmental footprint and see your contribution to global sustainability",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Global Community",
      description: "Connect with 100K+ learners, researchers, and changemakers worldwide",
      icon: Users,
      color: "from-orange-500 to-red-500",
    },
  ]

  const achievements = [
    { icon: Users, value: "100K+", label: "Active Learners" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Award, value: "50+", label: "Industry Awards" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/80 via-blue-50/60 to-emerald-50/80 relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-float-delayed blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-full animate-float blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full animate-float-delayed blur-2xl"></div>

        {/* Secondary floating elements */}
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full animate-pulse-slow blur-xl"></div>
        <div className="absolute top-2/3 right-1/4 w-28 h-28 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full animate-bounce-gentle blur-xl"></div>

        {/* Particle system */}
        <div className="particles-dense absolute inset-0"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-transparent to-blue-600/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-fade-in-up">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-full text-sm font-semibold text-green-800 animate-shimmer border border-green-200/50 hover-lift">
                  <Sparkles className="w-5 h-5 mr-3 animate-spin-slow" />
                  <span className="gradient-text-green">Join 100K+ Sustainability Champions</span>
                  <div className="ml-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse-slow">
                    NEW
                  </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-tight tracking-tight">
                    <span className="block animate-fade-in-up">Learn About</span>
                    <span
                      className="block gradient-text-rainbow animate-gradient text-shadow-xl animate-fade-in-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      Sustainability
                    </span>
                  </h1>

                  <div className="relative">
                    <p
                      className="text-2xl lg:text-3xl text-gray-600 max-w-2xl leading-relaxed font-medium animate-fade-in-up"
                      style={{ animationDelay: "0.4s" }}
                    >
                      Master renewable energy and sustainability through
                      <span className="font-bold text-green-700 animate-pulse-slow">
                        {" "}
                        immersive learning experiences.
                      </span>
                      <br />
                      <span className="text-xl text-gray-500 animate-typewriter">
                        Join millions creating a greener future...
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                {!isAuthenticated && (
                  <Link href="/login" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="lg"
                      className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 hover:from-green-700 hover:via-emerald-700 hover:to-blue-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-110 btn-magnetic btn-glow overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                        Start Learning Journey
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    </Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link href="/quiz" passHref legacyBehavior>
                    <Button
                      as="a"
                      variant="outline"
                      size="lg"
                      className="group relative border-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-10 py-6 text-xl font-bold rounded-2xl transition-all duration-700 hover:shadow-2xl hover:scale-110 btn-magnetic bg-white/80 backdrop-blur-sm overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <Zap className="mr-3 h-6 w-6 group-hover:animate-spin" />
                        Take Sustainability Quiz
                        <Star className="ml-3 h-6 w-6 group-hover:animate-spin transition-transform duration-500" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Features Preview */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-4 p-6 glass rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover-lift animate-slide-in-up"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <div
                      className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-slow`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 animate-fade-in-up"
                style={{ animationDelay: "1s" }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group text-center hover-lift animate-scale-in"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 group-hover:scale-125 transition-all duration-500 shadow-xl animate-pulse-slow relative overflow-hidden`}
                    >
                      <stat.icon className="h-8 w-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500 mb-2">{stat.description}</div>
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/40 to-blue-400/40 rounded-3xl blur-3xl animate-pulse-slow" />

              <div className="relative glass rounded-3xl p-8 border border-white/30 hover:scale-105 transition-transform duration-700 group">
                <Image
                  src="/team_b14_logo.jpg"
                  alt="Learn for Sustainability - Empowering Green Education"
                  width={700}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                  priority
                />

                {/* Floating badges */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-gentle shadow-xl">
                  <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-float shadow-xl">
                  <Leaf className="w-8 h-8 text-white animate-pulse-slow" />
                </div>

                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-wiggle shadow-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-24 bg-white/60 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50/50 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-full text-lg font-bold text-green-800 mb-8 animate-shimmer border border-green-200/50">
              <Globe className="w-6 h-6 mr-3 animate-spin-slow" />
              <span className="gradient-text">Comprehensive Learning Modules</span>
              <Award className="w-6 h-6 ml-3 animate-bounce-gentle" />
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 gradient-text animate-gradient">
              Explore Sustainability Topics
            </h2>

            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Dive deep into various aspects of sustainability and renewable energy with our
              <span className="font-bold text-green-700"> expertly crafted, interactive learning modules</span>
              designed for real-world impact and career advancement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {topics.map((topic, index) => (
              <Link key={index} href={topic.href} className="group">
                <Card
                  className={`group cursor-pointer border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-6 ${topic.bgColor} overflow-hidden animate-slide-in-up glass relative hover-lift`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

                  <CardContent className="p-8 text-center space-y-8 relative z-10">
                    {/* Icon Section */}
                    <div className="relative">
                      <div
                        className={`inline-flex items-center justify-center w-28 h-28 ${topic.iconBg} rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:scale-125 animate-float relative overflow-hidden`}
                      >
                        <topic.icon className="h-14 w-14 text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse-slow" />
                        <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      </div>

                      {/* Floating badges */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>

                      <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-full animate-pulse-slow">
                        {topic.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-green-700 transition-colors duration-500">
                        {topic.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed text-sm font-medium">{topic.description}</p>

                      {/* Stats */}
                      <div className="space-y-3">
                        <div className="inline-block px-4 py-2 glass rounded-full text-xs font-bold text-gray-700 border border-white/30">
                          📊 {topic.stats}
                        </div>

                        <div className="flex justify-center space-x-2 text-xs">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                            {topic.growth}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                            {topic.duration}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                            {topic.students}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-center text-gray-500 group-hover:text-green-700 transition-colors duration-500 pt-6">
                      <span className="text-lg font-bold">Explore Module</span>
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-20 animate-fade-in-up">
            <Button
              size="lg"
              variant="outline"
              className="group border-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-700 hover:shadow-2xl hover:scale-110 btn-magnetic bg-white/80 backdrop-blur-sm"
            >
              <span className="flex items-center">
                <Globe className="mr-3 h-6 w-6 group-hover:animate-spin" />
                View All Learning Modules
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-green-400 rounded-full animate-float blur-2xl"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-blue-400 rounded-full animate-float-delayed blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-emerald-400 rounded-full animate-float blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-cyan-400 rounded-full animate-float-delayed blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl lg:text-6xl font-black mb-6 gradient-text-rainbow">Our Achievements</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Recognized globally for excellence in sustainability education
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center group animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-125 transition-all duration-500 shadow-2xl animate-pulse-slow">
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">
                  {achievement.value}
                </div>
                <div className="text-gray-300 font-semibold">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-float blur-2xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white rounded-full animate-float-delayed blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-white rounded-full animate-float blur-2xl"></div>
          <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-white rounded-full animate-float-delayed blur-2xl"></div>
          <div className="particles absolute inset-0"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up">
            <div className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold mb-8 animate-shimmer">
              <TreePine className="w-6 h-6 mr-3 animate-bounce-gentle" />
              Join the Sustainability Revolution
              <Rocket className="w-6 h-6 ml-3 animate-float" />
            </div>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight">
              Ready to Make a
              <span className="block text-yellow-300 animate-pulse-slow text-shadow-xl">Real Difference?</span>
            </h2>

            <p className="text-2xl lg:text-3xl opacity-90 leading-relaxed max-w-4xl mx-auto font-medium">
              Join thousands of learners who are already making an impact on our planet's future.
              <span className="font-bold"> Start your sustainability journey today</span> and become part of the
              solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <Button
                size="lg"
                className="group bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-2xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-125 btn-magnetic btn-glow"
              >
                <span className="flex items-center">
                  <Heart className="mr-4 h-8 w-8 group-hover:animate-heartbeat text-red-500" />
                  Get Started Today
                  <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform duration-500" />
                </span>
              </Button>

              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-white/20 rounded-full border-3 border-white/40 animate-pulse-slow hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">100K+ Active Learners</div>
                  <div className="text-sm opacity-80">Join our global community</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 opacity-90">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl font-black mb-2">4.9★</div>
                <div className="text-lg">User Rating</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-4xl font-black mb-2">50+</div>
                <div className="text-lg">Countries</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-4xl font-black mb-2">95%</div>
                <div className="text-lg">Completion Rate</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                <div className="text-4xl font-black mb-2">24/7</div>
                <div className="text-lg">Support</div>
              </div>
            </div>

            {/* Environmental Impact Statement */}
            <div className="mt-16 p-8 glass rounded-2xl border border-white/30 backdrop-blur-sm animate-fade-in-up">
              <div className="flex items-center justify-center space-x-4 text-center">
                <Leaf className="h-8 w-8 text-green-300 animate-pulse-slow" />
                <p className="text-white/90 text-lg font-medium">
                  <span className="font-bold text-green-300">Carbon Neutral Platform:</span>
                  Powered by 100% renewable energy and offset through verified carbon credits.
                </p>
                <Shield className="h-8 w-8 text-blue-300 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
