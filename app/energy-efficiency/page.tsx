"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Zap, TrendingDown, Home, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function EnergyEfficiencyPage() {
  const benefits = [
    "Reduces energy bills significantly",
    "Decreases carbon footprint",
    "Improves indoor comfort and air quality",
    "Increases property value",
    "Reduces strain on power grid",
    "Creates green jobs and economic growth",
  ]

  const stats = [
    { icon: Lightbulb, value: "30%", label: "Average energy savings with efficiency upgrades", unit: "%" },
    { icon: TrendingDown, value: "40%", label: "Reduction in energy use since 1970s per GDP", unit: "%" },
    { icon: Zap, value: "$2T", label: "Global energy efficiency market value", unit: "" },
    { icon: Home, value: "50%", label: "Of energy used by buildings globally", unit: "%" },
  ]

  const [showAudit, setShowAudit] = useState(false)
  const [auditData, setAuditData] = useState({
    homeType: "",
    yearBuilt: "",
    heatingType: "",
    coolingType: "",
    insulation: "",
    windows: "",
    appliances: "",
  })

  const efficiencyTips = [
    {
      category: "Lighting",
      tips: [
        "Switch to LED bulbs (75% less energy)",
        "Use natural light when possible",
        "Install motion sensors and timers",
        "Choose ENERGY STAR certified fixtures",
      ],
    },
    {
      category: "Heating & Cooling",
      tips: [
        "Set thermostat to 68°F in winter, 78°F in summer",
        "Use programmable or smart thermostats",
        "Seal air leaks around windows and doors",
        "Regular HVAC maintenance and filter changes",
      ],
    },
    {
      category: "Appliances",
      tips: [
        "Choose ENERGY STAR certified appliances",
        "Unplug electronics when not in use",
        "Use cold water for washing clothes",
        "Air dry clothes instead of using dryer",
      ],
    },
    {
      category: "Insulation",
      tips: [
        "Add insulation to attics and basements",
        "Install weather stripping on doors",
        "Use thermal curtains or blinds",
        "Seal gaps around pipes and ducts",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-2xl mb-8">
              <Lightbulb className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Energy
              <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Efficiency
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Optimize energy consumption to reduce costs, environmental impact, and create a more sustainable future.
              Small changes can make a big difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Saving
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAudit(true)}
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Energy Audit
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
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50"
              >
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full">
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

      {/* Efficiency Tips Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Energy Efficiency Tips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practical ways to reduce energy consumption in your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {efficiencyTips.map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50"
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  <div className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Benefits of Energy Efficiency</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Energy efficiency improvements provide multiple benefits for individuals and society.
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
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Schedule Energy Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold">$500+</div>
                  <div className="text-xl">Annual Savings</div>
                  <div className="text-gray-200">Average household savings from energy efficiency improvements</div>
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
              { title: "Recycling", href: "/recycling", color: "from-green-400 to-emerald-500" },
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

      {/* Energy Audit Modal */}
      {showAudit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Home className="h-6 w-6 text-amber-600" />
                Home Energy Audit
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAudit(false)} className="h-8 w-8 p-0">
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Home Type</Label>
                    <Select
                      value={auditData.homeType}
                      onValueChange={(value) => setAuditData({ ...auditData, homeType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select home type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-family">Single Family House</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Year Built</Label>
                    <Select
                      value={auditData.yearBuilt}
                      onValueChange={(value) => setAuditData({ ...auditData, yearBuilt: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before-1980">Before 1980</SelectItem>
                        <SelectItem value="1980-2000">1980-2000</SelectItem>
                        <SelectItem value="2000-2010">2000-2010</SelectItem>
                        <SelectItem value="after-2010">After 2010</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Heating System</Label>
                    <Select
                      value={auditData.heatingType}
                      onValueChange={(value) => setAuditData({ ...auditData, heatingType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select heating type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gas-furnace">Gas Furnace</SelectItem>
                        <SelectItem value="electric-heat">Electric Heat</SelectItem>
                        <SelectItem value="heat-pump">Heat Pump</SelectItem>
                        <SelectItem value="oil-heat">Oil Heat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Cooling System</Label>
                    <Select
                      value={auditData.coolingType}
                      onValueChange={(value) => setAuditData({ ...auditData, coolingType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cooling type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central-ac">Central Air Conditioning</SelectItem>
                        <SelectItem value="window-ac">Window Units</SelectItem>
                        <SelectItem value="heat-pump">Heat Pump</SelectItem>
                        <SelectItem value="none">No Cooling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Insulation Quality</Label>
                    <Select
                      value={auditData.insulation}
                      onValueChange={(value) => setAuditData({ ...auditData, insulation: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your insulation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Poor (Drafty, old)</SelectItem>
                        <SelectItem value="fair">Fair (Some insulation)</SelectItem>
                        <SelectItem value="good">Good (Well insulated)</SelectItem>
                        <SelectItem value="excellent">Excellent (Recently upgraded)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Window Type</Label>
                    <Select
                      value={auditData.windows}
                      onValueChange={(value) => setAuditData({ ...auditData, windows: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select window type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-pane">Single Pane</SelectItem>
                        <SelectItem value="double-pane">Double Pane</SelectItem>
                        <SelectItem value="triple-pane">Triple Pane</SelectItem>
                        <SelectItem value="energy-efficient">Energy Efficient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Appliance Age</Label>
                    <Select
                      value={auditData.appliances}
                      onValueChange={(value) => setAuditData({ ...auditData, appliances: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Average appliance age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="old">Over 15 years</SelectItem>
                        <SelectItem value="medium">5-15 years</SelectItem>
                        <SelectItem value="new">Under 5 years</SelectItem>
                        <SelectItem value="energy-star">Energy Star certified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {Object.values(auditData).filter(Boolean).length >= 4 && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 text-center">Your Energy Efficiency Score</h3>

                  <div className="text-center">
                    <div className="text-6xl font-bold text-amber-600 mb-2">
                      {Math.round(
                        (Object.values(auditData).filter(Boolean).length / 7) *
                          100 *
                          (auditData.yearBuilt === "after-2010"
                            ? 1.2
                            : auditData.yearBuilt === "before-1980"
                              ? 0.7
                              : 1.0),
                      )}
                      %
                    </div>
                    <div className="text-lg text-gray-600">Efficiency Rating</div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$1,200</div>
                      <div className="text-sm text-gray-600">Potential Annual Savings</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">25%</div>
                      <div className="text-sm text-gray-600">Energy Reduction Potential</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">3.2 tons</div>
                      <div className="text-sm text-gray-600">CO₂ Reduction/Year</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Improvements:</h4>
                    <div className="space-y-2 text-sm">
                      {auditData.insulation === "poor" && (
                        <div className="flex items-center gap-2 text-amber-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Upgrade insulation (Priority: High)</span>
                        </div>
                      )}
                      {auditData.windows === "single-pane" && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Install energy-efficient windows (Priority: Medium)</span>
                        </div>
                      )}
                      {auditData.appliances === "old" && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Replace old appliances with Energy Star models (Priority: Medium)</span>
                        </div>
                      )}
                      {auditData.heatingType === "oil-heat" && (
                        <div className="flex items-center gap-2 text-purple-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Consider heat pump upgrade (Priority: High)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                onClick={() => setShowAudit(false)}
              >
                Get Professional Energy Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
