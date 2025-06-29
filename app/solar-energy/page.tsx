"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Zap, TrendingUp, DollarSign, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SolarEnergyPage() {
  const benefits = [
    "Renewable and inexhaustible energy source",
    "Reduces electricity bills significantly",
    "Low maintenance costs",
    "Environmentally friendly with zero emissions",
    "Increases property value",
    "Energy independence",
  ]

  const stats = [
    { icon: Sun, value: "173,000", label: "Terawatts of solar energy hit Earth continuously", unit: "TW" },
    { icon: TrendingUp, value: "85%", label: "Cost reduction in solar panels since 2010", unit: "%" },
    { icon: Zap, value: "3.6%", label: "Of global electricity from solar power", unit: "%" },
    { icon: DollarSign, value: "$0.048", label: "Average cost per kWh for utility-scale solar", unit: "/kWh" },
  ]

  const [showCalculator, setShowCalculator] = useState(false)
  const [solarData, setSolarData] = useState({
    monthlyBill: "",
    roofSize: "",
    location: "",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl mb-8">
              <Sun className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Solar
              <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Energy
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Harness the unlimited power of the sun to create clean, renewable energy for a sustainable future. Solar
              technology is transforming how we power our world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Calculate Savings
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
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50"
              >
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How Solar Energy Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding the science behind converting sunlight into electricity
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Solar Panels Capture Sunlight",
                description:
                  "Photovoltaic cells in solar panels absorb photons from sunlight, creating an electric field across layers of silicon.",
              },
              {
                step: "02",
                title: "DC to AC Conversion",
                description:
                  "An inverter converts the direct current (DC) electricity generated by panels into alternating current (AC) for home use.",
              },
              {
                step: "03",
                title: "Power Your Home",
                description:
                  "Clean electricity flows through your electrical panel to power your home, with excess energy stored or sold back to the grid.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="text-6xl font-bold text-yellow-200 absolute top-4 right-4 opacity-50">
                    {step.step}
                  </div>
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
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Why Choose Solar Energy?</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Solar energy offers numerous advantages for homeowners, businesses, and the environment.
              </p>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <CheckCircle className="h-6 w-6 text-yellow-200 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Solar Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold">25+</div>
                  <div className="text-xl">Years Warranty</div>
                  <div className="text-gray-200">
                    Most solar panels come with 25+ year warranties and can last 30+ years
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
              { title: "Wind Energy", href: "/wind-energy", color: "from-blue-400 to-cyan-500" },
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

      {/* Solar Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Solar Savings Calculator</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowCalculator(false)} className="h-8 w-8 p-0">
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthly-bill">Monthly Electric Bill ($)</Label>
                  <Input
                    id="monthly-bill"
                    type="number"
                    placeholder="150"
                    value={solarData.monthlyBill}
                    onChange={(e) => setSolarData({ ...solarData, monthlyBill: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="roof-size">Available Roof Space (sq ft)</Label>
                  <Input
                    id="roof-size"
                    type="number"
                    placeholder="800"
                    value={solarData.roofSize}
                    onChange={(e) => setSolarData({ ...solarData, roofSize: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Select
                    value={solarData.location}
                    onValueChange={(value) => setSolarData({ ...solarData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="florida">Florida</SelectItem>
                      <SelectItem value="arizona">Arizona</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {solarData.monthlyBill && solarData.roofSize && (
                <div className="bg-yellow-50 p-6 rounded-lg space-y-4">
                  <h3 className="text-xl font-bold text-center">Your Solar Estimate</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {Math.round(
                          Math.min(Number(solarData.roofSize) / 100, Number(solarData.monthlyBill) / 10) * 10,
                        ) / 10}{" "}
                        kW
                      </div>
                      <div className="text-sm text-gray-600">System Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        $
                        {Math.round(
                          Math.min(Number(solarData.roofSize) / 100, Number(solarData.monthlyBill) / 10) * 1200,
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Annual Savings</div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                onClick={() => setShowCalculator(false)}
              >
                Get Detailed Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
