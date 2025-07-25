"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, BarChart3, TrendingUp, Home, DollarSign, BookOpen, Lightbulb, Brain } from "lucide-react"

// Simple Boston Housing Dataset with clear explanations
const bostonHousingData = [
  {
    id: 1,
    crim: 0.00632, // Crime rate - lower is better for house prices
    rm: 6.575, // Average number of rooms - more rooms = higher price
    age: 65.2, // How old the buildings are (%) - newer is better
    lstat: 4.98, // Percentage of poor people in area - lower is better
    medv: 24.0, // ACTUAL house price in thousands of dollars
    explanation: "Low crime area with 6.6 rooms, moderately old buildings, wealthy neighborhood",
  },
  {
    id: 2,
    crim: 0.02731,
    rm: 6.421,
    age: 78.9,
    lstat: 9.14,
    medv: 21.6,
    explanation: "Low crime area with 6.4 rooms, older buildings, upper-middle class area",
  },
  {
    id: 3,
    crim: 0.02729,
    rm: 7.185,
    age: 61.1,
    lstat: 4.03,
    medv: 34.7,
    explanation: "Low crime area with 7.2 rooms (big house!), newer buildings, very wealthy area",
  },
  {
    id: 4,
    crim: 0.21124,
    rm: 5.631,
    age: 100.0,
    lstat: 29.93,
    medv: 16.5,
    explanation: "Higher crime area with only 5.6 rooms, very old buildings, poor neighborhood",
  },
]

// Animated Linear Regression Visualization
const AnimatedLinearRegression = () => {
  const [slope, setSlope] = useState([1.5])
  const [intercept, setIntercept] = useState([0])
  const [animationStep, setAnimationStep] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  // Start animation
  useEffect(() => {
    if (showAnimation) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 100)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [showAnimation])

  const predictedY = (x: number) => slope[0] * x + intercept[0]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Home className="w-5 h-5 mr-2" />🏠 Interactive House Price Predictor
          </CardTitle>
          <CardDescription className="text-gray-300">
            <strong>What you'll learn:</strong> How to predict house prices using a straight line through data points!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simple Explanation Box */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-semibold">💡 What is Linear Regression?</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Imagine you're trying to draw the <strong>best straight line</strong> through a bunch of dots on a graph.
              Each dot represents a house with its features (like number of rooms) and its price. The line helps us{" "}
              <strong>predict</strong> the price of new houses we haven't seen before!
            </p>
          </div>

          {/* Interactive Controls with Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <label className="text-sm text-gray-300 font-semibold">
                  Slope (How steep the line is): {slope[0].toFixed(2)}
                </label>
              </div>
              <Slider value={slope} onValueChange={setSlope} max={3} min={-1} step={0.1} />
              <p className="text-xs text-gray-400">
                📈 <strong>Higher slope</strong> = More rooms means MUCH higher price
                <br />📉 <strong>Lower slope</strong> = More rooms means only slightly higher price
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <label className="text-sm text-gray-300 font-semibold">
                  Starting Price (Base price): ${(intercept[0] * 1000).toLocaleString()}
                </label>
              </div>
              <Slider value={intercept} onValueChange={setIntercept} max={20} min={-10} step={0.5} />
              <p className="text-xs text-gray-400">
                🏠 <strong>This is the price</strong> of a house with 0 rooms (theoretical baseline)
              </p>
            </div>
          </div>

          {/* Animated Visualization */}
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold">📊 Live Prediction Visualization</h4>
              <Button
                onClick={() => setShowAnimation(!showAnimation)}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {showAnimation ? "⏸️ Pause" : "▶️ Animate"}
              </Button>
            </div>

            <svg viewBox="0 0 500 350" className="w-full h-80">
              {/* Animated Grid Background */}
              <defs>
                <pattern id="animated-grid" width="50" height="35" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 35"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    opacity={showAnimation ? Math.sin(animationStep * 0.1) * 0.3 + 0.7 : 0.5}
                  />
                </pattern>
              </defs>
              <rect width="500" height="350" fill="url(#animated-grid)" />

              {/* Axes with Labels */}
              <line x1="50" y1="300" x2="450" y2="300" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
              <line x1="50" y1="300" x2="50" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />

              {/* Axis Labels */}
              <text x="250" y="330" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                🏠 Number of Rooms
              </text>
              <text
                x="25"
                y="175"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                transform="rotate(-90 25 175)"
              >
                💰 House Price ($1000s)
              </text>

              {/* Data Points with Animation */}
              {bostonHousingData.map((house, index) => {
                const x = 50 + (house.rm - 3) * 80
                const y = 300 - house.medv * 8
                const animatedRadius = showAnimation ? 6 + Math.sin((animationStep + index * 20) * 0.2) * 2 : 6

                return (
                  <g key={index}>
                    {/* Pulsing circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={animatedRadius}
                      fill="#3b82f6"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    {/* House emoji */}
                    <text x={x} y={y + 2} textAnchor="middle" fontSize="10">
                      🏠
                    </text>

                    {/* Tooltip on hover */}
                    <title>
                      🏠 {house.rm.toFixed(1)} rooms → ${house.medv}k{house.explanation}
                    </title>
                  </g>
                )
              })}

              {/* Animated Regression Line */}
              <line
                x1="50"
                y1={300 - predictedY(3) * 8}
                x2="450"
                y2={300 - predictedY(8) * 8}
                stroke="#ef4444"
                strokeWidth="4"
                opacity="0.9"
                strokeDasharray={showAnimation ? `${animationStep % 20} 5` : "none"}
              />

              {/* Prediction Example */}
              <g>
                <circle cx="250" cy={300 - predictedY(5.5) * 8} r="8" fill="#10b981" stroke="white" strokeWidth="2" />
                <text x="250" y={300 - predictedY(5.5) * 8 + 3} textAnchor="middle" fontSize="12">
                  🎯
                </text>
                <text
                  x="250"
                  y={300 - predictedY(5.5) * 8 - 15}
                  textAnchor="middle"
                  fill="#10b981"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Prediction: ${predictedY(5.5).toFixed(1)}k
                </text>
              </g>

              {/* Room markers */}
              {[3, 4, 5, 6, 7, 8].map((rooms) => (
                <text key={rooms} x={50 + (rooms - 3) * 80} y={320} textAnchor="middle" fill="white" fontSize="12">
                  {rooms}
                </text>
              ))}
            </svg>
          </div>

          {/* Mathematical Formula Explanation */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <h4 className="text-white font-semibold">🧮 The Magic Formula (Don't worry, it's simple!)</h4>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/30">
                <p className="text-center text-xl font-mono text-purple-400 mb-2">
                  House Price = {slope[0].toFixed(2)} × (Number of Rooms) + {intercept[0].toFixed(2)}
                </p>
                <p className="text-center text-sm text-gray-300">
                  This is like saying: "Start with ${(intercept[0] * 1000).toLocaleString()}, then add $
                  {(slope[0] * 1000).toLocaleString()} for each room"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                  <h5 className="text-blue-400 font-semibold mb-2">🎯 Example Calculation:</h5>
                  <p className="text-gray-300 text-sm">
                    For a house with <strong>6 rooms</strong>:<br />
                    Price = {slope[0].toFixed(2)} × 6 + {intercept[0].toFixed(2)}
                    <br />
                    Price = {(slope[0] * 6).toFixed(2)} + {intercept[0].toFixed(2)}
                    <br />
                    Price = <strong>${(slope[0] * 6 + intercept[0]).toFixed(2)}k</strong>
                  </p>
                </div>

                <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                  <h5 className="text-green-400 font-semibold mb-2">🤔 Why This Works:</h5>
                  <p className="text-gray-300 text-sm">
                    We're finding the <strong>pattern</strong> in the data! If bigger houses usually cost more, our line
                    captures that relationship and helps us predict prices for new houses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Prediction Tool */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
            <h4 className="text-white font-semibold mb-4">🎮 Try It Yourself!</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[4, 5.5, 7].map((rooms) => (
                <div key={rooms} className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-white font-semibold">{rooms} Rooms</div>
                  <div className="text-green-400 text-xl font-bold">${predictedY(rooms).toFixed(1)}k</div>
                  <div className="text-xs text-gray-300 mt-1">
                    = {slope[0].toFixed(2)} × {rooms} + {intercept[0].toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dataset Explanation Component
const DatasetExplanation = () => {
  const [selectedHouse, setSelectedHouse] = useState(0)

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />📚 Understanding Our Dataset (Boston Housing Data)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Let's explore what each piece of information tells us about houses and their prices!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* What is a Dataset? */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">🤔 What is a Dataset?</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Think of a dataset like a <strong>giant spreadsheet</strong> with information about many houses. Each{" "}
              <strong>row</strong> is one house, and each <strong>column</strong> tells us something different about
              that house (like how many rooms it has, or how much it costs). We use this information to find patterns!
            </p>
          </div>

          {/* Column Explanations */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">📊 What Each Column Means (In Simple Terms):</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h5 className="text-red-400 font-semibold">🚨 CRIM (Crime Rate)</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>What it is:</strong> How much crime happens in the neighborhood
                  <br />
                  <strong>Scale:</strong> 0 = Very safe, Higher numbers = More dangerous
                  <br />
                  <strong>Why it matters:</strong> People pay less for houses in dangerous areas!
                </p>
              </div>

              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h5 className="text-blue-400 font-semibold">🏠 RM (Average Rooms)</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>What it is:</strong> Average number of rooms per house in the area
                  <br />
                  <strong>Scale:</strong> Usually 3-10 rooms
                  <br />
                  <strong>Why it matters:</strong> More rooms = bigger house = higher price!
                </p>
              </div>

              <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h5 className="text-orange-400 font-semibold">🏚️ AGE (Building Age)</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>What it is:</strong> Percentage of buildings built before 1940
                  <br />
                  <strong>Scale:</strong> 0% = All new buildings, 100% = All old buildings
                  <br />
                  <strong>Why it matters:</strong> Newer buildings usually cost more!
                </p>
              </div>

              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h5 className="text-green-400 font-semibold">💰 LSTAT (Lower Status %)</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>What it is:</strong> Percentage of people with lower income in the area
                  <br />
                  <strong>Scale:</strong> 0% = Very wealthy area, Higher % = More poor people
                  <br />
                  <strong>Why it matters:</strong> Wealthy areas have more expensive houses!
                </p>
              </div>

              <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30 md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h5 className="text-purple-400 font-semibold">
                    🎯 MEDV (Median House Value) - THIS IS WHAT WE WANT TO PREDICT!
                  </h5>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>What it is:</strong> The actual price of houses in thousands of dollars
                  <br />
                  <strong>Scale:</strong> Usually $10k - $50k (remember, this data is from the 1970s!)
                  <br />
                  <strong>Why it's special:</strong> This is our "answer" - we use the other columns to predict this!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive House Explorer */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">🔍 Explore Real Houses from Our Dataset</h4>

            <div className="flex flex-wrap gap-2 mb-4">
              {bostonHousingData.map((house, index) => (
                <Button
                  key={index}
                  variant={selectedHouse === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedHouse(index)}
                  className="text-xs"
                >
                  House #{house.id}
                </Button>
              ))}
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-white font-semibold text-lg">
                    🏠 House #{bostonHousingData[selectedHouse].id} Details:
                  </h5>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-500/20 rounded-lg">
                      <span className="text-gray-300">🚨 Crime Rate:</span>
                      <span className="text-white font-bold">{bostonHousingData[selectedHouse].crim.toFixed(3)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                      <span className="text-gray-300">🏠 Average Rooms:</span>
                      <span className="text-white font-bold">{bostonHousingData[selectedHouse].rm.toFixed(1)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-orange-500/20 rounded-lg">
                      <span className="text-gray-300">🏚️ Building Age:</span>
                      <span className="text-white font-bold">{bostonHousingData[selectedHouse].age.toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-lg">
                      <span className="text-gray-300">💰 Lower Status %:</span>
                      <span className="text-white font-bold">{bostonHousingData[selectedHouse].lstat.toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-500/20 rounded-lg border-2 border-purple-500/50">
                      <span className="text-gray-300">
                        🎯 <strong>ACTUAL PRICE:</strong>
                      </span>
                      <span className="text-purple-400 font-bold text-xl">
                        ${bostonHousingData[selectedHouse].medv}k
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-white font-semibold text-lg">🤔 What This Tells Us:</h5>
                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-gray-300 leading-relaxed">{bostonHousingData[selectedHouse].explanation}</p>
                  </div>

                  <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                    <h6 className="text-yellow-400 font-semibold mb-2">💡 Pattern Recognition:</h6>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>
                        •{" "}
                        {bostonHousingData[selectedHouse].rm > 6.5
                          ? "✅ Many rooms = Higher price"
                          : "❌ Few rooms = Lower price"}
                      </li>
                      <li>
                        •{" "}
                        {bostonHousingData[selectedHouse].crim < 0.1
                          ? "✅ Low crime = Higher price"
                          : "❌ High crime = Lower price"}
                      </li>
                      <li>
                        •{" "}
                        {bostonHousingData[selectedHouse].lstat < 10
                          ? "✅ Wealthy area = Higher price"
                          : "❌ Poor area = Lower price"}
                      </li>
                      <li>
                        •{" "}
                        {bostonHousingData[selectedHouse].age < 70
                          ? "✅ Newer buildings = Higher price"
                          : "❌ Old buildings = Lower price"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Data Matters */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
            <h4 className="text-white font-semibold mb-4">🎯 Why Understanding Data is Super Important</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-green-400 font-semibold mb-2">🔍 For Data Scientists:</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• You need to understand what each number means</li>
                  <li>• Bad data = Bad predictions</li>
                  <li>• Always ask "Does this make sense?"</li>
                  <li>• Look for patterns and relationships</li>
                </ul>
              </div>
              <div>
                <h5 className="text-blue-400 font-semibold mb-2">🏠 For Real Estate:</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Location matters more than size sometimes</li>
                  <li>• Safety affects house prices a lot</li>
                  <li>• Neighborhood wealth influences prices</li>
                  <li>• Age of buildings impacts value</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mathematical Derivation Component
const MathematicalDerivation = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const derivationSteps = [
    {
      title: "🤔 The Problem: How do we find the best line?",
      content:
        "We have points on a graph, and we want to draw the BEST straight line through them. But what makes a line 'best'?",
      formula: "We need to find: y = mx + b",
      explanation: "Where 'm' is slope (steepness) and 'b' is where the line crosses the y-axis",
    },
    {
      title: "📏 Step 1: Measure the Errors",
      content:
        "For each house, we compare our prediction with the real price. The difference is called an 'error' or 'residual'.",
      formula: "Error = Real Price - Predicted Price",
      explanation: "If we predict $25k but the real price is $30k, our error is $5k",
    },
    {
      title: "🎯 Step 2: We Want Small Errors",
      content:
        "We want our predictions to be as close as possible to the real prices. So we want to minimize ALL the errors.",
      formula: "Total Error = Sum of all (Real Price - Predicted Price)²",
      explanation: "We square the errors so negative and positive errors don't cancel out",
    },
    {
      title: "🧮 Step 3: The Magic Formula (Calculus!)",
      content:
        "Using calculus (don't worry about the details), we can find the slope and intercept that give us the smallest total error.",
      formula: "Slope = Σ(x-x̄)(y-ȳ) / Σ(x-x̄)²",
      explanation: "This formula finds the slope that minimizes our squared errors",
    },
    {
      title: "✅ Step 4: Why This Works",
      content:
        "This method (called 'Least Squares') gives us the line that is closest to all our data points on average.",
      formula: "Intercept = ȳ - slope × x̄",
      explanation: "Once we have the slope, we can calculate where the line crosses the y-axis",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />🧠 The Math Behind Linear Regression (Step by Step!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Don't worry - we'll explain every step in simple terms! No scary math here 😊
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {derivationSteps.map((_, index) => (
              <Button
                key={index}
                variant={currentStep === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(index)}
                className="text-xs"
              >
                Step {index + 1}
              </Button>
            ))}
          </div>

          {/* Current Step Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-white font-semibold text-lg mb-4">{derivationSteps[currentStep].title}</h3>

            <p className="text-gray-300 leading-relaxed mb-4">{derivationSteps[currentStep].content}</p>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10 mb-4">
              <p className="text-center text-lg font-mono text-purple-400">{derivationSteps[currentStep].formula}</p>
            </div>

            <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-gray-300 text-sm">
                <strong>💡 In simple terms:</strong> {derivationSteps[currentStep].explanation}
              </p>
            </div>
          </div>

          {/* Visual Example */}
          {currentStep === 1 && (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">📊 Visual Example of Errors</h4>
              <svg viewBox="0 0 400 250" className="w-full h-64">
                {/* Simple visualization of errors */}
                <line x1="50" y1="200" x2="350" y2="100" stroke="#ef4444" strokeWidth="3" />

                {/* Data points with error lines */}
                {[
                  { x: 100, realY: 180, predY: 175 },
                  { x: 150, realY: 140, predY: 155 },
                  { x: 200, realY: 130, predY: 137 },
                  { x: 250, realY: 110, predY: 120 },
                  { x: 300, realY: 100, predY: 102 },
                ].map((point, index) => (
                  <g key={index}>
                    {/* Error line */}
                    <line
                      x1={point.x}
                      y1={point.realY}
                      x2={point.x}
                      y2={point.predY}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    {/* Real point */}
                    <circle cx={point.x} cy={point.realY} r="5" fill="#3b82f6" />
                    {/* Predicted point */}
                    <circle cx={point.x} cy={point.predY} r="4" fill="#ef4444" />
                    {/* Error label */}
                    <text x={point.x + 10} y={(point.realY + point.predY) / 2} fill="#fbbf24" fontSize="10">
                      Error: {Math.abs(point.realY - point.predY)}
                    </text>
                  </g>
                ))}

                <text x="200" y="230" textAnchor="middle" fill="white" fontSize="12">
                  🔵 Real Prices 🔴 Predicted Prices 📏 Errors (Yellow Lines)
                </text>
              </svg>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Previous Step
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(derivationSteps.length - 1, currentStep + 1))}
              disabled={currentStep === derivationSteps.length - 1}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Next Step →
            </Button>
          </div>

          {/* Summary */}
          {currentStep === derivationSteps.length - 1 && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
              <h4 className="text-white font-semibold mb-4">
                🎉 Congratulations! You Now Understand Linear Regression!
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ What You Learned:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• How to find the best line through data points</li>
                    <li>• Why we minimize squared errors</li>
                    <li>• The mathematical formula behind predictions</li>
                    <li>• How calculus helps us find the optimal solution</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-2">🚀 Next Steps:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Try the interactive visualization above</li>
                    <li>• Experiment with different slopes and intercepts</li>
                    <li>• See how errors change with different lines</li>
                    <li>• Apply this to your own data!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function HousePricesProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">Learn Data Science Step by Step! 🚀</p>
            </div>
          </div>
        </div>
      </header>

      {/* Project Header */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-sm px-4 py-2"
              >
                🤖 Linear Regression
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white text-sm px-4 py-2">
                📊 Prediction Problem
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30 text-sm px-4 py-2">
                👶 Beginner Friendly
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">🏠 House Price Prediction</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Learn how to predict house prices using <strong>Linear Regression</strong>! We'll use real data from
              Boston and explain everything step-by-step. Perfect for teenagers starting their data science journey! 🚀
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-white font-semibold mb-2">Learn by Doing</h3>
                <p className="text-gray-300 text-sm">Interactive visualizations and hands-on examples</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🧮</div>
                <h3 className="text-white font-semibold mb-2">Math Made Simple</h3>
                <p className="text-gray-300 text-sm">Step-by-step derivations with clear explanations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-white font-semibold mb-2">Real-World Data</h3>
                <p className="text-gray-300 text-sm">Actual Boston housing data with detailed explanations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="interactive" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="interactive" className="data-[state=active]:bg-white/10 text-sm">
                  <Play className="w-4 h-4 mr-2" />🎮 Interactive Demo
                </TabsTrigger>
                <TabsTrigger value="dataset" className="data-[state=active]:bg-white/10 text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />📚 Understanding Data
                </TabsTrigger>
                <TabsTrigger value="math" className="data-[state=active]:bg-white/10 text-sm">
                  <Brain className="w-4 h-4 mr-2" />🧮 Math Explained
                </TabsTrigger>
              </TabsList>

              <TabsContent value="interactive">
                <AnimatedLinearRegression />
              </TabsContent>

              <TabsContent value="dataset">
                <DatasetExplanation />
              </TabsContent>

              <TabsContent value="math">
                <MathematicalDerivation />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
