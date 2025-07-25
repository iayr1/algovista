"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, RotateCcw, BookOpen, Code, Lightbulb, TrendingUp, Brain } from "lucide-react"

// Linear Regression Visualization Component
const LinearRegressionViz = () => {
  const [slope, setSlope] = useState([1])
  const [intercept, setIntercept] = useState([0])
  const [showPrediction, setShowPrediction] = useState(false)

  // Sample data points
  const dataPoints = [
    { x: 1, y: 2.1 },
    { x: 2, y: 3.9 },
    { x: 3, y: 6.2 },
    { x: 4, y: 7.8 },
    { x: 5, y: 10.1 },
    { x: 6, y: 11.9 },
  ]

  const predictedY = (x: number) => slope[0] * x + intercept[0]

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Interactive Linear Regression</h3>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Slope (m): {slope[0].toFixed(2)}</label>
            <Slider value={slope} onValueChange={setSlope} max={3} min={-1} step={0.1} className="w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Intercept (b): {intercept[0].toFixed(2)}</label>
            <Slider value={intercept} onValueChange={setIntercept} max={5} min={-5} step={0.1} className="w-full" />
          </div>
        </div>

        {/* Visualization */}
        <div className="relative bg-gray-900/50 rounded-lg p-4 h-80">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)" />

            {/* Axes */}
            <line x1="40" y1="260" x2="360" y2="260" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <line x1="40" y1="260" x2="40" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

            {/* Data points */}
            {dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={40 + point.x * 50}
                cy={260 - point.y * 20}
                r="4"
                fill="#3b82f6"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            ))}

            {/* Regression line */}
            <line
              x1="40"
              y1={260 - predictedY(0) * 20}
              x2="340"
              y2={260 - predictedY(6) * 20}
              stroke="#ef4444"
              strokeWidth="3"
              opacity="0.8"
            />

            {/* Prediction lines */}
            {showPrediction &&
              dataPoints.map((point, index) => (
                <line
                  key={index}
                  x1={40 + point.x * 50}
                  y1={260 - point.y * 20}
                  x2={40 + point.x * 50}
                  y2={260 - predictedY(point.x) * 20}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.7"
                />
              ))}
          </svg>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-300">
            <p>
              Equation: y = {slope[0].toFixed(2)}x + {intercept[0].toFixed(2)}
            </p>
          </div>
          <Button
            onClick={() => setShowPrediction(!showPrediction)}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {showPrediction ? "Hide" : "Show"} Residuals
          </Button>
        </div>
      </div>
    </div>
  )
}

// K-Means Visualization Component
const KMeansViz = () => {
  const [k, setK] = useState([3])
  const [isRunning, setIsRunning] = useState(false)
  const [iteration, setIteration] = useState(0)

  // Sample data points
  const dataPoints = [
    { x: 2, y: 3, cluster: 0 },
    { x: 3, y: 2, cluster: 0 },
    { x: 2.5, y: 2.5, cluster: 0 },
    { x: 8, y: 8, cluster: 1 },
    { x: 9, y: 7, cluster: 1 },
    { x: 8.5, y: 8.5, cluster: 1 },
    { x: 1, y: 8, cluster: 2 },
    { x: 2, y: 9, cluster: 2 },
    { x: 1.5, y: 8.5, cluster: 2 },
    { x: 7, y: 2, cluster: 0 },
    { x: 8, y: 1, cluster: 0 },
    { x: 7.5, y: 1.5, cluster: 0 },
  ]

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]
  const centroids = [
    { x: 3, y: 2.5 },
    { x: 8.5, y: 7.5 },
    { x: 1.5, y: 8.5 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Interactive K-Means Clustering</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Number of Clusters (k): {k[0]}</label>
            <Slider value={k} onValueChange={setK} max={5} min={2} step={1} className="w-full" />
          </div>
          <div className="flex items-end space-x-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? "Pause" : "Start"} Algorithm
            </Button>
            <Button
              onClick={() => setIteration(0)}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative bg-gray-900/50 rounded-lg p-4 h-80">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Grid */}
            <defs>
              <pattern id="kmeans-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#kmeans-grid)" />

            {/* Data points */}
            {dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x * 40}
                cy={point.y * 30}
                r="6"
                fill={colors[point.cluster % k[0]]}
                stroke="white"
                strokeWidth="2"
                opacity="0.8"
              />
            ))}

            {/* Centroids */}
            {centroids.slice(0, k[0]).map((centroid, index) => (
              <g key={index}>
                <circle
                  cx={centroid.x * 40}
                  cy={centroid.y * 30}
                  r="8"
                  fill={colors[index]}
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx={centroid.x * 40} cy={centroid.y * 30} r="3" fill="white" />
              </g>
            ))}
          </svg>
        </div>

        <div className="text-sm text-gray-300 mt-4">
          <p>
            Iteration: {iteration} | Algorithm: {isRunning ? "Running" : "Stopped"}
          </p>
          <p className="mt-1">Large circles with white centers are cluster centroids</p>
        </div>
      </div>
    </div>
  )
}

const algorithmData = {
  "linear-regression": {
    name: "Linear Regression",
    category: "Supervised Learning",
    type: "Regression",
    difficulty: "Beginner",
    description:
      "Linear regression finds the best straight line through data points to predict continuous values. It assumes a linear relationship between input features and the target variable.",

    definition:
      "A statistical method that models the relationship between a dependent variable and independent variables by fitting a linear equation to observed data.",

    mathematics: {
      equation: "y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε",
      costFunction: "MSE = (1/n) Σ(yᵢ - ŷᵢ)²",
      optimization: "Normal Equation: β = (XᵀX)⁻¹Xᵀy",
    },

    keyPoints: [
      "Assumes linear relationship between variables",
      "Minimizes sum of squared residuals",
      "Simple and highly interpretable",
      "Sensitive to outliers",
      "Requires feature scaling for multiple variables",
    ],

    useCases: [
      "Predicting house prices based on size, location",
      "Sales forecasting using historical data",
      "Medical dosage prediction",
      "Economic modeling and analysis",
    ],

    implementation: `
# Linear Regression Implementation
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict([[6], [7]])
print(f"Predictions: {predictions}")
print(f"Slope: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
    `,

    visualization: LinearRegressionViz,
  },

  "k-means": {
    name: "K-Means Clustering",
    category: "Unsupervised Learning",
    type: "Clustering",
    difficulty: "Beginner",
    description:
      "K-Means groups data into k clusters by iteratively assigning points to the nearest centroid and updating centroid positions.",

    definition:
      "An unsupervised learning algorithm that partitions data into k clusters where each observation belongs to the cluster with the nearest mean (centroid).",

    mathematics: {
      objective: "Minimize: Σᵢ Σₓ∈Cᵢ ||x - μᵢ||²",
      algorithm:
        "1. Initialize k centroids randomly\n2. Assign points to nearest centroid\n3. Update centroids\n4. Repeat until convergence",
      distance: "Euclidean Distance: d(x,y) = √Σ(xᵢ - yᵢ)²",
    },

    keyPoints: [
      "Need to specify number of clusters (k) beforehand",
      "Sensitive to initial centroid placement",
      "Works well with spherical, similar-sized clusters",
      "Computationally efficient O(nkt)",
      "Can get stuck in local minima",
    ],

    useCases: [
      "Customer segmentation for marketing",
      "Image compression and color quantization",
      "Market research and analysis",
      "Gene sequencing and bioinformatics",
    ],

    implementation: `
# K-Means Implementation
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Sample data
X = np.array([[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]])

# Create and fit model
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(X)

# Get cluster labels and centroids
labels = kmeans.labels_
centroids = kmeans.cluster_centers_

print(f"Cluster labels: {labels}")
print(f"Centroids: {centroids}")
    `,

    visualization: KMeansViz,
  },
}

export default function AlgorithmPage() {
  const params = useParams()
  const algorithmId = params.id as string
  const algorithm = algorithmData[algorithmId as keyof typeof algorithmData]

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Algorithm Not Found</h1>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const VisualizationComponent = algorithm.visualization

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">Algorithm Deep Dive</p>
            </div>
          </div>
        </div>
      </header>

      {/* Algorithm Header */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                {algorithm.category}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                {algorithm.type}
              </Badge>
              <Badge
                variant="outline"
                className={`border-white/20 ${
                  algorithm.difficulty === "Beginner"
                    ? "text-green-400 border-green-400/30"
                    : algorithm.difficulty === "Intermediate"
                      ? "text-yellow-400 border-yellow-400/30"
                      : "text-red-400 border-red-400/30"
                }`}
              >
                {algorithm.difficulty}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{algorithm.name}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{algorithm.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="visualization" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="visualization" className="data-[state=active]:bg-white/10">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Visualization
                </TabsTrigger>
                <TabsTrigger value="definition" className="data-[state=active]:bg-white/10">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Definition
                </TabsTrigger>
                <TabsTrigger value="mathematics" className="data-[state=active]:bg-white/10">
                  <Brain className="w-4 h-4 mr-2" />
                  Mathematics
                </TabsTrigger>
                <TabsTrigger value="implementation" className="data-[state=active]:bg-white/10">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="use-cases" className="data-[state=active]:bg-white/10">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Use Cases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visualization" className="space-y-6">
                <VisualizationComponent />
              </TabsContent>

              <TabsContent value="definition" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      What is {algorithm.name}?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-lg leading-relaxed">{algorithm.definition}</p>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Key Characteristics:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {algorithm.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mathematics" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Mathematical Foundation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(algorithm.mathematics).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="text-white font-semibold capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                          <code className="text-cyan-400 font-mono text-sm whitespace-pre-line">{value}</code>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="implementation" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Implementation Example
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Python implementation using scikit-learn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-gray-300">{algorithm.implementation.trim()}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="use-cases" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Real-World Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {algorithm.useCases.map((useCase, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <p className="text-gray-300">{useCase}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
