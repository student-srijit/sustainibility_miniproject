"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, Sparkles } from "lucide-react"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Environmental Engineer",
      company: "GreenTech Solutions",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "This platform completely transformed how I understand renewable energy systems. The interactive simulations and comprehensive content made complex concepts incredibly accessible. I've successfully implemented several strategies from here in my professional work, resulting in a 40% improvement in our project efficiency.",
      highlight: "40% efficiency improvement",
      location: "San Francisco, CA",
      verified: true,
    },
    {
      name: "Michael Chen",
      role: "Sustainability Manager",
      company: "EcoCorperation Inc.",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "The carbon footprint calculator and energy audit tools helped our company reduce emissions by 35% in just one year. The educational content is world-class and the practical tools deliver real results. Our entire team now uses this platform for sustainability training.",
      highlight: "35% emission reduction",
      location: "Toronto, Canada",
      verified: true,
    },
    {
      name: "Emily Rodriguez",
      role: "High School Teacher",
      company: "Lincoln High School",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "I've been using this platform to teach my students about sustainability for two years now. The engaging animations, interactive quizzes, and gamified learning make environmental education fun and memorable. My students are now passionate advocates for environmental conservation.",
      highlight: "2 years of success",
      location: "Austin, TX",
      verified: true,
    },
    {
      name: "David Thompson",
      role: "Homeowner & Solar Enthusiast",
      company: "Renewable Energy Advocate",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "The solar calculator was incredibly accurate! I saved $3,200 in my first year after installing panels based on their recommendations. The payback period was exactly as predicted, and the ongoing monitoring tools help me optimize my energy usage daily.",
      highlight: "$3,200 saved in year one",
      location: "Phoenix, AZ",
      verified: true,
    },
    {
      name: "Dr. Lisa Park",
      role: "Climate Researcher",
      company: "University of California",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "As a climate researcher, I'm impressed by the scientific accuracy and up-to-date information. This is hands down the best educational resource for sustainability I've encountered. I regularly recommend it to my colleagues and graduate students.",
      highlight: "Scientifically accurate",
      location: "Berkeley, CA",
      verified: true,
    },
    {
      name: "James Wilson",
      role: "Manufacturing Director",
      company: "Wilson Manufacturing",
      image: "/placeholder-user.jpg",
      rating: 5,
      text: "Implementing energy efficiency measures from this platform reduced our operational costs by 28% and improved our sustainability rating. The ROI was incredible, and our employees take pride in working for a truly green company. Best investment we've made.",
      highlight: "28% cost reduction",
      location: "Detroit, MI",
      verified: true,
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-float-delayed blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-float-delayed blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-slow blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Trusted by 100K+ Sustainability Champions
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Community Says
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners, educators, and professionals who are making a real impact on sustainability
            through our comprehensive learning platform.
          </p>
        </div>

        {/* Main Testimonial Showcase */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden group hover:shadow-3xl transition-all duration-700 transform hover:scale-105 relative">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

            <CardContent className="p-8 lg:p-12 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Section */}
                <div className="flex-shrink-0 relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 animate-pulse-slow">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      <img
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Floating Quote Icon */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 animate-bounce-gentle shadow-lg">
                    <Quote className="h-6 w-6 text-white" />
                  </div>

                  {/* Verified Badge */}
                  {testimonials[currentIndex].verified && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-2 shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  {/* Star Rating */}
                  <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-current animate-pulse-slow"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic font-medium">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Profile Info */}
                  <div className="space-y-3">
                    <div className="font-bold text-2xl text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600 font-medium">{testimonials[currentIndex].role}</div>
                    <div className="text-blue-600 font-semibold">{testimonials[currentIndex].company}</div>
                    <div className="text-sm text-gray-500">{testimonials[currentIndex].location}</div>

                    {/* Highlight Badge */}
                    <div className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                      ✨ {testimonials[currentIndex].highlight}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="flex justify-center items-center space-x-6 mb-12">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="rounded-full p-4 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 border-2 border-blue-200 hover:border-blue-400 bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoPlay}
            className="rounded-full p-4 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 border-2 border-blue-200 hover:border-blue-400 bg-transparent"
          >
            {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="rounded-full p-4 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 border-2 border-blue-200 hover:border-blue-400 bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 cursor-pointer ${
                index === currentIndex
                  ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
                  : "bg-white/80 hover:bg-white/90"
              } backdrop-blur-sm animate-slide-in-up hover-lift`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => goToSlide(index)}
            >
              <CardContent className="p-6 space-y-4">
                {/* Mini Profile */}
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover bg-white p-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 flex items-center">
                      {testimonial.name}
                      {testimonial.verified && (
                        <svg className="w-4 h-4 text-green-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Truncated Text */}
                <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">"{testimonial.text}"</p>

                {/* Highlight */}
                <div className="text-xs text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full inline-block">
                  {testimonial.highlight}
                </div>

                {/* Location */}
                <div className="text-xs text-gray-500">{testimonial.location}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">100K+</div>
              <div className="text-sm text-gray-600">Happy Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
