"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind, Zap, TrendingUp, Globe, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function WindEnergyPage() {
  const benefits = [
    "Clean and renewable energy source",
    "No greenhouse gas emissions during operation",
    "Cost-effective electricity generation",
    "Creates jobs in manufacturing and maintenance",
    "Reduces dependence on fossil fuels",
    "Can coexist with agriculture (wind farms)",
  ]

  const stats = [
    { icon: Wind, value: "899", label: "Gigawatts of global wind capacity", unit: "GW" },
    { icon: TrendingUp, value: "10%", label: "Annual growth rate of wind energy", unit: "%" },
    { icon: Zap, value: "7%", label: "Of global electricity from wind power", unit: "%" },
    { icon: Globe, value: "100+", label: "Countries using wind energy", unit: "" },
  ]

  const [showWindMap, setShowWindMap] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-2xl mb-8">
              <Wind className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Wind
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Energy
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Harness the power of wind to generate clean, renewable electricity. Wind energy is one of the
              fastest-growing sources of power worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowWindMap(true)}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Wind Map
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
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50"
              >
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
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

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How Wind Turbines Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Converting kinetic energy from wind into electrical power
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Wind Captures Blades",
                description:
                  "Aerodynamically designed blades capture wind energy and begin rotating, typically at 20-40 RPM.",
              },
              {
                step: "02",
                title: "Gearbox Increases Speed",
                description:
                  "A gearbox increases the rotation speed from about 30-60 RPM to approximately 1,000-1,800 RPM for the generator.",
              },
              {
                step: "03",
                title: "Generator Produces Electricity",
                description:
                  "The high-speed rotation drives a generator that converts mechanical energy into electrical energy for the power grid.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="text-6xl font-bold text-blue-200 absolute top-4 right-4 opacity-50">{step.step}</div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Benefits of Wind Energy</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Wind energy provides numerous environmental and economic advantages.
              </p>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <CheckCircle className="h-6 w-6 text-blue-200 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Wind Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold">2.5MW</div>
                  <div className="text-xl">Average Turbine Capacity</div>
                  <div className="text-gray-200">Modern wind turbines can power 1,400+ homes annually</div>
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
              { title: "Recycling", href: "/recycling", color: "from-green-400 to-emerald-500" },
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

      {/* Wind Map Modal */}
      {showWindMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Wind className="h-6 w-6 text-blue-600" />
                Global Wind Speed Map
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowWindMap(false)} className="h-8 w-8 p-0">
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
                <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simulated Wind Map */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-20 right-20 w-6 h-6 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-20 left-1/4 w-10 h-10 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-32 right-1/3 w-7 h-7 bg-cyan-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-blue-600 rounded-full animate-pulse"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>

                  <div className="text-center space-y-4 z-10">
                    <Wind className="h-16 w-16 text-blue-600 mx-auto animate-spin-slow" />
                    <h3 className="text-2xl font-bold text-gray-800">Interactive Wind Speed Data</h3>
                    <p className="text-gray-600 max-w-md">
                      Real-time wind speed measurements from weather stations worldwide. Blue dots represent wind
                      monitoring stations with current speed data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">15.2 mph</div>
                  <div className="text-sm text-gray-600">Average Wind Speed</div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-cyan-600">2,847</div>
                  <div className="text-sm text-gray-600">Active Stations</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <div className="text-sm text-gray-600">Optimal Locations</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Wind Speed Legend:</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
                    <span>Low (0-10 mph)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Moderate (10-20 mph)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                    <span>High (20+ mph)</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                onClick={() => setShowWindMap(false)}
              >
                Find Wind Projects Near Me
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
