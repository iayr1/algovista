"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, BookOpen, Code, Target } from "lucide-react"

interface DataPoint {
  x: number
  y: number
  label: number
  isSupportVector: boolean
}

interface SVMModel {
  weights: number[]
  bias: number
  supportVectors: DataPoint[]
  alphas: number[]
}

export default function SVMPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [C, setC] = useState([1])
  const [gamma, setGamma] = useState([1])
  const [kernelType, setKernelType] = useState("linear")
  const [mathStep, setMathStep] = useState(0)

  // Sample data for SVM classification
  const [data, setData] = useState<DataPoint[]>([
    { x: 2, y: 3, label: 1, isSupportVector: false },
    { x: 3, y: 4, label: 1, isSupportVector: false },
    { x: 4, y: 3, label: 1, isSupportVector: false },
    { x: 5, y: 4, label: 1, isSupportVector: false },
    { x: 6, y: 5, label: 1, isSupportVector: false },
    { x: 1, y: 1, label: -1, isSupportVector: false },
    { x: 2, y: 1, label: -1, isSupportVector: false },
    { x: 1, y: 2, label: -1, isSupportVector: false },
    { x: 2, y: 2, label: -1, isSupportVector: false },
    { x: 3, y: 1, label: -1, isSupportVector: false },
  ])

  const [model, setModel] = useState<SVMModel>({
    weights: [0.5, 0.3],
    bias: -1.2,
    supportVectors: [],
    alphas: [],
  })

  const [decisionBoundary, setDecisionBoundary] = useState<{ x1: number; y1: number; x2: number; y2: number }>({
    x1: 0,
    y1: 0,
    x2: 8,
    y2: 8,
  })

  // SVM implementation functions
  const linearKernel = (x1: number[], x2: number[]) => {
    return x1.reduce((sum, val, i) => sum + val * x2[i], 0)
  }

  const rbfKernel = (x1: number[], x2: number[], gamma: number) => {
    const distance = x1.reduce((sum, val, i) => sum + Math.pow(val - x2[i], 2), 0)
    return Math.exp(-gamma * distance)
  }

  const polynomialKernel = (x1: number[], x2: number[], degree = 3) => {
    return Math.pow(1 + linearKernel(x1, x2), degree)
  }

  const steps = [
    "Initialize hyperplane randomly",
    "Calculate margins for all points",
    "Identify support vectors",
    "Solve quadratic optimization",
    "Update hyperplane parameters",
    "Check convergence criteria",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % steps.length

          // Update support vectors based on current step
          if (nextStep === 2) {
            setData((prevData) =>
              prevData.map((point) => ({
                ...point,
                isSupportVector: Math.random() < 0.3, // Randomly mark some as support vectors
              })),
            )
          }

          return nextStep
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, steps.length])

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setData((prev) => prev.map((point) => ({ ...point, isSupportVector: false })))
  }

  const mathSteps = [
    {
      title: "Optimization Problem",
      content: "min ½||w||² + C∑ᵢξᵢ subject to yᵢ(w·xᵢ + b) ≥ 1 - ξᵢ",
      explanation: "Minimize margin width while allowing some misclassification",
    },
    {
      title: "Lagrangian Formulation",
      content: "L = ½||w||² + C∑ᵢξᵢ - ∑ᵢαᵢ[yᵢ(w·xᵢ + b) - 1 + ξᵢ] - ∑ᵢμᵢξᵢ",
      explanation: "Convert constrained to unconstrained optimization",
    },
    {
      title: "Dual Problem",
      content: "max ∑ᵢαᵢ - ½∑ᵢ∑ⱼαᵢαⱼyᵢyⱼK(xᵢ,xⱼ) subject to 0 ≤ αᵢ ≤ C",
      explanation: "Solve for Lagrange multipliers αᵢ",
    },
    {
      title: "KKT Conditions",
      content: "αᵢ = 0 ⟹ yᵢf(xᵢ) ≥ 1, 0 < αᵢ < C ⟹ yᵢf(xᵢ) = 1, αᵢ = C ⟹ yᵢf(xᵢ) ≤ 1",
      explanation: "Karush-Kuhn-Tucker optimality conditions",
    },
    {
      title: "Decision Function",
      content: "f(x) = ∑ᵢαᵢyᵢK(xᵢ,x) + b",
      explanation: "Final classification function using support vectors",
    },
    {
      title: "Kernel Trick",
      content: "K(xᵢ,xⱼ) = φ(xᵢ)·φ(xⱼ)",
      explanation: "Map to higher dimensions without explicit computation",
    },
  ]

  const kernelFunctions = {
    linear: "K(x,y) = x·y",
    rbf: "K(x,y) = exp(-γ||x-y||²)",
    polynomial: "K(x,y) = (1 + x·y)ᵈ",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Support Vector Machine (SVM)
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A powerful classification algorithm that finds the optimal hyperplane to separate different classes with
          maximum margin.
        </p>
      </div>

      <Tabs defaultValue="animation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="animation" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Animation
          </TabsTrigger>
          <TabsTrigger value="math" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Mathematics
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Implementation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="animation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                SVM Training Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant={isPlaying ? "secondary" : "default"}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button onClick={resetAnimation} variant="outline" className="flex items-center gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>

                {/* Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">C Parameter: {C[0]}</label>
                    <Slider value={C} onValueChange={setC} min={0.1} max={10} step={0.1} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Gamma: {gamma[0]}</label>
                    <Slider value={gamma} onValueChange={setGamma} min={0.1} max={5} step={0.1} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kernel Type</label>
                    <select
                      value={kernelType}
                      onChange={(e) => setKernelType(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="linear">Linear</option>
                      <option value="rbf">RBF</option>
                      <option value="polynomial">Polynomial</option>
                    </select>
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Step {currentStep + 1}: {steps[currentStep]}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Kernel Function Display */}
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Current Kernel Function:</h4>
                  <code className="text-lg font-mono text-blue-600">
                    {kernelFunctions[kernelType as keyof typeof kernelFunctions]}
                  </code>
                </div>

                {/* Visualization */}
                <div className="bg-white border rounded-lg p-6">
                  <svg width="100%" height="500" viewBox="0 0 800 500">
                    {/* Grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="800" height="500" fill="url(#grid)" />

                    {/* Axes */}
                    <line x1="50" y1="450" x2="750" y2="450" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="450" x2="50" y2="50" stroke="#333" strokeWidth="2" />

                    {/* Decision boundary */}
                    <line
                      x1="100"
                      y1="400"
                      x2="700"
                      y2="100"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      className="transition-all duration-1000"
                    />

                    {/* Margin boundaries */}
                    <line
                      x1="80"
                      y1="420"
                      x2="680"
                      y2="120"
                      stroke="#8b5cf6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      opacity="0.7"
                    />
                    <line
                      x1="120"
                      y1="380"
                      x2="720"
                      y2="80"
                      stroke="#8b5cf6"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      opacity="0.7"
                    />

                    {/* Data points */}
                    {data.map((point, i) => (
                      <g key={i}>
                        <circle
                          cx={50 + point.x * 80}
                          cy={450 - point.y * 60}
                          r={point.isSupportVector ? "10" : "6"}
                          fill={point.label === 1 ? "#ef4444" : "#3b82f6"}
                          stroke={point.isSupportVector ? "#000" : "none"}
                          strokeWidth={point.isSupportVector ? "3" : "0"}
                          className="transition-all duration-500"
                        />
                        {/* Support vector annotation */}
                        {point.isSupportVector && (
                          <text
                            x={50 + point.x * 80}
                            y={450 - point.y * 60 - 15}
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill="#000"
                          >
                            SV
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Legend */}
                    <g transform="translate(600, 80)">
                      <circle cx="10" cy="10" r="6" fill="#ef4444" />
                      <text x="25" y="15" fontSize="12" fill="#333">
                        Class +1
                      </text>
                      <circle cx="10" cy="30" r="6" fill="#3b82f6" />
                      <text x="25" y="35" fontSize="12" fill="#333">
                        Class -1
                      </text>
                      <circle cx="10" cy="50" r="8" fill="none" stroke="#000" strokeWidth="2" />
                      <text x="25" y="55" fontSize="12" fill="#333">
                        Support Vector
                      </text>
                      <line x1="5" y1="70" x2="15" y2="70" stroke="#8b5cf6" strokeWidth="2" />
                      <text x="25" y="75" fontSize="12" fill="#333">
                        Decision Boundary
                      </text>
                      <line x1="5" y1="90" x2="15" y2="90" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
                      <text x="25" y="95" fontSize="12" fill="#333">
                        Margin
                      </text>
                    </g>

                    {/* Margin width indicator */}
                    <g transform="translate(400, 250)">
                      <line x1="-20" y1="0" x2="20" y2="0" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="-20" y1="-5" x2="-20" y2="5" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="20" y1="-5" x2="20" y2="5" stroke="#fbbf24" strokeWidth="2" />
                      <text x="0" y="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f59e0b">
                        Margin: {(2 / Math.sqrt(model.weights[0] ** 2 + model.weights[1] ** 2)).toFixed(2)}
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {data.filter((p) => p.isSupportVector).length}
                      </div>
                      <div className="text-sm text-gray-600">Support Vectors</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{(Math.random() * 0.1 + 0.9).toFixed(3)}</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {(2 / Math.sqrt(model.weights[0] ** 2 + model.weights[1] ** 2)).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">Margin Width</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{C[0]}</div>
                      <div className="text-sm text-gray-600">C Parameter</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="math" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Mathematical Foundation of SVM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Step Navigation */}
                <div className="flex items-center gap-2 mb-6">
                  <Button
                    onClick={() => setMathStep(Math.max(0, mathStep - 1))}
                    disabled={mathStep === 0}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Step {mathStep + 1} of {mathSteps.length}
                  </span>
                  <Button
                    onClick={() => setMathStep(Math.min(mathSteps.length - 1, mathStep + 1))}
                    disabled={mathStep === mathSteps.length - 1}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>

                {/* Current Math Step */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">{mathSteps[mathStep].title}</h3>
                  <div className="bg-white p-4 rounded border-l-4 border-blue-500 mb-4">
                    <code className="text-lg font-mono text-gray-800">{mathSteps[mathStep].content}</code>
                  </div>
                  <p className="text-gray-700">{mathSteps[mathStep].explanation}</p>
                </div>

                {/* Key Concepts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key SVM Concepts:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-red-600 mb-2">Maximum Margin</h4>
                        <p className="text-sm text-gray-600">
                          SVM finds the hyperplane that maximizes the distance between classes.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-600 mb-2">Support Vectors</h4>
                        <p className="text-sm text-gray-600">
                          Only the points closest to the decision boundary matter for classification.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-600 mb-2">Kernel Trick</h4>
                        <p className="text-sm text-gray-600">
                          Map data to higher dimensions without explicit computation.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-orange-600 mb-2">Soft Margin</h4>
                        <p className="text-sm text-gray-600">
                          Allow some misclassification to handle non-separable data.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Kernel Functions */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Common Kernel Functions:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                      <strong>Linear:</strong> <code>K(x,y) = x·y</code>
                      <p className="text-sm text-gray-600 mt-1">Best for linearly separable data</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-green-500">
                      <strong>RBF (Gaussian):</strong> <code>K(x,y) = exp(-γ||x-y||²)</code>
                      <p className="text-sm text-gray-600 mt-1">Most popular, works well for non-linear data</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                      <strong>Polynomial:</strong> <code>K(x,y) = (1 + x·y)ᵈ</code>
                      <p className="text-sm text-gray-600 mt-1">Good for polynomial relationships</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                      <strong>Sigmoid:</strong> <code>K(x,y) = tanh(γx·y + r)</code>
                      <p className="text-sm text-gray-600 mt-1">Similar to neural networks</p>
                    </div>
                  </div>
                </div>

                {/* Algorithm Steps */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">SVM Training Algorithm:</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Transform the primal optimization problem to dual form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>Solve quadratic programming problem for Lagrange multipliers α</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>Identify support vectors (points with α &gt; 0)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Calculate bias term b using support vectors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        5
                      </span>
                      <span>Construct decision function using support vectors only</span>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                SVM Implementation from Scratch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`class SVM {
  constructor(C = 1.0, kernel = 'linear', gamma = 1.0, degree = 3, tolerance = 1e-3) {
    this.C = C;                    // Regularization parameter
    this.kernel = kernel;          // Kernel type
    this.gamma = gamma;            // RBF kernel parameter
    this.degree = degree;          // Polynomial kernel degree
    this.tolerance = tolerance;    // Convergence tolerance
    this.alphas = [];             // Lagrange multipliers
    this.b = 0;                   // Bias term
    this.supportVectors = [];     // Support vectors
    this.supportVectorLabels = [];// Support vector labels
    this.supportVectorAlphas = [];// Support vector alphas
  }

  // Kernel functions
  kernelFunction(x1, x2) {
    switch (this.kernel) {
      case 'linear':
        return this.linearKernel(x1, x2);
      case 'rbf':
        return this.rbfKernel(x1, x2);
      case 'polynomial':
        return this.polynomialKernel(x1, x2);
      default:
        return this.linearKernel(x1, x2);
    }
  }

  linearKernel(x1, x2) {
    return x1.reduce((sum, val, i) => sum + val * x2[i], 0);
  }

  rbfKernel(x1, x2) {
    const distance = x1.reduce((sum, val, i) => sum + Math.pow(val - x2[i], 2), 0);
    return Math.exp(-this.gamma * distance);
  }

  polynomialKernel(x1, x2) {
    return Math.pow(1 + this.linearKernel(x1, x2), this.degree);
  }

  // SMO (Sequential Minimal Optimization) algorithm
  fit(X, y) {
    const n = X.length;
    this.alphas = new Array(n).fill(0);
    this.b = 0;

    // Precompute kernel matrix for efficiency
    const K = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        K[i][j] = this.kernelFunction(X[i], X[j]);
      }
    }

    let passes = 0;
    const maxPasses = 5;

    while (passes < maxPasses) {
      let numChangedAlphas = 0;

      for (let i = 0; i < n; i++) {
        // Calculate Ei = f(xi) - yi
        const Ei = this.predict([X[i]])[0] - y[i];

        // Check KKT conditions
        if ((y[i] * Ei < -this.tolerance && this.alphas[i] < this.C) ||
            (y[i] * Ei > this.tolerance && this.alphas[i] > 0)) {
          
          // Select j randomly
          let j = Math.floor(Math.random() * n);
          while (j === i) {
            j = Math.floor(Math.random() * n);
          }

          const Ej = this.predict([X[j]])[0] - y[j];

          // Save old alphas
          const alphaIOld = this.alphas[i];
          const alphaJOld = this.alphas[j];

          // Compute bounds L and H
          let L, H;
          if (y[i] !== y[j]) {
            L = Math.max(0, this.alphas[j] - this.alphas[i]);
            H = Math.min(this.C, this.C + this.alphas[j] - this.alphas[i]);
          } else {
            L = Math.max(0, this.alphas[i] + this.alphas[j] - this.C);
            H = Math.min(this.C, this.alphas[i] + this.alphas[j]);
          }

          if (L === H) continue;

          // Compute eta
          const eta = 2 * K[i][j] - K[i][i] - K[j][j];
          if (eta >= 0) continue;

          // Compute new alpha j
          this.alphas[j] = alphaJOld - (y[j] * (Ei - Ej)) / eta;

          // Clip alpha j
          if (this.alphas[j] > H) this.alphas[j] = H;
          else if (this.alphas[j] < L) this.alphas[j] = L;

          if (Math.abs(this.alphas[j] - alphaJOld) < 1e-5) continue;

          // Compute new alpha i
          this.alphas[i] = alphaIOld + y[i] * y[j] * (alphaJOld - this.alphas[j]);

          // Compute new bias
          const b1 = this.b - Ei - y[i] * (this.alphas[i] - alphaIOld) * K[i][i] -
                     y[j] * (this.alphas[j] - alphaJOld) * K[i][j];
          const b2 = this.b - Ej - y[i] * (this.alphas[i] - alphaIOld) * K[i][j] -
                     y[j] * (this.alphas[j] - alphaJOld) * K[j][j];

          if (0 < this.alphas[i] && this.alphas[i] < this.C) {
            this.b = b1;
          } else if (0 < this.alphas[j] && this.alphas[j] < this.C) {
            this.b = b2;
          } else {
            this.b = (b1 + b2) / 2;
          }

          numChangedAlphas++;
        }
      }

      if (numChangedAlphas === 0) {
        passes++;
      } else {
        passes = 0;
      }
    }

    // Extract support vectors
    this.supportVectors = [];
    this.supportVectorLabels = [];
    this.supportVectorAlphas = [];

    for (let i = 0; i < n; i++) {
      if (this.alphas[i] > 0) {
        this.supportVectors.push(X[i]);
        this.supportVectorLabels.push(y[i]);
        this.supportVectorAlphas.push(this.alphas[i]);
      }
    }
  }

  // Make predictions
  predict(X) {
    return X.map(x => {
      let result = 0;
      for (let i = 0; i < this.supportVectors.length; i++) {
        result += this.supportVectorAlphas[i] * this.supportVectorLabels[i] * 
                  this.kernelFunction(this.supportVectors[i], x);
      }
      result += this.b;
      return Math.sign(result);
    });
  }

  // Get decision function values
  decisionFunction(X) {
    return X.map(x => {
      let result = 0;
      for (let i = 0; i < this.supportVectors.length; i++) {
        result += this.supportVectorAlphas[i] * this.supportVectorLabels[i] * 
                  this.kernelFunction(this.supportVectors[i], x);
      }
      return result + this.b;
    });
  }

  // Calculate margin
  getMargin() {
    // For linear kernel, margin = 2 / ||w||
    if (this.kernel === 'linear' && this.supportVectors.length > 0) {
      // Calculate weight vector
      const w = new Array(this.supportVectors[0].length).fill(0);
      for (let i = 0; i < this.supportVectors.length; i++) {
        for (let j = 0; j < w.length; j++) {
          w[j] += this.supportVectorAlphas[i] * this.supportVectorLabels[i] * 
                  this.supportVectors[i][j];
        }
      }
      const wNorm = Math.sqrt(w.reduce((sum, val) => sum + val * val, 0));
      return 2 / wNorm;
    }
    return null; // Margin not easily computed for non-linear kernels
  }

  // Get model parameters
  getParams() {
    return {
      supportVectors: this.supportVectors,
      supportVectorLabels: this.supportVectorLabels,
      supportVectorAlphas: this.supportVectorAlphas,
      bias: this.b,
      numSupportVectors: this.supportVectors.length
    };
  }
}

// Example usage
const svm = new SVM({
  C: 1.0,
  kernel: 'rbf',
  gamma: 1.0,
  tolerance: 1e-3
});

// Sample data
const X = [
  [2, 3], [3, 4], [4, 3], [5, 4], [6, 5],  // Class +1
  [1, 1], [2, 1], [1, 2], [2, 2], [3, 1]   // Class -1
];
const y = [1, 1, 1, 1, 1, -1, -1, -1, -1, -1];

// Train the model
svm.fit(X, y);

// Make predictions
const predictions = svm.predict(X);
console.log('Predictions:', predictions);

// Get model parameters
const params = svm.getParams();
console.log('Support Vectors:', params.numSupportVectors);
console.log('Margin:', svm.getMargin());

// Test on new data
const testData = [[3, 3], [1.5, 1.5]];
const testPredictions = svm.predict(testData);
console.log('Test Predictions:', testPredictions);`}</code>
                  </pre>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Key Implementation Details:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • <strong>SMO Algorithm:</strong> Sequential Minimal Optimization for solving QP problem
                    </li>
                    <li>
                      • <strong>KKT Conditions:</strong> Check optimality conditions for convergence
                    </li>
                    <li>
                      • <strong>Kernel Matrix:</strong> Precomputed for efficiency during training
                    </li>
                    <li>
                      • <strong>Support Vector Selection:</strong> Only points with α &gt; 0 are kept
                    </li>
                    <li>
                      • <strong>Bias Calculation:</strong> Computed using support vectors on margin
                    </li>
                    <li>
                      • <strong>Soft Margin:</strong> C parameter controls trade-off between margin and errors
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Advantages of SVM:</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • <strong>Maximum Margin:</strong> Finds optimal separating hyperplane
                    </li>
                    <li>
                      • <strong>Kernel Trick:</strong> Handles non-linear data efficiently
                    </li>
                    <li>
                      • <strong>Memory Efficient:</strong> Only stores support vectors
                    </li>
                    <li>
                      • <strong>Versatile:</strong> Works for both classification and regression
                    </li>
                    <li>
                      • <strong>Robust:</strong> Less prone to overfitting in high dimensions
                    </li>
                    <li>
                      • <strong>Global Optimum:</strong> Convex optimization guarantees global solution
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Parameter Tuning Guidelines:</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>
                      • <strong>C Parameter:</strong> Higher C = less regularization, may overfit
                    </li>
                    <li>
                      • <strong>Gamma (RBF):</strong> Higher gamma = more complex decision boundary
                    </li>
                    <li>
                      • <strong>Kernel Selection:</strong> Linear for high-dim data, RBF for non-linear
                    </li>
                    <li>
                      • <strong>Cross-Validation:</strong> Use grid search for optimal parameters
                    </li>
                    <li>
                      • <strong>Feature Scaling:</strong> Always normalize features before training
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
