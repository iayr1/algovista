"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Pause, RotateCcw, BookOpen, Brain, TrendingUp } from "lucide-react"

// Animated Step-by-Step Linear Regression
const StepByStepLinearRegression = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  const steps = [
    {
      title: "🎯 Step 1: Plot Your Data Points",
      description: "First, we put all our data points on a graph. Each dot represents one house!",
      action: "plotting",
    },
    {
      title: "📏 Step 2: Try Different Lines",
      description: "We try many different lines to see which one fits best through our points.",
      action: "trying_lines",
    },
    {
      title: "📐 Step 3: Measure the Errors",
      description: "For each line, we measure how far it is from each point. These are called 'errors'.",
      action: "measuring_errors",
    },
    {
      title: "🎯 Step 4: Find the Best Line",
      description: "The line with the smallest total error is our winner! This is our prediction line.",
      action: "best_line",
    },
    {
      title: "🔮 Step 5: Make Predictions",
      description: "Now we can predict prices for new houses by using our best line!",
      action: "predicting",
    },
  ]

  // Auto-advance animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((prevStep) => {
              if (prevStep >= steps.length - 1) {
                setIsPlaying(false)
                return 0
              }
              return prevStep + 1
            })
            return 0
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentStep])

  const dataPoints = [
    { x: 3, y: 15, rooms: 3, price: 15 },
    { x: 4, y: 20, rooms: 4, price: 20 },
    { x: 5, y: 25, rooms: 5, price: 25 },
    { x: 6, y: 30, rooms: 6, price: 30 },
    { x: 7, y: 35, rooms: 7, price: 35 },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />🎬 Linear Regression: Step-by-Step Animation
          </CardTitle>
          <CardDescription className="text-gray-300">
            Watch how Linear Regression works, one step at a time! Perfect for visual learners 🎨
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"} Animation
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep(0)
                  setAnimationProgress(0)
                  setIsPlaying(false)
                }}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-300">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {steps.map((_, index) => (
              <Button
                key={index}
                variant={currentStep === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentStep(index)
                  setAnimationProgress(0)
                  setIsPlaying(false)
                }}
                className="text-xs"
              >
                Step {index + 1}
              </Button>
            ))}
          </div>

          {/* Current Step Display */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-white font-semibold text-lg mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-300 leading-relaxed">{steps[currentStep].description}</p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${animationProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Animated Visualization */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
            <svg viewBox="0 0 500 400" className="w-full h-96">
              {/* Grid Background */}
              <defs>
                <pattern id="step-grid" width="50" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="500" height="400" fill="url(#step-grid)" />

              {/* Axes */}
              <line x1="50" y1="350" x2="450" y2="350" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
              <line x1="50" y1="350" x2="50" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />

              {/* Axis Labels */}
              <text x="250" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                🏠 Number of Rooms
              </text>
              <text
                x="25"
                y="200"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                transform="rotate(-90 25 200)"
              >
                💰 Price ($1000s)
              </text>

              {/* Step-specific animations */}
              {currentStep >= 0 && (
                <>
                  {/* Data Points - appear one by one */}
                  {dataPoints.map((point, index) => {
                    const shouldShow = currentStep > 0 || (currentStep === 0 && index <= animationProgress / 20)
                    const x = 50 + (point.x - 2) * 80
                    const y = 350 - point.y * 8

                    return shouldShow ? (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r={currentStep === 0 ? 8 : 6}
                          fill="#3b82f6"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          opacity={currentStep === 0 ? Math.sin(Date.now() * 0.01 + index) * 0.3 + 0.7 : 0.9}
                        />
                        <text x={x} y={y + 2} textAnchor="middle" fontSize="10" fill="white">
                          🏠
                        </text>

                        {/* Tooltip */}
                        <title>
                          {point.rooms} rooms → ${point.price}k
                        </title>
                      </g>
                    ) : null
                  })}
                </>
              )}

              {/* Step 2: Multiple trial lines */}
              {currentStep === 1 && (
                <>
                  {[0.5, 1, 1.5, 2, 2.5].map((slope, index) => {
                    const shouldShow = index <= animationProgress / 20
                    const opacity = shouldShow ? 0.3 + (index === Math.floor(animationProgress / 20) ? 0.4 : 0) : 0

                    return (
                      <line
                        key={index}
                        x1="50"
                        y1={350 - slope * 2 * 8}
                        x2="450"
                        y2={350 - slope * 7 * 8}
                        stroke="#fbbf24"
                        strokeWidth="2"
                        opacity={opacity}
                        strokeDasharray="5,5"
                      />
                    )
                  })}
                </>
              )}

              {/* Step 3: Error lines */}
              {currentStep === 2 && (
                <>
                  {/* Best fit line */}
                  <line
                    x1="50"
                    y1={350 - 5 * 8}
                    x2="450"
                    y2={350 - 40 * 8}
                    stroke="#ef4444"
                    strokeWidth="3"
                    opacity="0.8"
                  />

                  {/* Error lines */}
                  {dataPoints.map((point, index) => {
                    const shouldShow = index <= animationProgress / 20
                    const x = 50 + (point.x - 2) * 80
                    const realY = 350 - point.y * 8
                    const predY = 350 - (5 + (point.x - 2) * 7) * 8

                    return shouldShow ? (
                      <g key={index}>
                        <line
                          x1={x}
                          y1={realY}
                          x2={x}
                          y2={predY}
                          stroke="#fbbf24"
                          strokeWidth="3"
                          strokeDasharray="4,4"
                        />
                        <text x={x + 15} y={(realY + predY) / 2} fill="#fbbf24" fontSize="12" fontWeight="bold">
                          Error: {Math.abs(point.y - (5 + (point.x - 2) * 7)).toFixed(1)}
                        </text>
                      </g>
                    ) : null
                  })}
                </>
              )}

              {/* Step 4: Best line highlight */}
              {currentStep === 3 && (
                <>
                  <line
                    x1="50"
                    y1={350 - 5 * 8}
                    x2="450"
                    y2={350 - 40 * 8}
                    stroke="#10b981"
                    strokeWidth="5"
                    opacity="0.9"
                  />

                  {/* Celebration effect */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={250 + Math.cos(animationProgress * 0.1 + i) * 50}
                      cy={200 + Math.sin(animationProgress * 0.1 + i) * 30}
                      r="3"
                      fill="#10b981"
                      opacity={Math.sin(animationProgress * 0.2 + i) * 0.5 + 0.5}
                    />
                  ))}

                  <text x="250" y="100" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">
                    🎉 Best Line Found!
                  </text>
                </>
              )}

              {/* Step 5: Prediction */}
              {currentStep === 4 && (
                <>
                  {/* Best line */}
                  <line
                    x1="50"
                    y1={350 - 5 * 8}
                    x2="450"
                    y2={350 - 40 * 8}
                    stroke="#10b981"
                    strokeWidth="4"
                    opacity="0.9"
                  />

                  {/* New prediction point */}
                  <g>
                    <circle
                      cx={50 + (5.5 - 2) * 80}
                      cy={350 - (5 + (5.5 - 2) * 7) * 8}
                      r="10"
                      fill="#8b5cf6"
                      stroke="white"
                      strokeWidth="3"
                      opacity={Math.sin(animationProgress * 0.2) * 0.3 + 0.7}
                    />
                    <text
                      x={50 + (5.5 - 2) * 80}
                      y={350 - (5 + (5.5 - 2) * 7) * 8 + 3}
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                    >
                      🔮
                    </text>

                    <text
                      x={50 + (5.5 - 2) * 80}
                      y={350 - (5 + (5.5 - 2) * 7) * 8 - 20}
                      textAnchor="middle"
                      fill="#8b5cf6"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      New Prediction!
                    </text>
                    <text
                      x={50 + (5.5 - 2) * 80}
                      y={350 - (5 + (5.5 - 2) * 7) * 8 - 5}
                      textAnchor="middle"
                      fill="#8b5cf6"
                      fontSize="12"
                    >
                      5.5 rooms → ${(5 + (5.5 - 2) * 7).toFixed(1)}k
                    </text>
                  </g>
                </>
              )}

              {/* Room number labels */}
              {[3, 4, 5, 6, 7].map((rooms) => (
                <text key={rooms} x={50 + (rooms - 2) * 80} y={370} textAnchor="middle" fill="white" fontSize="12">
                  {rooms}
                </text>
              ))}
            </svg>
          </div>

          {/* Step-specific explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-semibold mb-2">🤔 What's Happening Now?</h5>
              <p className="text-gray-300 text-sm">
                {currentStep === 0 &&
                  "We're plotting each house as a dot on our graph. The x-axis shows rooms, y-axis shows price."}
                {currentStep === 1 &&
                  "We're trying different lines to see which one goes through our points best. Each line represents a different prediction rule."}
                {currentStep === 2 &&
                  "For each line, we measure how far it is from each real data point. These distances are our 'errors'."}
                {currentStep === 3 && "We found the line with the smallest total error! This is our best predictor."}
                {currentStep === 4 && "Now we can use our line to predict prices for houses we haven't seen before!"}
              </p>
            </div>

            <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
              <h5 className="text-blue-400 font-semibold mb-2">💡 Why This Works</h5>
              <p className="text-gray-300 text-sm">
                {currentStep === 0 &&
                  "Visualizing data helps us see patterns. If there's a relationship between rooms and price, we'll see it!"}
                {currentStep === 1 &&
                  "Different lines represent different 'theories' about how rooms affect price. We need to test them all."}
                {currentStep === 2 &&
                  "By measuring errors, we can objectively compare which line performs better. Math helps us be precise!"}
                {currentStep === 3 &&
                  "The line with minimum error is mathematically proven to be the best predictor for this type of problem."}
                {currentStep === 4 &&
                  "Our trained model can now make predictions about new houses by following the same pattern it learned!"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mathematical Explanation Component
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

// Code Implementation Component
const CodeImplementation = () => {
  // Simple JavaScript implementations for educational purposes
  const calculateMean = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0) / arr.length

  const calculateSlope = (x: number[], y: number[]) => {
    const xMean = calculateMean(x)
    const yMean = calculateMean(y)

    const numerator = x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0)
    const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0)

    return numerator / denominator
  }

  const calculateIntercept = (x: number[], y: number[], slope: number) => {
    const xMean = calculateMean(x)
    const yMean = calculateMean(y)
    return yMean - slope * xMean
  }

  const calculateMSE = (actual: number[], predicted: number[]) => {
    const errors = actual.map((val, i) => Math.pow(val - predicted[i], 2))
    return calculateMean(errors)
  }

  const calculateR2 = (actual: number[], predicted: number[]) => {
    const actualMean = calculateMean(actual)
    const totalSumSquares = actual.reduce((sum, val) => sum + Math.pow(val - actualMean, 2), 0)
    const residualSumSquares = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0)
    return 1 - residualSumSquares / totalSumSquares
  }

  // Sample data
  const rooms = [3, 4, 5, 6, 7, 8]
  const prices = [150, 200, 250, 300, 350, 400]

  // Calculate regression parameters
  const slope = calculateSlope(rooms, prices)
  const intercept = calculateIntercept(rooms, prices, slope)

  const predictPrice = (numRooms: number) => slope * numRooms + intercept

  const predictions = rooms.map((r) => predictPrice(r))
  const mse = calculateMSE(prices, predictions)
  const rmse = Math.sqrt(mse)
  const r2 = calculateR2(prices, predictions)

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />💻 Linear Regression Implementation (From Scratch!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Build Linear Regression step by step with detailed explanations! 🛠️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Data Preparation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🗃️ Step 1: Prepare House Data</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-3">Create Sample Data</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Create some sample house data
// rooms = number of rooms, prices = house prices in thousands
const rooms = [3, 4, 5, 6, 7, 8];  // Our x values (input)
const prices = [150, 200, 250, 300, 350, 400];  // Our y values (output)

console.log("Our data:");
for (let i = 0; i < rooms.length; i++) {
    console.log(\`House with \${rooms[i]} rooms costs $\${prices[i]}k\`);
}

// Output:
// House with 3 rooms costs $150k
// House with 4 rooms costs $200k
// ... and so on`}
              </pre>
              <div className="mt-3 p-3 bg-blue-500/20 rounded border border-blue-500/30">
                <p className="text-blue-400 text-sm">
                  <strong>💡 What's happening:</strong> We're creating our training data. Each house has a number of
                  rooms (input) and a price (what we want to predict).
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-green-400 font-semibold mb-3">Calculate the Slope (m)</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Helper function to calculate mean (average)
const calculateMean = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

// Calculate averages (means)
const xMean = calculateMean(rooms);    // Average number of rooms
const yMean = calculateMean(prices);   // Average price

console.log(\`Average rooms: \${xMean}\`);      // Should be 5.5
console.log(\`Average price: $\${yMean}k\`);    // Should be $275k

// Calculate slope using the formula: m = Σ(x-x̄)(y-ȳ) / Σ(x-x̄)²
const calculateSlope = (x, y) => {
    const xMean = calculateMean(x);
    const yMean = calculateMean(y);
    
    const numerator = x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0);
    const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);
    
    return numerator / denominator;
};

const slope = calculateSlope(rooms, prices);
console.log(\`Slope (m): \${slope}\`);  // Should be 50 (each room adds $50k)`}
              </pre>
              <div className="mt-3 p-3 bg-green-500/20 rounded border border-green-500/30">
                <p className="text-green-400 text-sm">
                  <strong>💡 What's happening:</strong> We're calculating how much the price changes for each additional
                  room. The slope tells us: "Each extra room adds $50k to the price."
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-3">Calculate the Intercept (b)</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Calculate intercept using: b = ȳ - m × x̄
const calculateIntercept = (x, y, slope) => {
    const xMean = calculateMean(x);
    const yMean = calculateMean(y);
    return yMean - slope * xMean;
};

const intercept = calculateIntercept(rooms, prices, slope);
console.log(\`Intercept (b): \${intercept}\`);  // Should be -$50k

// This means a house with 0 rooms would theoretically cost -$50k
// (which doesn't make sense in real life, but it's just math!)

// Our final equation is: Price = 50 × Rooms - 50
console.log(\`Our equation: Price = \${slope} × Rooms + \${intercept}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-purple-500/20 rounded border border-purple-500/30">
                <p className="text-purple-400 text-sm">
                  <strong>💡 What's happening:</strong> The intercept tells us where our line crosses the y-axis. It's
                  the "base price" before adding rooms (even if it's negative in this example).
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-orange-400 font-semibold mb-3">Make Predictions</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Function to predict house prices
const predictPrice = (numRooms) => {
    return slope * numRooms + intercept;
};

// Test our model
const testRooms = [4.5, 6.5, 9];
testRooms.forEach(rooms => {
    const predictedPrice = predictPrice(rooms);
    console.log(\`A house with \${rooms} rooms should cost $\${predictedPrice}k\`);
});

// Output:
// A house with 4.5 rooms should cost $175k
// A house with 6.5 rooms should cost $275k  
// A house with 9 rooms should cost $400k`}
              </pre>
              <div className="mt-3 p-3 bg-orange-500/20 rounded border border-orange-500/30">
                <p className="text-orange-400 text-sm">
                  <strong>💡 What's happening:</strong> Now we can predict prices for houses we've never seen! Our model
                  learned the pattern from the training data.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-3">Evaluate Our Model</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Calculate how good our model is
const calculateMSE = (actual, predicted) => {
    const errors = actual.map((val, i) => Math.pow(val - predicted[i], 2));
    return errors.reduce((sum, val) => sum + val, 0) / errors.length;
};

const calculateR2 = (actual, predicted) => {
    const actualMean = actual.reduce((sum, val) => sum + val, 0) / actual.length;
    const totalSumSquares = actual.reduce((sum, val) => sum + Math.pow(val - actualMean, 2), 0);
    const residualSumSquares = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0);
    return 1 - (residualSumSquares / totalSumSquares);
};

// Make predictions for our training data
const predictions = rooms.map(r => predictPrice(r));

// Calculate metrics
const mse = calculateMSE(prices, predictions);
const rmse = Math.sqrt(mse);
const r2 = calculateR2(prices, predictions);

console.log(\`Mean Squared Error: \${mse.toFixed(2)}\`);
console.log(\`Root Mean Squared Error: $\${rmse.toFixed(1)}k\`);
console.log(\`R² Score: \${r2.toFixed(3)}\`);  // How well our line fits (1.0 = perfect)`}
              </pre>
              <div className="mt-3 p-3 bg-cyan-500/20 rounded border border-cyan-500/30">
                <p className="text-cyan-400 text-sm">
                  <strong>💡 What's happening:</strong> We're measuring how good our model is. RMSE tells us the average
                  prediction error, and R² tells us how well our line fits the data (closer to 1.0 is better).
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-4">📊 Our Model Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-green-400 font-semibold">🎯 Model Parameters</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Slope (m):</span>
                      <span className="text-white font-bold">{slope.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Intercept (b):</span>
                      <span className="text-white font-bold">{intercept.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-500/20 rounded border border-blue-500/30">
                      <p className="text-blue-400 text-xs text-center">
                        <strong>Equation:</strong> Price = {slope.toFixed(2)} × Rooms + {intercept.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-purple-400 font-semibold">📈 Model Performance</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">RMSE:</span>
                      <span className="text-white font-bold">${rmse.toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">R² Score:</span>
                      <span className="text-white font-bold">{r2.toFixed(3)}</span>
                    </div>
                    <div className="mt-3 p-2 bg-green-500/20 rounded border border-green-500/30">
                      <p className="text-green-400 text-xs text-center">
                        <strong>Interpretation:</strong> Our model explains {(r2 * 100).toFixed(1)}% of price variation!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/20 rounded border border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-2">🎉 Congratulations!</h4>
              <p className="text-gray-300 text-sm">
                You've successfully implemented Linear Regression from scratch using pure JavaScript! You now understand
                both the theory and the practice. This is the foundation for all of machine learning! 🚀
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LinearRegressionAlgorithm() {
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
            <Link href="/category/supervised" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Supervised Learning
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">Algorithm Deep Dive 🚀</p>
            </div>
          </div>
        </div>
      </header>

      {/* Algorithm Header */}
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
                📊 Supervised Learning
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30 text-sm px-4 py-2">
                👶 Beginner Friendly
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">📈 Linear Regression Explained</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              The <strong>simplest</strong> and most <strong>fundamental</strong> machine learning algorithm! Learn how
              to draw the perfect line through data points to make predictions. We'll explain everything step-by-step
              with animations! 🎬
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="text-white font-semibold mb-2">Animated Learning</h3>
                <p className="text-gray-300 text-sm">Watch the algorithm work step-by-step</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🧮</div>
                <h3 className="text-white font-semibold mb-2">Math</h3>
                <p className="text-gray-300 text-sm">Complex formulas explained in simple terms</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🎮</div>
                <h3 className="text-white font-semibold mb-2">Interactive Demo</h3>
                <p className="text-gray-300 text-sm">Play with parameters and see results instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="animation" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="animation" className="data-[state=active]:bg-white/10 text-sm">
                  <Play className="w-4 h-4 mr-2" />🎬 Animation
                </TabsTrigger>
                <TabsTrigger value="math" className="data-[state=active]:bg-white/10 text-sm">
                  <Brain className="w-4 h-4 mr-2" />🧮 Math
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-white/10 text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />💻 Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="animation">
                <StepByStepLinearRegression />
              </TabsContent>

              <TabsContent value="math">
                <MathematicalDerivation />
              </TabsContent>

              <TabsContent value="code">
                <CodeImplementation />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
