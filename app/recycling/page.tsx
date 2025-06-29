"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Trash2, TrendingUp, Globe, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RecyclingPage() {
  const benefits = [
    "Reduces landfill waste and pollution",
    "Conserves natural resources and energy",
    "Creates jobs in recycling industries",
    "Reduces greenhouse gas emissions",
    "Saves money on waste disposal",
    "Protects wildlife and ecosystems",
  ]

  const stats = [
    { icon: Recycle, value: "32%", label: "Global recycling rate", unit: "%" },
    { icon: TrendingUp, value: "75%", label: "Energy saved by recycling aluminum", unit: "%" },
    { icon: Trash2, value: "2.01B", label: "Tons of municipal waste generated annually", unit: "tons" },
    { icon: Globe, value: "1.3B", label: "Tons of food wasted globally each year", unit: "tons" },
  ]

  const recyclingTypes = [
    {
      title: "Paper & Cardboard",
      description: "Newspapers, magazines, cardboard boxes, and office paper",
      tips: ["Remove staples and tape", "Keep dry and clean", "Separate by type"],
    },
    {
      title: "Plastics",
      description: "Bottles, containers, and packaging materials",
      tips: ["Check recycling numbers", "Rinse containers clean", "Remove caps and labels"],
    },
    {
      title: "Glass",
      description: "Bottles, jars, and containers",
      tips: ["Separate by color", "Remove lids and caps", "Rinse thoroughly"],
    },
    {
      title: "Metals",
      description: "Aluminum cans, steel cans, and metal containers",
      tips: ["Rinse food residue", "Remove labels if possible", "Crush to save space"],
    },
  ]

  const [showGuide, setShowGuide] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl mb-8">
              <Recycle className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Recycling &
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Waste Reduction
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform waste into valuable resources through recycling and sustainable waste management practices.
              Every action counts in creating a circular economy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Recycling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowGuide(true)}
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Recycling Guide
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
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-green-50"
              >
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 leading-relaxed">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recycling Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Types of Recycling</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Learn how to properly recycle different materials</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recyclingTypes.map((type, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-green-50"
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600">Tips:</h4>
                    <ul className="space-y-1">
                      {type.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Why Recycling Matters</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Recycling creates a positive impact on our environment and economy.
              </p>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <CheckCircle className="h-6 w-6 text-green-200 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Recycling Centers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold">1 Ton</div>
                  <div className="text-xl">Paper Recycled</div>
                  <div className="text-gray-200">
                    Saves 17 trees, 7,000 gallons of water, and 3.3 cubic yards of landfill space
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other topics */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More Topics</h2>
            <p className="text-gray-600">Continue your sustainability journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Solar Energy", href: "/solar-energy", color: "from-yellow-400 to-orange-500" },
              { title: "Wind Energy", href: "/wind-energy", color: "from-blue-400 to-cyan-500" },
              { title: "Energy Efficiency", href: "/energy-efficiency", color: "from-amber-400 to-yellow-500" },
            ].map((topic, index) => (
              <Link key={index} href={topic.href}>
                <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-full h-32 bg-gradient-to-r ${topic.color} rounded-lg mb-4 group-hover:scale-105 transition-transform`}
                    />
                    <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recycling Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Recycle className="h-6 w-6 text-green-600" />
                Complete Recycling Guide
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowGuide(false)} className="h-8 w-8 p-0">
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {recyclingTypes.map((type, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      {type.title}
                    </h3>
                    <p className="text-gray-600">{type.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-600">Best Practices:</h4>
                      <ul className="space-y-1">
                        {type.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: What Goes Where?</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600">✅ Always Recyclable</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Aluminum cans</li>
                      <li>• Glass bottles & jars</li>
                      <li>• Cardboard boxes</li>
                      <li>• Newspapers & magazines</li>
                      <li>• Plastic bottles (#1, #2)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-600">⚠️ Check Locally</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Plastic containers (#3-#7)</li>
                      <li>• Electronics</li>
                      <li>• Batteries</li>
                      <li>• Light bulbs</li>
                      <li>• Textiles</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-600">❌ Never Recycle</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Food waste</li>
                      <li>• Plastic bags</li>
                      <li>• Broken glass</li>
                      <li>• Ceramics</li>
                      <li>• Hazardous materials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Pro Tips for Better Recycling</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <ul className="space-y-2">
                    <li>• Rinse containers before recycling</li>
                    <li>• Remove caps and lids when required</li>
                    <li>• Don't bag recyclables unless specified</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Check local recycling guidelines</li>
                    <li>• When in doubt, throw it out</li>
                    <li>• Reduce and reuse before recycling</li>
                  </ul>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={() => setShowGuide(false)}
              >
                Find Local Recycling Centers
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
