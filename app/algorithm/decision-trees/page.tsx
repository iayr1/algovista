"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, RotateCcw, BookOpen, Brain, TreePine } from "lucide-react"

// Animated Decision Tree Visualization
const AnimatedDecisionTree = () => {
  const [maxDepth, setMaxDepth] = useState([3])
  const [animationStep, setAnimationStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"building" | "predicting" | "pruning">("building")

  // Sample loan approval data
  const loanData = [
    { income: 30, creditScore: 600, age: 25, approved: false, id: 1 },
    { income: 50, creditScore: 700, age: 35, approved: true, id: 2 },
    { income: 80, creditScore: 750, age: 45, approved: true, id: 3 },
    { income: 25, creditScore: 550, age: 22, approved: false, id: 4 },
    { income: 60, creditScore: 680, age: 40, approved: true, id: 5 },
    { income: 40, creditScore: 620, age: 30, approved: false, id: 6 },
    { income: 90, creditScore: 800, age: 50, approved: true, id: 7 },
    { income: 35, creditScore: 580, age: 28, approved: false, id: 8 },
  ]

  // Decision tree structure
  const treeStructure = {
    feature: "creditScore",
    threshold: 650,
    left: {
      feature: "income",
      threshold: 40,
      left: { prediction: "Reject", confidence: 0.9, samples: 3 },
      right: { prediction: "Approve", confidence: 0.7, samples: 2 },
    },
    right: {
      feature: "age",
      threshold: 40,
      left: { prediction: "Approve", confidence: 0.8, samples: 2 },
      right: { prediction: "Approve", confidence: 0.95, samples: 1 },
    },
  }

  // Animation logic
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 300)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Calculate Gini impurity
  const calculateGini = (data: any[]) => {
    if (data.length === 0) return 0
    const approved = data.filter((d) => d.approved).length
    const rejected = data.length - approved
    const pApproved = approved / data.length
    const pRejected = rejected / data.length
    return 1 - (pApproved * pApproved + pRejected * pRejected)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TreePine className="w-5 h-5 mr-2" />🌳 Decision Tree: Loan Approval System
          </CardTitle>
          <CardDescription className="text-gray-300">
            Watch how decision trees make decisions by asking yes/no questions! 🎬
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phase Explanation */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                {currentPhase === "building" && "🏗️ Building the Decision Tree"}
                {currentPhase === "predicting" && "🔮 Making Predictions"}
                {currentPhase === "pruning" && "✂️ Pruning to Prevent Overfitting"}
              </h3>
              <div className="flex space-x-2">
                {["building", "predicting", "pruning"].map((phase) => (
                  <Button
                    key={phase}
                    variant={currentPhase === phase ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPhase(phase as any)}
                    className="text-xs"
                  >
                    {phase === "building" && "🏗️"}
                    {phase === "predicting" && "🔮"}
                    {phase === "pruning" && "✂️"}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {currentPhase === "building" &&
                "The tree grows by finding the best questions to ask at each step. We use Gini impurity to measure how 'mixed' our data is."}
              {currentPhase === "predicting" &&
                "To make a prediction, we follow the path down the tree by answering yes/no questions until we reach a leaf node."}
              {currentPhase === "pruning" &&
                "We remove branches that don't improve performance to prevent the tree from memorizing the training data."}
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Max Tree Depth: {maxDepth[0]}</label>
              <Slider value={maxDepth} onValueChange={setMaxDepth} max={5} min={1} step={1} />
              <p className="text-xs text-gray-400">
                🌳 <strong>Deeper trees</strong> = more complex decisions, but risk overfitting
              </p>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Animate"} Tree Building
              </Button>
              <Button
                onClick={() => setAnimationStep(0)}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Animated Tree Visualization */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold">🌳 Interactive Decision Tree</h4>
              <div className="text-sm text-gray-300">Gini Impurity: {calculateGini(loanData).toFixed(3)}</div>
            </div>

            <svg viewBox="0 0 800 500" className="w-full h-96">
              {/* Tree Structure */}

              {/* Root Node */}
              <g>
                <rect
                  x="350"
                  y="50"
                  width="100"
                  height="60"
                  rx="10"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                  opacity={animationStep > 20 ? 1 : 0}
                />
                <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Credit Score
                </text>
                <text x="400" y="90" textAnchor="middle" fill="white" fontSize="10">
                  ≥ 650?
                </text>
                <text x="400" y="105" textAnchor="middle" fill="#fbbf24" fontSize="8">
                  Gini: 0.469
                </text>
              </g>

              {/* Left Branch (Credit Score < 650) */}
              <g opacity={animationStep > 60 ? 1 : 0}>
                <line x1="375" y1="110" x2="250" y2="180" stroke="white" strokeWidth="2" />
                <text x="300" y="140" fill="#ef4444" fontSize="10" fontWeight="bold">
                  No
                </text>

                <rect x="200" y="180" width="100" height="60" rx="10" fill="#ef4444" stroke="white" strokeWidth="2" />
                <text x="250" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Income
                </text>
                <text x="250" y="220" textAnchor="middle" fill="white" fontSize="10">
                  ≥ $40k?
                </text>
                <text x="250" y="235" textAnchor="middle" fill="#fbbf24" fontSize="8">
                  Gini: 0.444
                </text>
              </g>

              {/* Right Branch (Credit Score ≥ 650) */}
              <g opacity={animationStep > 60 ? 1 : 0}>
                <line x1="425" y1="110" x2="550" y2="180" stroke="white" strokeWidth="2" />
                <text x="500" y="140" fill="#10b981" fontSize="10" fontWeight="bold">
                  Yes
                </text>

                <rect x="500" y="180" width="100" height="60" rx="10" fill="#10b981" stroke="white" strokeWidth="2" />
                <text x="550" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Age
                </text>
                <text x="550" y="220" textAnchor="middle" fill="white" fontSize="10">
                  ≥ 40?
                </text>
                <text x="550" y="235" textAnchor="middle" fill="#fbbf24" fontSize="8">
                  Gini: 0.222
                </text>
              </g>

              {/* Leaf Nodes */}
              <g opacity={animationStep > 100 ? 1 : 0}>
                {/* Low Credit, Low Income */}
                <line x1="225" y1="240" x2="150" y2="320" stroke="white" strokeWidth="2" />
                <text x="180" y="275" fill="#ef4444" fontSize="9">
                  No
                </text>
                <ellipse cx="150" cy="340" rx="60" ry="30" fill="#ef4444" stroke="white" strokeWidth="2" />
                <text x="150" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  REJECT
                </text>
                <text x="150" y="350" textAnchor="middle" fill="white" fontSize="8">
                  90% confidence
                </text>

                {/* Low Credit, High Income */}
                <line x1="275" y1="240" x2="350" y2="320" stroke="white" strokeWidth="2" />
                <text x="320" y="275" fill="#10b981" fontSize="9">
                  Yes
                </text>
                <ellipse cx="350" cy="340" rx="60" ry="30" fill="#f59e0b" stroke="white" strokeWidth="2" />
                <text x="350" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  APPROVE
                </text>
                <text x="350" y="350" textAnchor="middle" fill="white" fontSize="8">
                  70% confidence
                </text>

                {/* High Credit, Young */}
                <line x1="525" y1="240" x2="450" y2="320" stroke="white" strokeWidth="2" />
                <text x="480" y="275" fill="#ef4444" fontSize="9">
                  No
                </text>
                <ellipse cx="450" cy="340" rx="60" ry="30" fill="#10b981" stroke="white" strokeWidth="2" />
                <text x="450" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  APPROVE
                </text>
                <text x="450" y="350" textAnchor="middle" fill="white" fontSize="8">
                  80% confidence
                </text>

                {/* High Credit, Old */}
                <line x1="575" y1="240" x2="650" y2="320" stroke="white" strokeWidth="2" />
                <text x="620" y="275" fill="#10b981" fontSize="9">
                  Yes
                </text>
                <ellipse cx="650" cy="340" rx="60" ry="30" fill="#10b981" stroke="white" strokeWidth="2" />
                <text x="650" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  APPROVE
                </text>
                <text x="650" y="350" textAnchor="middle" fill="white" fontSize="8">
                  95% confidence
                </text>
              </g>

              {/* Sample Data Points Animation */}
              {currentPhase === "predicting" && (
                <g>
                  {loanData.slice(0, Math.floor(animationStep / 30)).map((loan, index) => {
                    const x = 50 + (index % 4) * 180
                    const y = 420 + Math.floor(index / 4) * 30

                    return (
                      <g key={loan.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill={loan.approved ? "#10b981" : "#ef4444"}
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <text x={x + 15} y={y + 5} fill="white" fontSize="10">
                          ${loan.income}k, {loan.creditScore}, {loan.age}y → {loan.approved ? "✅" : "❌"}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )}

              {/* Decision Path Animation */}
              {currentPhase === "predicting" && animationStep > 50 && (
                <g>
                  <path
                    d="M 400,110 L 550,180 L 450,320"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="4"
                    strokeDasharray="10,5"
                    opacity={Math.sin(animationStep * 0.1) * 0.5 + 0.5}
                  />
                  <text x="420" y="400" fill="#fbbf24" fontSize="12" fontWeight="bold">
                    Example: Credit=700, Age=35 → APPROVE
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Gini Impurity Explanation */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">🧮 Understanding Gini Impurity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-purple-400 font-semibold">📐 Gini Formula:</h5>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/30">
                  <p className="text-center text-lg font-mono text-purple-400 mb-2">Gini = 1 - Σ(pᵢ)²</p>
                  <p className="text-center text-sm text-gray-300">where pᵢ is the probability of class i</p>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong>Gini = 0:</strong> Pure node (all same class)
                  </p>
                  <p>
                    <strong>Gini = 0.5:</strong> Maximum impurity (50/50 split)
                  </p>
                  <p>
                    <strong>Lower Gini:</strong> Better split quality
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-green-400 font-semibold">🎯 Example Calculation:</h5>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-green-500/30">
                  <p className="text-sm text-gray-300">
                    <strong>Root Node:</strong> 3 approved, 5 rejected
                    <br />
                    p(approve) = 3/8 = 0.375
                    <br />
                    p(reject) = 5/8 = 0.625
                    <br />
                    Gini = 1 - (0.375² + 0.625²) = <strong>0.469</strong>
                  </p>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                  <p className="text-blue-400 text-xs">
                    <strong>💡 Intuition:</strong> Gini measures "how mixed up" our data is. The algorithm tries to find
                    splits that create the purest possible groups!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Applications */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl p-6 border border-emerald-500/30">
            <h4 className="text-white font-semibold mb-4">🚀 Why Decision Trees Are Amazing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h5 className="text-emerald-400 font-semibold">Highly Interpretable</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Anyone can follow the decision path! Perfect for explaining AI decisions to non-technical
                  stakeholders.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h5 className="text-green-400 font-semibold">No Data Preprocessing</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Works with mixed data types, handles missing values, and doesn't need feature scaling. Very robust!
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <h5 className="text-teal-400 font-semibold">Fast Predictions</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Making predictions is just following a path down the tree. Very fast even with large trees!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mathematical Derivation Component
const DecisionTreeMath = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const mathSteps = [
    {
      title: "🤔 The Core Problem: How to Split Data?",
      content: "At each node, we need to find the best question to ask that separates our classes most effectively.",
      formula: "Find feature f and threshold t that maximizes information gain",
      explanation: "We want splits that create the 'purest' possible child nodes - groups with mostly one class",
      intuition: "Like sorting a mixed bag of apples and oranges - we want each group to be as uniform as possible!",
    },
    {
      title: "📊 Measuring Impurity: Gini Index",
      content: "Gini impurity measures how 'mixed up' our data is. Pure nodes (all same class) have Gini = 0.",
      formula: "Gini(S) = 1 - Σᵢ pᵢ²",
      explanation: "pᵢ is the proportion of samples belonging to class i. Sum over all classes in the node.",
      intuition:
        "Think of it as measuring 'chaos' - a room with all boys has no chaos, but a mixed room has high chaos!",
    },
    {
      title: "📈 Information Gain: The Splitting Criterion",
      content: "Information gain measures how much a split reduces impurity. We choose splits with maximum gain.",
      formula: "Gain(S,A) = Gini(S) - Σ (|Sᵥ|/|S|) × Gini(Sᵥ)",
      explanation: "Compare parent impurity with weighted average of child impurities. Higher gain = better split.",
      intuition:
        "Like measuring how much cleaner your room gets after organizing - bigger improvement = better organization method!",
    },
    {
      title: "🌳 Recursive Tree Building Algorithm",
      content: "We recursively apply the splitting process to build the entire tree from top to bottom.",
      formula: "BuildTree(S): if pure(S) return leaf, else find best split and recurse",
      explanation: "Keep splitting until nodes are pure, have minimum samples, or reach maximum depth",
      intuition: "Like playing 20 questions - keep asking the best questions until you can guess the answer!",
    },
    {
      title: "✂️ Pruning: Preventing Overfitting",
      content: "Remove branches that don't improve validation performance to prevent memorizing training data.",
      formula: "Prune if validation_accuracy(pruned) ≥ validation_accuracy(unpruned)",
      explanation: "Post-pruning: build full tree, then remove branches that hurt generalization",
      intuition: "Like editing an essay - remove unnecessary details that don't help the main message!",
    },
    {
      title: "🎯 Alternative Splitting Criteria",
      content: "Besides Gini, we can use entropy (information theory) or classification error as splitting criteria.",
      formula: "Entropy(S) = -Σᵢ pᵢ log₂(pᵢ), Error(S) = 1 - max(pᵢ)",
      explanation:
        "Entropy measures information content, error rate is simpler but less sensitive to probability changes",
      intuition: "Different ways to measure 'messiness' - like using different cleaning standards for your room!",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />🧠 Decision Tree Mathematics (Step by Step!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Understanding the elegant math behind decision trees! 🎓
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
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-white font-semibold text-lg mb-4">{mathSteps[currentStep].title}</h3>

            <p className="text-gray-300 leading-relaxed mb-4">{mathSteps[currentStep].content}</p>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10 mb-4">
              <p className="text-center text-lg font-mono text-green-400">{mathSteps[currentStep].formula}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <h4 className="text-blue-400 font-semibold mb-2">📚 Mathematical Explanation:</h4>
                <p className="text-gray-300 text-sm">{mathSteps[currentStep].explanation}</p>
              </div>

              <div className="bg-emerald-500/20 rounded-lg p-4 border border-emerald-500/30">
                <h4 className="text-emerald-400 font-semibold mb-2">💡 Intuitive Understanding:</h4>
                <p className="text-gray-300 text-sm">{mathSteps[currentStep].intuition}</p>
              </div>
            </div>
          </div>

          {/* Interactive Gini Calculation */}
          {currentStep === 1 && (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">🧮 Interactive Gini Calculation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-purple-400 font-semibold">📊 Sample Scenarios:</h5>
                  <div className="space-y-3">
                    {[
                      { approved: 10, rejected: 0, scenario: "All Approved" },
                      { approved: 5, rejected: 5, scenario: "50/50 Split" },
                      { approved: 8, rejected: 2, scenario: "Mostly Approved" },
                      { approved: 1, rejected: 9, scenario: "Mostly Rejected" },
                    ].map((data, index) => {
                      const total = data.approved + data.rejected
                      const pApproved = data.approved / total
                      const pRejected = data.rejected / total
                      const gini = 1 - (pApproved * pApproved + pRejected * pRejected)

                      return (
                        <div key={index} className="bg-gray-900/50 rounded-lg p-3 border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-semibold text-sm">{data.scenario}</span>
                            <span className="text-green-400 font-bold">Gini: {gini.toFixed(3)}</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            {data.approved} approved, {data.rejected} rejected
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${pApproved * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-green-400 font-semibold">🎯 Gini Interpretation:</h5>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                    <svg viewBox="0 0 300 200" className="w-full h-48">
                      {/* Gini curve */}
                      <path
                        d={`M 50,150 ${Array.from({ length: 100 }, (_, i) => {
                          const p = i / 100
                          const gini = 2 * p * (1 - p) // Gini for binary classification
                          const x = 50 + p * 200
                          const y = 150 - gini * 200
                          return `L ${x},${y}`
                        }).join(" ")}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />

                      {/* Axes */}
                      <line x1="50" y1="150" x2="250" y2="150" stroke="white" strokeWidth="1" />
                      <line x1="50" y1="150" x2="50" y2="50" stroke="white" strokeWidth="1" />

                      {/* Labels */}
                      <text x="150" y="170" textAnchor="middle" fill="white" fontSize="12">
                        Probability of Class 1
                      </text>
                      <text
                        x="30"
                        y="100"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        transform="rotate(-90 30 100)"
                      >
                        Gini
                      </text>

                      {/* Key points */}
                      <circle cx="50" cy="150" r="3" fill="#ef4444" />
                      <text x="55" y="165" fill="#ef4444" fontSize="10">
                        Pure (0)
                      </text>

                      <circle cx="150" cy="50" r="3" fill="#fbbf24" />
                      <text x="155" y="45" fill="#fbbf24" fontSize="10">
                        Max (0.5)
                      </text>

                      <circle cx="250" cy="150" r="3" fill="#ef4444" />
                      <text x="205" y="165" fill="#ef4444" fontSize="10">
                        Pure (1)
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
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
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
              <h4 className="text-white font-semibold mb-4">🎉 You Now Master Decision Trees!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ Key Concepts Mastered:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• How to measure node impurity with Gini index</li>
                    <li>• Information gain for optimal splitting</li>
                    <li>• Recursive tree building algorithm</li>
                    <li>• Pruning techniques to prevent overfitting</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-emerald-400 font-semibold mb-2">🚀 Next Steps:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Try the interactive visualization above</li>
                    <li>• Experiment with different tree depths</li>
                    <li>• Learn about Random Forests (ensemble method)</li>
                    <li>• Apply to your own classification problems</li>
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
const DecisionTreeCode = () => {
  // JavaScript implementation of decision tree concepts
  const calculateGini = (labels: number[]) => {
    if (labels.length === 0) return 0
    const counts = labels.reduce(
      (acc, label) => {
        acc[label] = (acc[label] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    const total = labels.length
    let gini = 1
    for (const count of Object.values(counts)) {
      const probability = count / total
      gini -= probability * probability
    }
    return gini
  }

  const calculateInformationGain = (parentLabels: number[], leftLabels: number[], rightLabels: number[]) => {
    const parentGini = calculateGini(parentLabels)
    const leftGini = calculateGini(leftLabels)
    const rightGini = calculateGini(rightLabels)

    const total = parentLabels.length
    const leftWeight = leftLabels.length / total
    const rightWeight = rightLabels.length / total

    return parentGini - (leftWeight * leftGini + rightWeight * rightGini)
  }

  // Sample loan data
  const loanData = [
    { income: 30, creditScore: 600, approved: 0 },
    { income: 50, creditScore: 700, approved: 1 },
    { income: 80, creditScore: 750, approved: 1 },
    { income: 25, creditScore: 550, approved: 0 },
    { income: 60, creditScore: 680, approved: 1 },
    { income: 40, creditScore: 620, approved: 0 },
    { income: 90, creditScore: 800, approved: 1 },
    { income: 35, creditScore: 580, approved: 0 },
  ]

  const labels = loanData.map((d) => d.approved)
  const rootGini = calculateGini(labels)

  // Example split on credit score >= 650
  const leftSplit = loanData.filter((d) => d.creditScore < 650).map((d) => d.approved)
  const rightSplit = loanData.filter((d) => d.creditScore >= 650).map((d) => d.approved)
  const informationGain = calculateInformationGain(labels, leftSplit, rightSplit)

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />💻 Decision Tree Implementation (From Scratch!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Build decision trees step by step with detailed explanations! 🛠️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Gini Impurity */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">📊 Step 1: Implement Gini Impurity</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-3">The Foundation of Decision Trees</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Calculate Gini impurity for a set of labels
const calculateGini = (labels) => {
    if (labels.length === 0) return 0;
    
    // Count occurrences of each class
    const counts = {};
    labels.forEach(label => {
        counts[label] = (counts[label] || 0) + 1;
    });
    
    // Calculate Gini: 1 - Σ(pi²)
    const total = labels.length;
    let gini = 1;
    
    for (const count of Object.values(counts)) {
        const probability = count / total;
        gini -= probability * probability;
    }
    
    return gini;
};

// Test with different scenarios
console.log("Gini Impurity Examples:");
console.log(\`Pure node [1,1,1,1]: \${calculateGini([1,1,1,1]).toFixed(3)}\`);        // 0.000
console.log(\`Mixed node [1,1,0,0]: \${calculateGini([1,1,0,0]).toFixed(3)}\`);        // 0.500
console.log(\`Mostly 1s [1,1,1,0]: \${calculateGini([1,1,1,0]).toFixed(3)}\`);        // 0.375
console.log(\`Mostly 0s [0,0,0,1]: \${calculateGini([0,0,0,1]).toFixed(3)}\`);        // 0.375

// Real loan data
const loanLabels = [0, 1, 1, 0, 1, 0, 1, 0];  // 0=reject, 1=approve
console.log(\`Loan data Gini: \${calculateGini(loanLabels).toFixed(3)}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-blue-500/20 rounded border border-blue-500/30">
                <p className="text-blue-400 text-sm">
                  <strong>💡 What's happening:</strong> Gini impurity measures how "mixed up" our classes are. 0 means
                  pure (all same class), 0.5 means maximum mixing (50/50 split for binary classification).
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-green-400 font-semibold mb-3">Information Gain Calculation</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Calculate information gain from a split
const calculateInformationGain = (parentLabels, leftLabels, rightLabels) => {
    const parentGini = calculateGini(parentLabels);
    const leftGini = calculateGini(leftLabels);
    const rightGini = calculateGini(rightLabels);
    
    // Weighted average of child impurities
    const total = parentLabels.length;
    const leftWeight = leftLabels.length / total;
    const rightWeight = rightLabels.length / total;
    
    const weightedChildGini = leftWeight * leftGini + rightWeight * rightGini;
    
    // Information gain = parent impurity - weighted child impurity
    return parentGini - weightedChildGini;
};

// Example: Split loan data on credit score >= 650
const loanData = [
    {income: 30, creditScore: 600, approved: 0},
    {income: 50, creditScore: 700, approved: 1},
    {income: 80, creditScore: 750, approved: 1},
    {income: 25, creditScore: 550, approved: 0},
    {income: 60, creditScore: 680, approved: 1},
    {income: 40, creditScore: 620, approved: 0},
    {income: 90, creditScore: 800, approved: 1},
    {income: 35, creditScore: 580, approved: 0}
];

const allLabels = loanData.map(d => d.approved);
const leftSplit = loanData.filter(d => d.creditScore < 650).map(d => d.approved);
const rightSplit = loanData.filter(d => d.creditScore >= 650).map(d => d.approved);

console.log(\`Parent Gini: \${calculateGini(allLabels).toFixed(3)}\`);
console.log(\`Left split (credit < 650): \${leftSplit} → Gini: \${calculateGini(leftSplit).toFixed(3)}\`);
console.log(\`Right split (credit >= 650): \${rightSplit} → Gini: \${calculateGini(rightSplit).toFixed(3)}\`);
console.log(\`Information Gain: \${calculateInformationGain(allLabels, leftSplit, rightSplit).toFixed(3)}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-green-500/20 rounded border border-green-500/30">
                <p className="text-green-400 text-sm">
                  <strong>💡 What's happening:</strong> Information gain measures how much a split reduces impurity.
                  Higher gain = better split. We choose the split with maximum information gain at each node.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Finding Best Splits */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🔍 Step 2: Find the Best Split</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-3">Exhaustive Split Search</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Find the best split for a dataset
const findBestSplit = (data, features) => {
    let bestGain = -1;
    let bestSplit = null;
    
    const parentLabels = data.map(d => d.approved);
    
    // Try each feature
    for (const feature of features) {
        // Get unique values for this feature (potential thresholds)
        const values = [...new Set(data.map(d => d[feature]))].sort((a, b) => a - b);
        
        // Try each threshold
        for (let i = 0; i < values.length - 1; i++) {
            const threshold = (values[i] + values[i + 1]) / 2;
            
            // Split data based on threshold
            const leftData = data.filter(d => d[feature] < threshold);
            const rightData = data.filter(d => d[feature] >= threshold);
            
            // Skip if split creates empty child
            if (leftData.length === 0 || rightData.length === 0) continue;
            
            const leftLabels = leftData.map(d => d.approved);
            const rightLabels = rightData.map(d => d.approved);
            
            // Calculate information gain
            const gain = calculateInformationGain(parentLabels, leftLabels, rightLabels);
            
            // Update best split if this is better
            if (gain > bestGain) {
                bestGain = gain;
                bestSplit = {
                    feature: feature,
                    threshold: threshold,
                    gain: gain,
                    leftSize: leftData.length,
                    rightSize: rightData.length
                };
            }
        }
    }
    
    return bestSplit;
};

// Find best split for our loan data
const features = ['income', 'creditScore'];
const bestSplit = findBestSplit(loanData, features);

console.log("Best Split Found:");
console.log(\`Feature: \${bestSplit.feature}\`);
console.log(\`Threshold: \${bestSplit.threshold}\`);
console.log(\`Information Gain: \${bestSplit.gain.toFixed(3)}\`);
console.log(\`Left child size: \${bestSplit.leftSize}\`);
console.log(\`Right child size: \${bestSplit.rightSize}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-purple-500/20 rounded border border-purple-500/30">
                <p className="text-purple-400 text-sm">
                  <strong>💡 What's happening:</strong> We try every possible split on every feature and choose the one
                  with maximum information gain. This is the greedy approach that builds optimal local decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Building the Tree */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🌳 Step 3: Build the Complete Tree</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-orange-400 font-semibold mb-3">Recursive Tree Construction</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Decision tree node class
class TreeNode {
    constructor(data, depth = 0) {
        this.data = data;
        this.depth = depth;
        this.feature = null;
        this.threshold = null;
        this.left = null;
        this.right = null;
        this.prediction = null;
        this.gini = calculateGini(data.map(d => d.approved));
    }
    
    isLeaf() {
        return this.prediction !== null;
    }
}

// Build decision tree recursively
const buildTree = (data, features, maxDepth = 5, minSamples = 2, depth = 0) => {
    const node = new TreeNode(data, depth);
    const labels = data.map(d => d.approved);
    
    // Stopping criteria
    const shouldStop = (
        depth >= maxDepth ||                    // Max depth reached
        data.length < minSamples ||             // Too few samples
        calculateGini(labels) === 0 ||          // Pure node
        new Set(labels).size === 1              // All same class
    );
    
    if (shouldStop) {
        // Create leaf node with majority class
        const counts = labels.reduce((acc, label) => {
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});
        
        node.prediction = Object.keys(counts).reduce((a, b) => 
            counts[a] > counts[b] ? a : b
        );
        
        console.log(\`Leaf at depth \${depth}: predict \${node.prediction} (gini: \${node.gini.toFixed(3)})\`);
        return node;
    }
    
    // Find best split
    const bestSplit = findBestSplit(data, features);
    
    if (!bestSplit || bestSplit.gain <= 0) {
        // No good split found, make leaf
        const counts = labels.reduce((acc, label) => {
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});
        
        node.prediction = Object.keys(counts).reduce((a, b) => 
            counts[a] > counts[b] ? a : b
        );
        
        return node;
    }
    
    // Apply best split
    node.feature = bestSplit.feature;
    node.threshold = bestSplit.threshold;
    
    console.log(\`Split at depth \${depth}: \${bestSplit.feature} < \${bestSplit.threshold} (gain: \${bestSplit.gain.toFixed(3)})\`);
    
    // Split data
    const leftData = data.filter(d => d[bestSplit.feature] < bestSplit.threshold);
    const rightData = data.filter(d => d[bestSplit.feature] >= bestSplit.threshold);
    
    // Recursively build children
    node.left = buildTree(leftData, features, maxDepth, minSamples, depth + 1);
    node.right = buildTree(rightData, features, maxDepth, minSamples, depth + 1);
    
    return node;
};

// Build the tree
console.log("Building Decision Tree...");
const tree = buildTree(loanData, ['income', 'creditScore'], 3, 1);

console.log("\\nTree built successfully!");`}
              </pre>
              <div className="mt-3 p-3 bg-orange-500/20 rounded border border-orange-500/30">
                <p className="text-orange-400 text-sm">
                  <strong>💡 What's happening:</strong> We recursively split the data using the best splits until we
                  reach stopping criteria. Each internal node stores a decision rule, each leaf stores a prediction.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-3">Making Predictions</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Predict using the decision tree
const predict = (tree, sample) => {
    let currentNode = tree;
    const path = [];
    
    // Traverse tree until we reach a leaf
    while (!currentNode.isLeaf()) {
        const featureValue = sample[currentNode.feature];
        const decision = featureValue < currentNode.threshold;
        
        path.push({
            feature: currentNode.feature,
            threshold: currentNode.threshold,
            value: featureValue,
            decision: decision ? 'left' : 'right'
        });
        
        currentNode = decision ? currentNode.left : currentNode.right;
    }
    
    return {
        prediction: parseInt(currentNode.prediction),
        path: path,
        confidence: 1 - currentNode.gini  // Simple confidence measure
    };
};

// Test predictions
console.log("\\n🔮 Making Predictions:");

const testCases = [
    {income: 45, creditScore: 720, actual: 1},
    {income: 30, creditScore: 580, actual: 0},
    {income: 70, creditScore: 650, actual: 1},
    {income: 35, creditScore: 600, actual: 0}
];

testCases.forEach((testCase, index) => {
    const result = predict(tree, testCase);
    const correct = result.prediction === testCase.actual ? "✅" : "❌";
    
    console.log(\`\\nTest \${index + 1}: Income=$\${testCase.income}k, Credit=\${testCase.creditScore}\`);
    console.log(\`Prediction: \${result.prediction === 1 ? 'APPROVE' : 'REJECT'} (actual: \${testCase.actual === 1 ? 'APPROVE' : 'REJECT'}) \${correct}\`);
    console.log(\`Confidence: \${(result.confidence * 100).toFixed(1)}%\`);
    
    console.log("Decision path:");
    result.path.forEach((step, i) => {
        console.log(\`  \${i + 1}. \${step.feature} = \${step.value} < \${step.threshold}? → go \${step.decision}\`);
    });
});

// Calculate accuracy
let correct = 0;
testCases.forEach(testCase => {
    const result = predict(tree, testCase);
    if (result.prediction === testCase.actual) correct++;
});

console.log(\`\\n📊 Test Accuracy: \${(correct / testCases.length * 100).toFixed(1)}%\`);`}
              </pre>
              <div className="mt-3 p-3 bg-cyan-500/20 rounded border border-cyan-500/30">
                <p className="text-cyan-400 text-sm">
                  <strong>💡 What's happening:</strong> To make a prediction, we start at the root and follow the
                  decision path down to a leaf. The path shows exactly how the decision was made - perfect
                  interpretability!
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-4">📊 Live Model Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-green-400 font-semibold">🎯 Tree Statistics</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Root Gini:</span>
                      <span className="text-white font-bold">{rootGini.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Best Split Feature:</span>
                      <span className="text-white font-bold">Credit Score</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Information Gain:</span>
                      <span className="text-white font-bold">{informationGain.toFixed(3)}</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-500/20 rounded border border-blue-500/30">
                      <p className="text-blue-400 text-xs text-center">
                        <strong>Best Split:</strong> Credit Score ≥ 650
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-purple-400 font-semibold">📈 Split Analysis</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Left Split (&lt; 650):</span>
                      <span className="text-white font-bold">{leftSplit.length} samples</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Right Split (≥ 650):</span>
                      <span className="text-white font-bold">{rightSplit.length} samples</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Left Gini:</span>
                      <span className="text-white font-bold">{calculateGini(leftSplit).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Right Gini:</span>
                      <span className="text-white font-bold">{calculateGini(rightSplit).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/20 rounded border border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-2">🎉 Congratulations!</h4>
              <p className="text-gray-300 text-sm">
                You've successfully implemented a Decision Tree from scratch! You now understand Gini impurity,
                information gain, recursive tree building, and prediction. Decision trees are the foundation for Random
                Forests and Gradient Boosting! 🚀
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DecisionTreeAlgorithm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
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
              <p className="text-sm text-gray-300">Tree-Based Learning 🚀</p>
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
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 text-sm px-4 py-2"
              >
                🌳 Decision Trees
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white text-sm px-4 py-2">
                🎯 Classification & Regression
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30 text-sm px-4 py-2">
                👶 Beginner Friendly
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">🌳 Decision Trees Explained</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Learn the most <strong>interpretable</strong> machine learning algorithm! Decision trees make decisions
              just like humans - by asking yes/no questions. Perfect for loan approval, medical diagnosis, and any
              decision-making process! 🎬
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🌳</div>
                <h3 className="text-white font-semibold mb-2">Tree Structure</h3>
                <p className="text-gray-300 text-sm">Intuitive branching decisions</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-white font-semibold mb-2">Gini Impurity</h3>
                <p className="text-gray-300 text-sm">Mathematical splitting criterion</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-white font-semibold mb-2">Full Interpretability</h3>
                <p className="text-gray-300 text-sm">See exactly how decisions are made</p>
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
                <AnimatedDecisionTree />
              </TabsContent>

              <TabsContent value="math">
                <DecisionTreeMath />
              </TabsContent>

              <TabsContent value="code">
                <DecisionTreeCode />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
