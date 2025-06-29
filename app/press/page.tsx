import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, ExternalLink, Award, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function PressPage() {
  const pressReleases = [
    {
      title: "Learn for Sustainability Reaches 100,000 Active Learners Milestone",
      date: "2024-01-15",
      category: "Milestone",
      excerpt:
        "Our platform has successfully educated over 100,000 individuals worldwide in sustainable practices and renewable energy technologies.",
      featured: true,
    },
    {
      title: "Partnership with Leading Universities to Expand Sustainability Education",
      date: "2024-01-10",
      category: "Partnership",
      excerpt:
        "New collaborations with top universities will bring cutting-edge sustainability research directly to our learning platform.",
      featured: false,
    },
    {
      title: "Launch of Interactive Carbon Footprint Calculator",
      date: "2024-01-05",
      category: "Product",
      excerpt:
        "New tool helps users calculate and reduce their environmental impact with personalized recommendations and tracking.",
      featured: false,
    },
    {
      title: "Recognition as Top EdTech Platform for Environmental Education",
      date: "2023-12-20",
      category: "Award",
      excerpt:
        "Industry recognition for innovation in making sustainability education accessible and engaging for global audiences.",
      featured: false,
    },
    {
      title: "Solar Energy Course Completion Rate Reaches 95%",
      date: "2023-12-15",
      category: "Achievement",
      excerpt:
        "Our comprehensive solar energy curriculum achieves industry-leading completion rates with practical, hands-on learning.",
      featured: false,
    },
  ]

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      size: "2.5 MB",
      type: "ZIP",
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity guidelines and usage instructions",
      size: "1.8 MB",
      type: "PDF",
    },
    {
      title: "Product Screenshots",
      description: "High-quality screenshots of our platform and features",
      size: "15.2 MB",
      type: "ZIP",
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      size: "8.7 MB",
      type: "ZIP",
    },
  ]

  const stats = [
    { icon: Users, value: "100K+", label: "Active Learners", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingUp, value: "95%", label: "Course Completion", color: "from-green-500 to-emerald-500" },
    { icon: Award, value: "15+", label: "Industry Awards", color: "from-purple-500 to-pink-500" },
    { icon: Calendar, value: "50+", label: "Countries Reached", color: "from-amber-500 to-orange-500" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Milestone":
        return "bg-blue-100 text-blue-800"
      case "Partnership":
        return "bg-green-100 text-green-800"
      case "Product":
        return "bg-purple-100 text-purple-800"
      case "Award":
        return "bg-yellow-100 text-yellow-800"
      case "Achievement":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Press &
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Media
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest news, announcements, and achievements from Learn for Sustainability. Access
              our media kit and press resources.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Download Media Kit
                <Download className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Contact Press Team
                <ExternalLink className="ml-2 h-5 w-5" />
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
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Recent press releases and company announcements</p>
          </div>

          <div className="space-y-8">
            {pressReleases.map((release, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm animate-slide-in-up ${
                  release.featured ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge className={getCategoryColor(release.category)}>{release.category}</Badge>
                        {release.featured && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Featured</Badge>
                        )}
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(release.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {release.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">{release.excerpt}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Media Kit</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download our complete media kit with logos, brand guidelines, and high-resolution assets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/90 backdrop-blur-sm cursor-pointer animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Download className="h-8 w-8 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.type}</span>
                    <span>{item.size}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 transform hover:scale-105">
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Media Inquiries</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              For press inquiries, interviews, or additional information, please contact our media relations team.
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Press Contact:</strong> Sarah Johnson, Communications Director
              </p>
              <p className="text-lg">
                <strong>Email:</strong> press@sustainabilitylearn.edu
              </p>
              <p className="text-lg">
                <strong>Phone:</strong> +91 80 2861 1005
              </p>
            </div>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Press Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
