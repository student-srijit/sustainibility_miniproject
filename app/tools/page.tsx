"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator, Zap, Car, Home, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

export default function ToolsPage() {
  const [carbonData, setCarbonData] = useState({
    electricity: [200],
    gas: [50],
    car: [1000],
    flights: [2],
  })

  const [solarData, setSolarData] = useState({
    monthlyBill: "",
    roofSize: "",
    location: "",
  })

  const [energyData, setEnergyData] = useState({
    homeSize: [2000],
    occupants: [4],
    efficiency: ["medium"],
  })

  const [showTips, setShowTips] = useState(false)
  const [tipsLoading, setTipsLoading] = useState(false)
  const [tipsError, setTipsError] = useState("")
  const [reductionTips, setReductionTips] = useState("")

  const calculateCarbonFootprint = () => {
    const electricity = carbonData.electricity[0] * 0.92 // kg CO2 per kWh
    const gas = carbonData.gas[0] * 5.3 // kg CO2 per therm
    const transport = carbonData.car[0] * 0.404 // kg CO2 per mile
    const flights = carbonData.flights[0] * 1100 // kg CO2 per flight

    return Math.round(electricity + gas + transport + flights)
  }

  const calculateSolarSavings = () => {
    const bill = Number.parseInt(solarData.monthlyBill) || 0
    const size = Number.parseInt(solarData.roofSize) || 0
    const systemSize = Math.min(size / 100, bill / 10) // Rough estimate
    const annualSavings = systemSize * 1200 // $1200 per kW annually
    const systemCost = systemSize * 3000 // $3 per watt

    return {
      systemSize: Math.round(systemSize * 10) / 10,
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      paybackPeriod: Math.round((systemCost / annualSavings) * 10) / 10,
    }
  }

  const calculateEnergyEfficiency = () => {
    const baseUsage = energyData.homeSize[0] * 12 // kWh per year
    const occupantMultiplier = 1 + (energyData.occupants[0] - 2) * 0.1
    const efficiencyMultiplier =
      energyData.efficiency[0] === "high" ? 0.7 : energyData.efficiency[0] === "medium" ? 0.85 : 1.0

    const currentUsage = Math.round(baseUsage * occupantMultiplier)
    const efficientUsage = Math.round(currentUsage * efficiencyMultiplier)
    const savings = currentUsage - efficientUsage
    const costSavings = Math.round(savings * 0.12) // $0.12 per kWh

    return {
      currentUsage,
      efficientUsage,
      energySavings: savings,
      costSavings,
    }
  }

  const handleGetReductionTips = async () => {
    setTipsLoading(true)
    setTipsError("")
    setReductionTips("")
    try {
      const emission = calculateCarbonFootprint()
      const res = await fetch("/api/gemini-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emission }),
      })
      const data = await res.json()
      if (data.tips) {
        setReductionTips(data.tips)
      } else {
        setTipsError(data.error || "No tips found.")
      }
    } catch (err) {
      setTipsError("Failed to fetch tips. Please try again.")
    } finally {
      setTipsLoading(false)
    }
  }

  const tools = [
    {
      icon: Calculator,
      title: "Carbon Footprint Calculator",
      description: "Calculate your personal carbon emissions",
      color: "from-red-400 to-orange-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Zap,
      title: "Solar Savings Calculator",
      description: "Estimate solar panel savings for your home",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Home,
      title: "Energy Efficiency Analyzer",
      description: "Optimize your home's energy consumption",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl mb-8 animate-bounce-slow">
              <Calculator className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Sustainability
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Interactive calculators and tools to help you measure, plan, and optimize your environmental impact. Make
              data-driven decisions for a sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 ${tool.bgColor} overflow-hidden animate-slide-in-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${tool.color} rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                  >
                    <tool.icon className="h-10 w-10 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Footprint Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Calculator className="h-8 w-8 text-red-500" />
                Carbon Footprint Calculator
              </CardTitle>
              <p className="text-gray-600 mt-2">Calculate your annual carbon emissions</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Monthly Electricity (kWh): {carbonData.electricity[0]}
                    </Label>
                    <Slider
                      value={carbonData.electricity}
                      onValueChange={(value) => setCarbonData({ ...carbonData, electricity: value })}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      Monthly Gas (therms): {carbonData.gas[0]}
                    </Label>
                    <Slider
                      value={carbonData.gas}
                      onValueChange={(value) => setCarbonData({ ...carbonData, gas: value })}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Car className="h-5 w-5 text-green-500" />
                      Annual Driving (miles): {carbonData.car[0]}
                    </Label>
                    <Slider
                      value={carbonData.car}
                      onValueChange={(value) => setCarbonData({ ...carbonData, car: value })}
                      max={20000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Annual Flights: {carbonData.flights[0]}</Label>
                    <Slider
                      value={carbonData.flights}
                      onValueChange={(value) => setCarbonData({ ...carbonData, flights: value })}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 text-center space-y-6">
                  <div className="text-6xl font-bold text-red-600 animate-pulse">{calculateCarbonFootprint()}</div>
                  <div className="text-xl font-semibold text-gray-700">kg CO₂ per year</div>
                  <div className="text-sm text-gray-600">Average US household: 16,000 kg CO₂/year</div>
                  <Dialog open={showTips} onOpenChange={setShowTips}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300"
                        onClick={handleGetReductionTips}
                      >
                        Get Reduction Tips
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                      <DialogHeader className="flex-shrink-0">
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Personalized Carbon Reduction Tips
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 mt-2">
                          Based on your annual carbon emissions of {calculateCarbonFootprint()} kg CO₂, here are some tips to help you reduce your footprint:
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto py-4">
                        {tipsLoading ? (
                          <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                            <span className="ml-3 text-gray-600">Loading personalized tips...</span>
                          </div>
                        ) : tipsError ? (
                          <div className="text-center py-8">
                            <div className="text-red-600 font-semibold mb-2">Error Loading Tips</div>
                            <div className="text-gray-600 text-sm">{tipsError}</div>
                          </div>
                        ) : reductionTips ? (
                          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                            <div className="whitespace-pre-line text-left leading-relaxed text-gray-800">
                              {reductionTips}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      
                      <div className="flex-shrink-0 pt-4 border-t border-gray-200">
                        <DialogClose asChild>
                          <Button 
                            variant="outline" 
                            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300"
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solar Calculator */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-orange-400/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Zap className="h-8 w-8 text-yellow-500" />
                Solar Savings Calculator
              </CardTitle>
              <p className="text-gray-600 mt-2">Estimate your solar panel investment returns</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthly-bill" className="text-lg font-semibold">
                      Monthly Electric Bill ($)
                    </Label>
                    <Input
                      id="monthly-bill"
                      type="number"
                      placeholder="150"
                      value={solarData.monthlyBill}
                      onChange={(e) => setSolarData({ ...solarData, monthlyBill: e.target.value })}
                      className="text-lg p-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roof-size" className="text-lg font-semibold">
                      Available Roof Space (sq ft)
                    </Label>
                    <Input
                      id="roof-size"
                      type="number"
                      placeholder="800"
                      value={solarData.roofSize}
                      onChange={(e) => setSolarData({ ...solarData, roofSize: e.target.value })}
                      className="text-lg p-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Location</Label>
                    <Select
                      value={solarData.location}
                      onValueChange={(value) => setSolarData({ ...solarData, location: value })}
                    >
                      <SelectTrigger className="text-lg p-4">
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
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">Solar Estimate</h3>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-yellow-600">
                          {calculateSolarSavings().systemSize} kW
                        </div>
                        <div className="text-sm text-gray-600">System Size</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">
                          ${calculateSolarSavings().annualSavings}
                        </div>
                        <div className="text-sm text-gray-600">Annual Savings</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">
                          ${calculateSolarSavings().systemCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">System Cost</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-600">
                          {calculateSolarSavings().paybackPeriod} yrs
                        </div>
                        <div className="text-sm text-gray-600">Payback Period</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-full py-3 transform hover:scale-105 transition-all duration-300">
                      Get Solar Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Energy Efficiency Analyzer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Home className="h-8 w-8 text-green-500" />
                Energy Efficiency Analyzer
              </CardTitle>
              <p className="text-gray-600 mt-2">Optimize your home's energy consumption</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Home Size (sq ft): {energyData.homeSize[0]}</Label>
                    <Slider
                      value={energyData.homeSize}
                      onValueChange={(value) => setEnergyData({ ...energyData, homeSize: value })}
                      min={500}
                      max={5000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Number of Occupants: {energyData.occupants[0]}</Label>
                    <Slider
                      value={energyData.occupants}
                      onValueChange={(value) => setEnergyData({ ...energyData, occupants: value })}
                      min={1}
                      max={8}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Current Efficiency Level</Label>
                    <Select
                      value={energyData.efficiency[0]}
                      onValueChange={(value) => setEnergyData({ ...energyData, efficiency: [value] })}
                    >
                      <SelectTrigger className="text-lg p-4">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Older home, no upgrades)</SelectItem>
                        <SelectItem value="medium">Medium (Some efficiency measures)</SelectItem>
                        <SelectItem value="high">High (Energy efficient home)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Efficiency Analysis</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-semibold">Current Usage:</span>
                      <span className="text-xl font-bold text-red-600">
                        {calculateEnergyEfficiency().currentUsage} kWh/year
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-semibold">Optimized Usage:</span>
                      <span className="text-xl font-bold text-green-600">
                        {calculateEnergyEfficiency().efficientUsage} kWh/year
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-semibold">Energy Savings:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {calculateEnergyEfficiency().energySavings} kWh/year
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-semibold">Cost Savings:</span>
                      <span className="text-xl font-bold text-purple-600">
                        ${calculateEnergyEfficiency().costSavings}/year
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full py-3 transform hover:scale-105 transition-all duration-300">
                    Get Efficiency Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
