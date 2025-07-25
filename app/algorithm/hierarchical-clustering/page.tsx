"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, BookOpen, Brain, TreePine } from "lucide-react"

// Animated Hierarchical Clustering Visualization
const AnimatedHierarchicalVisualization = () => {
  const [linkage, setLinkage] = useState(["single"])
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState([50])

  // Sample data points
  const [dataPoints] = useState([
    { id: 0, x: 2, y: 3, cluster: 0, name: "Customer A" },
    { id: 1, x: 3, y: 2, cluster: 1, name: "Customer B" },
    { id: 2, x: 2.5, y: 2.5, cluster: 2, name: "Customer C" },
    { id: 3, x: 8, y: 8, cluster: 3, name: "Customer D" },
    { id: 4, x: 9, y: 7, cluster: 4, name: "Customer E" },
    { id: 5, x: 8.5, y: 8.5, cluster: 5, name: "Customer F" },
    { id: 6, x: 1, y: 8, cluster: 6, name: "Customer G" },
    { id: 7, x: 2, y: 9, cluster: 7, name: "Customer H" },
  ])

  const [clusters, setClusters] = useState([[0], [1], [2], [3], [4], [5], [6], [7]])
  const [mergeHistory, setMergeHistory] = useState([])
  const [currentMerge, setCurrentMerge] = useState(null)

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

  // Calculate distance between points
  const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  // Calculate cluster distance based on linkage
  const calculateClusterDistance = (cluster1, cluster2, linkageType) => {
    const distances = []

    cluster1.forEach((id1) => {
      cluster2.forEach((id2) => {
        const p1 = dataPoints.find((p) => p.id === id1)
        const p2 = dataPoints.find((p) => p.id === id2)
        distances.push(calculateDistance(p1, p2))
      })
    })

    switch (linkageType) {
      case "single":
        return Math.min(...distances)
      case "complete":
        return Math.max(...distances)
      case "average":
        return distances.reduce((a, b) => a + b, 0) / distances.length
      default:
        return Math.min(...distances)
    }
  }

  // Animation logic
  useEffect(() => {
    if (isRunning && step < clusters.length - 1) {
      const timer = setTimeout(() => {
        // Find closest clusters
        let minDistance = Number.POSITIVE_INFINITY
        let mergeIndices = [-1, -1]

        for (let i = 0; i < clusters.length; i++) {
          for (let j = i + 1; j < clusters.length; j++) {
            const distance = calculateClusterDistance(clusters[i], clusters[j], linkage[0])
            if (distance < minDistance) {
              minDistance = distance
              mergeIndices = [i, j]
            }
          }
        }

        if (mergeIndices[0] !== -1) {
          setCurrentMerge({ indices: mergeIndices, distance: minDistance })

          setTimeout(() => {
            const newClusters = [...clusters]
            const merged = [...newClusters[mergeIndices[0]], ...newClusters[mergeIndices[1]]]
            newClusters.splice(mergeIndices[1], 1)
            newClusters.splice(mergeIndices[0], 1)
            newClusters.push(merged)

            setClusters(newClusters)
            setMergeHistory((prev) => [
              ...prev,
              {
                step: step + 1,
                merged: mergeIndices,
                distance: minDistance,
                clusters: merged,
              },
            ])
            setStep((prev) => prev + 1)
            setCurrentMerge(null)
          }, 1000)
        }
      }, animationSpeed[0] * 20)

      return () => clearTimeout(timer)
    } else if (step >= clusters.length - 1) {
      setIsRunning(false)
    }
  }, [isRunning, step, clusters, linkage, animationSpeed])

  const resetAnimation = () => {
    setIsRunning(false)
    setStep(0)
    setClusters([[0], [1], [2], [3], [4], [5], [6], [7]])
    setMergeHistory([])
    setCurrentMerge(null)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TreePine className="w-5 h-5 mr-2" />🌳 Hierarchical Clustering: Build the Dendrogram!
          </CardTitle>
          <CardDescription className="text-gray-300">
            Watch how customers are grouped into a tree structure step by step! 🎬
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Linkage Method</label>
              <select
                value={linkage[0]}
                onChange={(e) => setLinkage([e.target.value])}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
              >
                <option value="single">Single (Minimum)</option>
                <option value="complete">Complete (Maximum)</option>
                <option value="average">Average</option>
              </select>
              <p className="text-xs text-gray-400">How to measure distance between clusters</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Animation Speed: {animationSpeed[0]}%</label>
              <Slider value={animationSpeed} onValueChange={setAnimationSpeed} max={100} min={10} step={10} />
            </div>

            <div className="flex items-end space-x-2">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
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

          {/* Current Step Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                🔄 Step {step + 1}: {clusters.length} Clusters Remaining
              </h3>
              <div className="text-sm text-gray-300">
                Linkage: {linkage[0].charAt(0).toUpperCase() + linkage[0].slice(1)}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {step === 0 && "Starting with each customer as their own cluster. We'll merge the closest ones!"}
              {step > 0 &&
                step < 7 &&
                `Finding the closest pair of clusters using ${linkage[0]} linkage and merging them.`}
              {step >= 7 && "All customers are now in one big cluster! The hierarchy is complete."}
            </p>

            {currentMerge && (
              <div className="mt-4 p-3 bg-yellow-500/20 rounded border border-yellow-500/30">
                <p className="text-yellow-400 text-sm">
                  🔄 Merging clusters with distance: {currentMerge.distance.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scatter Plot */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">📊 Customer Clusters</h4>

              <svg viewBox="0 0 400 300" className="w-full h-64">
                {/* Grid */}
                <defs>
                  <pattern id="hierarchical-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#hierarchical-grid)" />

                {/* Connection lines between clusters being merged */}
                {currentMerge && (
                  <>
                    {clusters[currentMerge.indices[0]].forEach((id1) => {
                      clusters[currentMerge.indices[1]].forEach((id2) => {
                        const p1 = dataPoints.find((p) => p.id === id1)
                        const p2 = dataPoints.find((p) => p.id === id2)
                        return (
                          <line
                            key={`merge-${id1}-${id2}`}
                            x1={p1.x * 35 + 50}
                            y1={250 - p1.y * 25}
                            x2={p2.x * 35 + 50}
                            y2={250 - p2.y * 25}
                            stroke="#fbbf24"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            opacity="0.8"
                          />
                        )
                      })
                    })}
                  </>
                )}

                {/* Data Points */}
                {dataPoints.map((point, index) => {
                  const clusterIndex = clusters.findIndex((cluster) => cluster.includes(point.id))
                  const color = clusterIndex !== -1 ? colors[clusterIndex % colors.length] : "#666"

                  return (
                    <g key={point.id}>
                      <circle
                        cx={point.x * 35 + 50}
                        cy={250 - point.y * 25}
                        r="8"
                        fill={color}
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.9"
                      />
                      <text
                        x={point.x * 35 + 50}
                        y={250 - point.y * 25 + 3}
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                        fontWeight="bold"
                      >
                        {point.id + 1}
                      </text>
                    </g>
                  )
                })}

                {/* Axes */}
                <line x1="50" y1="250" x2="350" y2="250" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                <line x1="50" y1="250" x2="50" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

                <text x="200" y="280" textAnchor="middle" fill="white" fontSize="12">
                  Annual Spending ($1000s)
                </text>
                <text x="25" y="150" textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90 25 150)">
                  Purchase Frequency
                </text>
              </svg>
            </div>

            {/* Dendrogram */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">🌳 Dendrogram (Tree Structure)</h4>

              <svg viewBox="0 0 400 300" className="w-full h-64">
                {/* Leaf nodes */}
                {dataPoints.map((point, index) => (
                  <g key={`leaf-${point.id}`}>
                    <line x1={50 + index * 40} y1={250} x2={50 + index * 40} y2={230} stroke="white" strokeWidth="2" />
                    <circle
                      cx={50 + index * 40}
                      cy={240}
                      r="6"
                      fill={colors[index % colors.length]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x={50 + index * 40} y={270} textAnchor="middle" fill="white" fontSize="10">
                      {point.id + 1}
                    </text>
                  </g>
                ))}

                {/* Merge lines from history */}
                {mergeHistory.map((merge, index) => {
                  const height = 220 - index * 25
                  return (
                    <g key={`merge-${index}`}>
                      <line
                        x1={50 + merge.merged[0] * 40}
                        y1={height + 10}
                        x2={50 + merge.merged[1] * 40}
                        y2={height + 10}
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <line
                        x1={50 + merge.merged[0] * 40}
                        y1={height + 10}
                        x2={50 + merge.merged[0] * 40}
                        y2={height + 20}
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <line
                        x1={50 + merge.merged[1] * 40}
                        y1={height + 10}
                        x2={50 + merge.merged[1] * 40}
                        y2={height + 20}
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <text
                        x={50 + (merge.merged[0] + merge.merged[1]) * 20}
                        y={height}
                        textAnchor="middle"
                        fill="#10b981"
                        fontSize="10"
                      >
                        {merge.distance.toFixed(1)}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Merge History */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">📋 Merge History</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mergeHistory.length === 0 ? (
                <p className="text-gray-400 col-span-2">No merges yet. Click Start to begin!</p>
              ) : (
                mergeHistory.map((merge, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-green-400 font-semibold">Step {merge.step}</h5>
                      <span className="text-white text-sm">Distance: {merge.distance.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Merged clusters containing customers: {merge.clusters.map((id) => id + 1).join(", ")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mathematical Explanation Component
const HierarchicalMathExplanation = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const mathSteps = [
    {
      title: "📏 Distance Metrics: How Far Apart Are Clusters?",
      content: "The foundation of hierarchical clustering is measuring distances between data points and clusters.",
      formula: "d(xᵢ, xⱼ) = √[(x₁ᵢ - x₁ⱼ)² + (x₂ᵢ - x₂ⱼ)² + ... + (xₙᵢ - xₙⱼ)²]",
      explanation: "Euclidean distance between two points in n-dimensional space",
      intuition: "Like measuring the straight-line distance between two customers on a map of their spending habits!",
    },
    {
      title: "🔗 Linkage Criteria: How to Measure Cluster Distance",
      content: "Once we have point distances, we need to define distance between clusters containing multiple points.",
      formula: `Single: d(A,B) = min{d(a,b) : a∈A, b∈B}
Complete: d(A,B) = max{d(a,b) : a∈A, b∈B}  
Average: d(A,B) = (1/|A||B|)∑ₐ∈ₐ∑ᵦ∈ᵦd(a,b)`,
      explanation:
        "Single linkage uses minimum distance, complete uses maximum, average uses mean of all pairwise distances",
      intuition:
        "Single linkage creates loose clusters (chain effect), complete creates tight clusters, average is balanced!",
    },
    {
      title: "🌳 Agglomerative Algorithm: Bottom-Up Clustering",
      content: "Start with each point as its own cluster, then repeatedly merge the closest clusters.",
      formula: `1. Initialize: C = {{x₁}, {x₂}, ..., {xₙ}}
2. While |C| > 1:
   a. Find i,j = argmin d(Cᵢ, Cⱼ)
   b. Merge: C = C ∪ {Cᵢ ∪ Cⱼ} \\ {Cᵢ, Cⱼ}
   c. Record merge in dendrogram`,
      explanation: "Greedy algorithm that always merges the two closest clusters until only one remains",
      intuition:
        "Like building a family tree - start with individuals, group siblings, then families, then extended families!",
    },
    {
      title: "📊 Dendrogram Construction: Building the Tree",
      content: "The dendrogram records the order and distances of all merges, creating a hierarchical tree structure.",
      formula: `Height of merge = d(Cᵢ, Cⱼ)
Ultrametric property: d(x,y) ≤ max{d(x,z), d(z,y)}`,
      explanation: "Each merge is drawn at height equal to the distance between merged clusters",
      intuition: "The tree height shows how different clusters are - taller merges mean more different groups!",
    },
    {
      title: "✂️ Cutting the Dendrogram: Choosing Number of Clusters",
      content: "Cut the dendrogram at different heights to get different numbers of clusters.",
      formula: `k clusters = number of vertical lines crossed by horizontal cut
Optimal cut height = argmax{gap between consecutive merge distances}`,
      explanation: "A horizontal line through the dendrogram at height h creates clusters",
      intuition: "Like cutting a family tree at different generations - higher cuts give fewer, broader groups!",
    },
    {
      title: "⚡ Computational Complexity: Time and Space Analysis",
      content: "Understanding the computational cost of hierarchical clustering for large datasets.",
      formula: `Time: O(n³) for naive implementation
Space: O(n²) for distance matrix
Optimized: O(n²log n) with priority queues`,
      explanation: "Cubic time due to n-1 merges, each requiring O(n²) distance calculations",
      intuition: "Gets expensive quickly! For 1000 customers, that's ~1 billion operations. Use wisely!",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />🧮 Hierarchical Clustering Mathematics
          </CardTitle>
          <CardDescription className="text-gray-300">
            Master the mathematical foundations of hierarchical clustering! 🎓
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
              <pre className="text-center text-sm font-mono text-purple-400 whitespace-pre-wrap">
                {mathSteps[currentStep].formula}
              </pre>
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
        </CardContent>
      </Card>
    </div>
  )
}

// Code Implementation Component
const HierarchicalCodeImplementation = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            💻 Hierarchical Clustering Implementation
          </CardTitle>
          <CardDescription className="text-gray-300">
            Build hierarchical clustering from scratch with detailed explanations! 🛠️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Step 1: Distance Calculations */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">📏 Step 1: Distance Calculations</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-3">Euclidean Distance Function</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
}

// Example: Customer data [spending, frequency]
const customers = [
    [15, 12],  // Customer 1: $15k, 12 purchases/year
    [45, 24],  // Customer 2: $45k, 24 purchases/year
    [8, 6],    // Customer 3: $8k, 6 purchases/year
    [32, 18],  // Customer 4: $32k, 18 purchases/year
];

// Calculate distance between Customer 1 and Customer 2
const distance = euclideanDistance(customers[0], customers[1]);
console.log(\`Distance between Customer 1 and 2: \${distance.toFixed(2)}\`);

// Create distance matrix for all pairs
function createDistanceMatrix(data) {
    const n = data.length;
    const matrix = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i
