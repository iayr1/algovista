"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, RotateCcw, BookOpen, Brain, Users } from "lucide-react"

// Animated K-Means Clustering Visualization
const AnimatedKMeansVisualization = () => {
  const [k, setK] = useState([3])
  const [isRunning, setIsRunning] = useState(false)
  const [iteration, setIteration] = useState(0)
  const [animationStep, setAnimationStep] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<"init" | "assign" | "update" | "converged">("init")

  // Sample customer data points
  const [dataPoints, setDataPoints] = useState([
    { x: 2, y: 3, cluster: 0, originalCluster: 0 },
    { x: 3, y: 2, cluster: 0, originalCluster: 0 },
    { x: 2.5, y: 2.5, cluster: 0, originalCluster: 0 },
    { x: 8, y: 8, cluster: 1, originalCluster: 1 },
    { x: 9, y: 7, cluster: 1, originalCluster: 1 },
    { x: 8.5, y: 8.5, cluster: 1, originalCluster: 1 },
    { x: 1, y: 8, cluster: 2, originalCluster: 2 },
    { x: 2, y: 9, cluster: 2, originalCluster: 2 },
    { x: 1.5, y: 8.5, cluster: 2, originalCluster: 2 },
    { x: 7, y: 2, cluster: 0, originalCluster: 0 },
    { x: 8, y: 1, cluster: 0, originalCluster: 0 },
    { x: 7.5, y: 1.5, cluster: 0, originalCluster: 0 },
  ])

  const [centroids, setCentroids] = useState([
    { x: 3, y: 2.5, prevX: 3, prevY: 2.5 },
    { x: 8.5, y: 7.5, prevX: 8.5, prevY: 7.5 },
    { x: 1.5, y: 8.5, prevX: 1.5, prevY: 8.5 },
  ])

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]
  const clusterNames = [
    "Tech Enthusiasts",
    "Luxury Shoppers",
    "Budget Conscious",
    "Frequent Buyers",
    "Occasional Shoppers",
  ]

  // Animation logic
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => {
          if (prev >= 100) {
            // Move to next phase
            if (currentPhase === "init") {
              setCurrentPhase("assign")
            } else if (currentPhase === "assign") {
              setCurrentPhase("update")
            } else if (currentPhase === "update") {
              setIteration((prevIter) => prevIter + 1)
              if (iteration < 5) {
                setCurrentPhase("assign")
              } else {
                setCurrentPhase("converged")
                setIsRunning(false)
              }
            }
            return 0
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isRunning, currentPhase, iteration])

  const resetAnimation = () => {
    setIsRunning(false)
    setIteration(0)
    setAnimationStep(0)
    setCurrentPhase("init")
    // Reset centroids to random positions
    setCentroids([
      { x: Math.random() * 8 + 1, y: Math.random() * 8 + 1, prevX: 3, prevY: 2.5 },
      { x: Math.random() * 8 + 1, y: Math.random() * 8 + 1, prevX: 8.5, prevY: 7.5 },
      { x: Math.random() * 8 + 1, y: Math.random() * 8 + 1, prevX: 1.5, prevY: 8.5 },
    ])
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />👥 K-Means Clustering: Step-by-Step Animation
          </CardTitle>
          <CardDescription className="text-gray-300">
            Watch how K-Means finds customer groups by iteratively improving cluster centers! 🎬
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Phase Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                {currentPhase === "init" && "🎯 Phase 1: Initialize Cluster Centers"}
                {currentPhase === "assign" && "📍 Phase 2: Assign Points to Nearest Center"}
                {currentPhase === "update" && "🔄 Phase 3: Update Cluster Centers"}
                {currentPhase === "converged" && "🎉 Phase 4: Algorithm Converged!"}
              </h3>
              <div className="text-sm text-gray-300">
                Iteration: {iteration} | Progress: {animationStep}%
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {currentPhase === "init" &&
                "We start by randomly placing cluster centers (centroids) on our data. These will move to find the best groupings!"}
              {currentPhase === "assign" &&
                "Each customer is assigned to the nearest cluster center. Watch the colors change as customers find their closest group!"}
              {currentPhase === "update" &&
                "We move each cluster center to the average position of all customers in that group. This creates better groupings!"}
              {currentPhase === "converged" &&
                "The algorithm has found stable groups! The cluster centers are no longer moving significantly."}
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${animationStep}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Number of Clusters (k): {k[0]}</label>
              <Slider value={k} onValueChange={setK} max={5} min={2} step={1} />
              <p className="text-xs text-gray-400">
                🎯 <strong>k</strong> is how many groups we want to find in our customer data
              </p>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? "Pause" : "Start"} Animation
              </Button>
              <Button
                onClick={resetAnimation}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Animated Visualization */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">📊 Customer Clustering Visualization</h4>

            <svg viewBox="0 0 500 400" className="w-full h-96">
              {/* Grid Background */}
              <defs>
                <pattern id="kmeans-grid" width="50" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="500" height="400" fill="url(#kmeans-grid)" />

              {/* Axes */}
              <line x1="50" y1="350" x2="450" y2="350" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
              <line x1="50" y1="350" x2="50" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />

              {/* Axis Labels */}
              <text x="250" y="380" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                💰 Annual Spending ($1000s)
              </text>
              <text
                x="25"
                y="200"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                transform="rotate(-90 25 200)"
              >
                🛒 Purchase Frequency
              </text>

              {/* Connection lines from points to centroids during assignment phase */}
              {currentPhase === "assign" && (
                <>
                  {dataPoints.map((point, index) => {
                    const shouldShow = index <= animationStep / 10
                    if (!shouldShow) return null

                    const centroid = centroids[point.cluster % k[0]]
                    return (
                      <line
                        key={`line-${index}`}
                        x1={50 + point.x * 40}
                        y1={350 - point.y * 35}
                        x2={50 + centroid.x * 40}
                        y2={350 - centroid.y * 35}
                        stroke={colors[point.cluster % k[0]]}
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.5"
                      />
                    )
                  })}
                </>
              )}

              {/* Data Points (Customers) */}
              {dataPoints.map((point, index) => {
                const shouldShow = currentPhase !== "init" || index <= animationStep / 10
                if (!shouldShow) return null

                const animatedRadius =
                  isRunning && currentPhase === "assign" ? 6 + Math.sin((animationStep + index * 20) * 0.2) * 2 : 6

                return (
                  <g key={index}>
                    <circle
                      cx={50 + point.x * 40}
                      cy={350 - point.y * 35}
                      r={animatedRadius}
                      fill={colors[point.cluster % k[0]]}
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    <text
                      x={50 + point.x * 40}
                      y={350 - point.y * 35 + 2}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                    >
                      👤
                    </text>
                    <title>
                      Customer {index + 1}: ${point.x * 5}k spending, {point.y * 2} purchases/year
                    </title>
                  </g>
                )
              })}

              {/* Centroids (Cluster Centers) */}
              {centroids.slice(0, k[0]).map((centroid, index) => {
                const shouldShow = currentPhase !== "init" || animationStep > 20
                if (!shouldShow) return null

                // Animate centroid movement during update phase
                let displayX = centroid.x
                let displayY = centroid.y

                if (currentPhase === "update") {
                  const progress = animationStep / 100
                  displayX = centroid.prevX + (centroid.x - centroid.prevX) * progress
                  displayY = centroid.prevY + (centroid.y - centroid.prevY) * progress
                }

                return (
                  <g key={index}>
                    {/* Pulsing ring around centroid */}
                    <circle
                      cx={50 + displayX * 40}
                      cy={350 - displayY * 35}
                      r={12 + (isRunning ? Math.sin(animationStep * 0.3) * 3 : 0)}
                      fill="none"
                      stroke={colors[index]}
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    {/* Main centroid */}
                    <circle
                      cx={50 + displayX * 40}
                      cy={350 - displayY * 35}
                      r="10"
                      fill={colors[index]}
                      stroke="white"
                      strokeWidth="3"
                    />
                    <circle cx={50 + displayX * 40} cy={350 - displayY * 35} r="4" fill="white" />

                    {/* Centroid label */}
                    <text
                      x={50 + displayX * 40}
                      y={350 - displayY * 35 - 20}
                      textAnchor="middle"
                      fill={colors[index]}
                      fontSize="12"
                      fontWeight="bold"
                    >
                      Center {index + 1}
                    </text>
                  </g>
                )
              })}

              {/* Convergence celebration */}
              {currentPhase === "converged" && (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={250 + Math.cos(animationStep * 0.1 + i) * 80}
                      cy={200 + Math.sin(animationStep * 0.1 + i) * 50}
                      r="3"
                      fill="#fbbf24"
                      opacity={Math.sin(animationStep * 0.2 + i) * 0.5 + 0.5}
                    />
                  ))}
                  <text x="250" y="100" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="bold">
                    🎉 Clustering Complete!
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Cluster Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">📊 Cluster Analysis</h4>
              {centroids.slice(0, k[0]).map((centroid, index) => {
                const clusterPoints = dataPoints.filter((p) => p.cluster === index)
                const avgSpending = clusterPoints.reduce((sum, p) => sum + p.x * 5, 0) / clusterPoints.length || 0
                const avgFrequency = clusterPoints.reduce((sum, p) => sum + p.y * 2, 0) / clusterPoints.length || 0

                return (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                      <h5 className="text-white font-semibold">{clusterNames[index]}</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Avg Spending:</span>
                        <span className="text-white ml-2">${avgSpending.toFixed(0)}k</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Avg Frequency:</span>
                        <span className="text-white ml-2">{avgFrequency.toFixed(1)}/year</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Customers:</span>
                        <span className="text-white ml-2">{clusterPoints.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue %:</span>
                        <span className="text-white ml-2">
                          {clusterPoints.length > 0
                            ? (
                                ((avgSpending * clusterPoints.length) /
                                  dataPoints.reduce((sum, p) => sum + p.x * 5, 0)) *
                                100
                              ).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">🤔 What's Happening?</h4>
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <h5 className="text-blue-400 font-semibold mb-2">💡 Algorithm Steps:</h5>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>
                    <strong>Initialize:</strong> Place k cluster centers randomly
                  </li>
                  <li>
                    <strong>Assign:</strong> Each customer joins nearest center
                  </li>
                  <li>
                    <strong>Update:</strong> Move centers to average of their customers
                  </li>
                  <li>
                    <strong>Repeat:</strong> Until centers stop moving significantly
                  </li>
                </ol>
              </div>

              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                <h5 className="text-green-400 font-semibold mb-2">🎯 Business Value:</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>Targeted Marketing:</strong> Different strategies per group
                  </li>
                  <li>
                    • <strong>Product Recommendations:</strong> Based on cluster preferences
                  </li>
                  <li>
                    • <strong>Pricing Strategy:</strong> Optimize for each segment
                  </li>
                  <li>
                    • <strong>Customer Retention:</strong> Identify at-risk groups
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mathematical Explanation Component
const KMeansMathExplanation = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const mathSteps = [
    {
      title: "🎯 The Goal: Minimize Within-Cluster Sum of Squares",
      content:
        "We want to find cluster centers that minimize the total distance from all points to their nearest center.",
      formula: "minimize: Σᵢ₌₁ᵏ Σₓ∈Cᵢ ||x - μᵢ||²",
      explanation:
        "Sum over all k clusters, then sum over all points x in cluster Cᵢ, the squared distance to center μᵢ",
      intuition:
        "Think of it like finding the best meeting spots for groups of friends - you want to minimize everyone's total travel distance!",
    },
    {
      title: "📏 Distance Calculation: Euclidean Distance",
      content: "We measure how far each customer is from each cluster center using straight-line distance.",
      formula: "d(x, μ) = √[(x₁ - μ₁)² + (x₂ - μ₂)² + ... + (xₙ - μₙ)²]",
      explanation:
        "For 2D customer data: distance = √[(spending - center_spending)² + (frequency - center_frequency)²]",
      intuition: "Like measuring the distance between two points on a map - the shortest path is a straight line!",
    },
    {
      title: "👥 Assignment Step: Find Nearest Center",
      content: "Each customer is assigned to the cluster center that's closest to them.",
      formula: "Cᵢ = {x : ||x - μᵢ|| ≤ ||x - μⱼ|| for all j}",
      explanation: "Customer x belongs to cluster i if center μᵢ is closer than any other center μⱼ",
      intuition: "Like choosing which coffee shop to go to - you pick the one that's closest to you!",
    },
    {
      title: "🔄 Update Step: Move Centers to Average",
      content: "Each cluster center moves to the average position of all customers in that cluster.",
      formula: "μᵢ = (1/|Cᵢ|) Σₓ∈Cᵢ x",
      explanation: "New center position = average of all customer positions in that cluster",
      intuition:
        "Like finding the best meeting spot for a group - it's the center point that minimizes everyone's travel!",
    },
    {
      title: "🔁 Convergence: When to Stop",
      content: "We repeat assign and update steps until the centers stop moving significantly.",
      formula: "||μᵢ⁽ᵗ⁺¹⁾ - μᵢ⁽ᵗ⁾|| < ε for all i",
      explanation: "Stop when the change in center positions is smaller than threshold ε",
      intuition:
        "Like when you're adjusting a group meeting spot - eventually you find the best location and stop moving it!",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />🧮 K-Means Mathematics (Step by Step!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Understanding the math behind K-Means clustering with simple explanations! 🎓
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {mathSteps.map((_, index) => (
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
            <h3 className="text-white font-semibold text-lg mb-4">{mathSteps[currentStep].title}</h3>

            <p className="text-gray-300 leading-relaxed mb-4">{mathSteps[currentStep].content}</p>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10 mb-4">
              <p className="text-center text-lg font-mono text-purple-400">{mathSteps[currentStep].formula}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <h4 className="text-blue-400 font-semibold mb-2">📚 Mathematical Explanation:</h4>
                <p className="text-gray-300 text-sm">{mathSteps[currentStep].explanation}</p>
              </div>

              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">💡 Intuitive Understanding:</h4>
                <p className="text-gray-300 text-sm">{mathSteps[currentStep].intuition}</p>
              </div>
            </div>
          </div>

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
              onClick={() => setCurrentStep(Math.min(mathSteps.length - 1, currentStep + 1))}
              disabled={currentStep === mathSteps.length - 1}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Next Step →
            </Button>
          </div>

          {/* Summary */}
          {currentStep === mathSteps.length - 1 && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
              <h4 className="text-white font-semibold mb-4">🎉 You Now Understand K-Means Mathematics!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ Key Concepts Learned:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• How to measure distances between points</li>
                    <li>• Why we minimize within-cluster sum of squares</li>
                    <li>• How the assignment step works mathematically</li>
                    <li>• Why we update centers to cluster averages</li>
                    <li>• When and why the algorithm converges</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-2">🚀 Next Steps:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Try the interactive visualization above</li>
                    <li>• Experiment with different k values</li>
                    <li>• See how it works on real customer data</li>
                    <li>• Learn about choosing optimal k</li>
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
const KMeansCodeImplementation = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            💻 K-Means Implementation (From Scratch!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Build K-Means clustering step by step with detailed explanations! 🛠️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Step 1: Data Preparation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🗃️ Step 1: Prepare Customer Data</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-3">Import Libraries and Create Sample Data</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Create sample customer data
# Each customer has: [annual_spending, purchase_frequency]
customer_data = np.array([
    [15, 12],   # Customer 1: $15k spending, 12 purchases/year
    [45, 24],   # Customer 2: $45k spending, 24 purchases/year  
    [8, 6],     # Customer 3: $8k spending, 6 purchases/year
    [32, 18],   # Customer 4: $32k spending, 18 purchases/year
    [5, 3],     # Customer 5: $5k spending, 3 purchases/year
    [52, 30],   # Customer 6: $52k spending, 30 purchases/year
    [12, 8],    # Customer 7: $12k spending, 8 purchases/year
    [3, 2],     # Customer 8: $3k spending, 2 purchases/year
])

print("Customer Data Shape:", customer_data.shape)
print("First 3 customers:")
print("Spending | Frequency")
for i in range(3):
    print(f"${customer_data[i,0]}k    | {customer_data[i,1]} purchases/year")`}
              </pre>
              <div className="mt-3 p-3 bg-blue-500/20 rounded border border-blue-500/30">
                <p className="text-blue-400 text-sm">
                  <strong>💡 What's happening:</strong> We're creating a dataset where each customer is represented by 
                  two features: how much they spend annually and how often they make purchases.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-green-400 font-semibold mb-3">Visualize the Data</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Plot the customer data to see natural groupings
plt.figure(figsize=(10, 6))
plt.scatter(customer_data[:, 0], customer_data[:, 1], 
           c='blue', s=100, alpha=0.7)

# Add labels for each customer
for i, (spending, frequency) in enumerate(customer_data):
    plt.annotate(f'C{i+1}', (spending, frequency), 
                xytext=(5, 5), textcoords='offset points')

plt.xlabel('Annual Spending ($1000s) 💰')
plt.ylabel('Purchase Frequency (per year) 🛒')
plt.title('Customer Data - Can you see natural groups? 👀')
plt.grid(True, alpha=0.3)
plt.show()

# Look for patterns
print("\\n🤔 Can you spot natural customer groups?")
print("• High spenders with high frequency (top-right)")
print("• Low spenders with low frequency (bottom-left)")  
print("• Maybe some in between?")`}
              </pre>
              <div className="mt-3 p-3 bg-green-500/20 rounded border border-green-500/30">
                <p className="text-green-400 text-sm">
                  <strong>💡 What's happening:</strong> Before applying K-Means, we visualize our data to get intuition 
                  about how many natural groups might exist. This helps us choose a good value for k.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: K-Means Implementation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🛠️ Step 2: Build K-Means from Scratch</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-3">Initialize Cluster Centers</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`def initialize_centroids(data, k):
    """
    Initialize k cluster centers randomly within the data range
    
    Args:
        data: numpy array of shape (n_samples, n_features)
        k: number of clusters
    
    Returns:
        centroids: numpy array of shape (k, n_features)
    """
    n_features = data.shape[1]
    centroids = np.zeros((k, n_features))
    
    # For each feature (spending, frequency)
    for i in range(n_features):
        # Set centroid values randomly within the range of that feature
        min_val = np.min(data[:, i])
        max_val = np.max(data[:, i])
        centroids[:, i] = np.random.uniform(min_val, max_val, k)
    
    return centroids

# Example: Initialize 3 cluster centers
k = 3
initial_centroids = initialize_centroids(customer_data, k)

print(f"Initialized {k} cluster centers:")
print("Center | Spending | Frequency")
for i, centroid in enumerate(initial_centroids):
    print(f"  {i+1}    | ${centroid[0]:.1f}k   | {centroid[1]:.1f}/year")`}
              </pre>
              <div className="mt-3 p-3 bg-purple-500/20 rounded border border-purple-500/30">
                <p className="text-purple-400 text-sm">\
                  <strong>💡 What's happening:</strong> We randomly place k cluster centers within the range of our data. 
                  These will move during the algorithm to find the best positions.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-orange-400 font-semibold mb-3">Calculate Distances</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`def calculate_distance(point, centroid):
    """
    Calculate Euclidean distance between a point and centroid
    
    Args:
        point: numpy array of shape (n_features,)
        centroid: numpy array of shape (n_features,)
    
    Returns:
        distance: float
    """
    # Euclidean distance: sqrt(sum of squared differences)
    return np.sqrt(np.sum((point - centroid) ** 2))

def assign_clusters(data, centroids):
    """
    Assign each data point to the nearest centroid
    
    Args:
        data: numpy array of shape (n_samples, n_features)
        centroids: numpy array of shape (k, n_features)
    
    Returns:
        clusters: numpy array of shape (n_samples,) with cluster assignments
    """
    n_samples = data.shape[0]
    clusters = np.zeros(n_samples)
    
    # For each customer
    for i, customer in enumerate(data):
        distances = []
        
        # Calculate distance to each centroid
        for centroid in centroids:
            distance = calculate_distance(customer, centroid)
            distances.append(distance)
        
        # Assign to nearest centroid (minimum distance)
        clusters[i] = np.argmin(distances)
        
        # Show the calculation for first customer
        if i == 0:
            print(f"\\nCustomer 1 distances to centers:")
            for j, dist in enumerate(distances):
                print(f"  Center {j+1}: {dist:.2f}")
            print(f"  → Assigned to Center {int(clusters[i])+1}")
    
    return clusters.astype(int)

# Test the assignment
cluster_assignments = assign_clusters(customer_data, initial_centroids)
print(f"\\nCluster assignments: {cluster_assignments}")`}
              </pre>
              <div className="mt-3 p-3 bg-orange-500/20 rounded border border-orange-500/30">
                <p className="text-orange-400 text-sm">
                  <strong>💡 What's happening:</strong> For each customer, we calculate the distance to every cluster center 
                  and assign them to the nearest one. This is the "assignment step" of K-Means.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-3">Update Cluster Centers</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`def update_centroids(data, clusters, k):
    """
    Update centroid positions to the mean of assigned points
    
    Args:
        data: numpy array of shape (n_samples, n_features)
        clusters: numpy array of shape (n_samples,) with cluster assignments
        k: number of clusters
    
    Returns:
        new_centroids: numpy array of shape (k, n_features)
    """
    n_features = data.shape[1]
    new_centroids = np.zeros((k, n_features))
    
    # For each cluster
    for i in range(k):
        # Find all customers assigned to this cluster
        cluster_points = data[clusters == i]
        
        if len(cluster_points) > 0:
            # Move centroid to average position of cluster points
            new_centroids[i] = np.mean(cluster_points, axis=0)
            
            print(f"\\nCluster {i+1}:")
            print(f"  Customers in cluster: {len(cluster_points)}")
            print(f"  Average spending: ${new_centroids[i,0]:.1f}k")
            print(f"  Average frequency: {new_centroids[i,1]:.1f}/year")
        else:
            # If no points assigned, keep centroid where it is
            print(f"\\nCluster {i+1}: No customers assigned!")\
            new_centroids[i] = initial_centroids[i]
    \
    return new_centroids

# Test centroid update
new_centroids = update_centroids(customer_data, cluster_assignments, k)

print("\\n📊 Centroid Movement:")
for i in range(k):
    old_pos = initial_centroids[i]
    new_pos = new_centroids[i]
    movement = calculate_distance(old_pos, new_pos)
    print(f"Center {i+1} moved {movement:.2f} units")`}
              </pre>
              <div className="mt-3 p-3 bg-cyan-500/20 rounded border border-cyan-500/30">
                <p className="text-cyan-400 text-sm">
                  <strong>💡 What\'s happening:</strong> We move each cluster center to the average position of all customers 
                  assigned to it. This is the "update step" that improves our clustering.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Complete Algorithm */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🔄 Step 3: Complete K-Means Algorithm</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-pink-400 font-semibold mb-3">Full K-Means Implementation</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`def kmeans(data, k, max_iterations=100, tolerance=1e-4):
    """
    Complete K-Means clustering algorithm
    
    Args:
        data: numpy array of customer data
        k: number of clusters
        max_iterations: maximum number of iterations
        tolerance: stop if centroids move less than this
    
    Returns:
        final_centroids: final cluster centers
        final_clusters: final cluster assignments
        history: list of centroids at each iteration
    """
    print(f"🚀 Starting K-Means with k={k}")
    print(f"📊 Data shape: {data.shape}")
    
    # Step 1: Initialize centroids
    centroids = initialize_centroids(data, k)
    history = [centroids.copy()]
    
    for iteration in range(max_iterations):
        print(f"\\n--- Iteration {iteration + 1} ---")
        
        # Step 2: Assign points to nearest centroids
        clusters = assign_clusters(data, centroids)
        
        # Step 3: Update centroids
        new_centroids = update_centroids(data, clusters, k)
        
        # Step 4: Check for convergence
        centroid_movement = 0
        for i in range(k):
            movement = calculate_distance(centroids[i], new_centroids[i])
            centroid_movement += movement
        
        print(f"Total centroid movement: {centroid_movement:.4f}")
        
        # Stop if centroids barely moved
        if centroid_movement < tolerance:
            print(f"🎉 Converged after {iteration + 1} iterations!")
            break
        
        centroids = new_centroids.copy()
        history.append(centroids.copy())
    
    return centroids, clusters, history

# Run K-Means on our customer data
final_centroids, final_clusters, centroid_history = kmeans(customer_data, k=3)

print("\\n🎯 Final Results:")
print("Customer | Spending | Frequency | Cluster")
for i, (customer, cluster) in enumerate(zip(customer_data, final_clusters)):
    print(f"   {i+1}     | ${customer[0]:2.0f}k     | {customer[1]:2.0f}/year   |    {cluster+1}")
    
print("\\n🏆 Final Cluster Centers:")
cluster_names = ["Budget Shoppers", "Regular Customers", "VIP Customers"]\
for i, (centroid, name) in enumerate(zip(final_centroids, cluster_names)):
    print(f\"{name}: ${centroid[0]:.1f}k spending, {centroid[1]:.1f} purchases/year")`}
              </pre>
              <div className="mt-3 p-3 bg-pink-500/20 rounded border border-pink-500/30">
                <p className="text-pink-400 text-sm">\
                  <strong>💡 What\'s happening:</strong> This is the complete K-Means algorithm! It iteratively assigns 
                  customers to clusters and updates centers until convergence (when centers stop moving significantly).
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Using Scikit-Learn */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-4">🚀 Using Scikit-Learn (Professional Way)</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Prepare the data (scaling is often important)
scaler = StandardScaler()
scaled_data = scaler.fit_transform(customer_data)

print("Original data range:")
print(f"Spending: ${customer_data[:, 0].min()}k - ${customer_data[:, 0].max()}k")
print(f"Frequency: {customer_data[:, 1].min()} - {customer_data[:, 1].max()} purchases/year")

print("\\nAfter scaling (mean=0, std=1):")
print(f"Spending: {scaled_data[:, 0].min():.2f} - {scaled_data[:, 0].max():.2f}")
print(f"Frequency: {scaled_data[:, 1].min():.2f} - {scaled_data[:, 1].max():.2f}")

# Apply K-Means
kmeans_sklearn = KMeans(n_clusters=3, random_state=42, n_init=10)
sklearn_clusters = kmeans_sklearn.fit_predict(scaled_data)

# Get cluster centers (in original scale)
sklearn_centroids = scaler.inverse_transform(kmeans_sklearn.cluster_centers_)

print("\\n🎯 Scikit-Learn Results:")
print("Customer | Spending | Frequency | Our K-Means | Scikit-Learn")
for i in range(len(customer_data)):
    print(f"   {i+1}     | ${customer_data[i,0]:2.0f}k     | {customer_data[i,1]:2.0f}/year   |      {final_clusters[i]+1}      |      {sklearn_clusters[i]+1}")

# Calculate inertia (within-cluster sum of squares)
inertia = kmeans_sklearn.inertia_
print(f"\\n📊 Model Quality:")
print(f\"Inertia (lower is better): {inertia:.2f}")
print(f"This measures how tight the clusters are!")

# Visualize results
plt.figure(figsize=(15, 5))

# Plot 1: Original data
plt.subplot(1, 3, 1)
plt.scatter(customer_data[:, 0], customer_data[:, 1], c='blue', s=100)
plt.title(\'Original Customer Data')
plt.xlabel('Annual Spending ($1000s)')
plt.ylabel('Purchase Frequency')

# Plot 2: Our implementation
plt.subplot(1, 3, 2)
colors = ['red', 'blue', 'green', 'orange', 'purple']
for i in range(3):
    cluster_points = customer_data[final_clusters == i]
    plt.scatter(cluster_points[:, 0], cluster_points[:, 1], 
               c=colors[i], s=100, label=f'Cluster {i+1}')
    plt.scatter(final_centroids[i, 0], final_centroids[i, 1], 
               c=colors[i], s=300, marker='x', linewidths=3)
plt.title('Our K-Means Implementation')
plt.xlabel('Annual Spending ($1000s)')
plt.ylabel('Purchase Frequency')
plt.legend()

# Plot 3: Scikit-learn results
plt.subplot(1, 3, 3)
for i in range(3):
    cluster_points = customer_data[sklearn_clusters == i]
    plt.scatter(cluster_points[:, 0], cluster_points[:, 1], 
               c=colors[i], s=100, label=f'Cluster {i+1}')
    plt.scatter(sklearn_centroids[i, 0], sklearn_centroids[i, 1], 
               c=colors[i], s=300, marker='x', linewidths=3)
plt.title('Scikit-Learn K-Means')
plt.xlabel('Annual Spending ($1000s)')
plt.ylabel('Purchase Frequency')
plt.legend()

plt.tight_layout()
plt.show()`}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-green-500/20 rounded border border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-2">🎉 Congratulations!</h4>
              <p className="text-gray-300 text-sm">
                You've successfully implemented K-Means clustering from scratch AND used the professional library! 
                You now understand both the theory and practice. This knowledge will help you with customer segmentation, 
                market research, and many other clustering problems! 🚀
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function KMeansAlgorithm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/unsupervised" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Unsupervised Learning
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">K-Means Deep Dive 🚀</p>
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
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-sm px-4 py-2"
              >
                👥 K-Means Clustering
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white text-sm px-4 py-2">
                📊 Unsupervised Learning
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30 text-sm px-4 py-2">
                👶 Beginner Friendly
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">👥 K-Means Clustering Explained</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Learn how to <strong>automatically group customers</strong> into segments using K-Means clustering!
              Perfect for market research, customer analysis, and finding hidden patterns in data. We'll show you every
              step with beautiful animations! 🎬
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="text-white font-semibold mb-2">Animated Learning</h3>
                <p className="text-gray-300 text-sm">Watch clusters form step-by-step</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-white font-semibold mb-2">Customer Segmentation</h3>
                <p className="text-gray-300 text-sm">Real business applications</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🛠️</div>
                <h3 className="text-white font-semibold mb-2">Build from Scratch</h3>
                <p className="text-gray-300 text-sm">Understand every line of code</p>
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
                  <Brain className="w-4 h-4 mr-2" />🧮 Math Explained
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-white/10 text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />💻 Code Implementation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="animation">
                <AnimatedKMeansVisualization />
              </TabsContent>

              <TabsContent value="math">
                <KMeansMathExplanation />
              </TabsContent>

              <TabsContent value="code">
                <KMeansCodeImplementation />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
