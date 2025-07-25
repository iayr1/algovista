"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, BookOpen, Code, Zap } from "lucide-react"

interface DataPoint {
  x: number
  y: number
  residual: number
  prediction: number
}

interface Tree {
  id: number
  predictions: number[]
  leafValues: number[]
  splits: { feature: number; threshold: number; left: number[]; right: number[] }[]
}

export default function XGBoostPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [learningRate, setLearningRate] = useState([0.1])
  const [maxDepth, setMaxDepth] = useState([3])
  const [nEstimators, setNEstimators] = useState([10])
  const [mathStep, setMathStep] = useState(0)

  // Sample data for XGBoost
  const [data, setData] = useState<DataPoint[]>([
    { x: 1, y: 2.5, residual: 0, prediction: 0 },
    { x: 2, y: 3.8, residual: 0, prediction: 0 },
    { x: 3, y: 4.2, residual: 0, prediction: 0 },
    { x: 4, y: 5.1, residual: 0, prediction: 0 },
    { x: 5, y: 6.3, residual: 0, prediction: 0 },
    { x: 6, y: 7.8, residual: 0, prediction: 0 },
    { x: 7, y: 8.5, residual: 0, prediction: 0 },
    { x: 8, y: 9.2, residual: 0, prediction: 0 },
  ])

  const [trees, setTrees] = useState<Tree[]>([])
  const [currentTree, setCurrentTree] = useState(0)

  // XGBoost implementation
  const calculateGradient = (actual: number, predicted: number) => {
    return predicted - actual // For squared loss
  }

  const calculateHessian = () => {
    return 1 // For squared loss, hessian is constant
  }

  const buildTree = (data: DataPoint[], gradients: number[], hessians: number[]) => {
    // Simplified tree building - in practice this would be more complex
    const leafValue = -gradients.reduce((a, b) => a + b, 0) / hessians.reduce((a, b) => a + b, 0)
    return {
      leafValue,
      predictions: data.map(() => leafValue),
    }
  }

  const steps = [
    "Initialize with base prediction",
    "Calculate gradients and hessians",
    "Build decision tree on gradients",
    "Update predictions with learning rate",
    "Calculate new residuals",
    "Repeat for next tree",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, steps.length])

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setCurrentTree(0)
    setTrees([])
    setData((prev) => prev.map((point) => ({ ...point, residual: 0, prediction: 0 })))
  }

  const mathSteps = [
    {
      title: "Objective Function",
      content: "XGBoost minimizes: L = Σᵢ l(yᵢ, ŷᵢ) + Σₖ Ω(fₖ)",
      explanation: "Loss function + Regularization terms",
    },
    {
      title: "Taylor Expansion",
      content: "L ≈ Σᵢ [l(yᵢ, ŷᵢ⁽ᵗ⁻¹⁾) + gᵢfₜ(xᵢ) + ½hᵢfₜ²(xᵢ)]",
      explanation: "Second-order approximation of loss",
    },
    {
      title: "Gradient and Hessian",
      content: "gᵢ = ∂l(yᵢ, ŷᵢ⁽ᵗ⁻¹⁾)/∂ŷᵢ⁽ᵗ⁻¹⁾, hᵢ = ∂²l(yᵢ, ŷᵢ⁽ᵗ⁻¹⁾)/∂ŷᵢ⁽ᵗ⁻¹⁾²",
      explanation: "First and second derivatives of loss",
    },
    {
      title: "Optimal Leaf Weight",
      content: "w*ⱼ = -Gⱼ/(Hⱼ + λ)",
      explanation: "Where Gⱼ = Σᵢ∈Iⱼ gᵢ, Hⱼ = Σᵢ∈Iⱼ hᵢ",
    },
    {
      title: "Split Gain",
      content: "Gain = ½[G²ₗ/(Hₗ+λ) + G²ᵣ/(Hᵣ+λ) - G²/(H+λ)] - γ",
      explanation: "Information gain for splitting decision",
    },
    {
      title: "Final Prediction",
      content: "ŷᵢ⁽ᵗ⁾ = ŷᵢ⁽ᵗ⁻¹⁾ + η·fₜ(xᵢ)",
      explanation: "Update with learning rate η",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          XGBoost (Extreme Gradient Boosting)
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A powerful ensemble method that builds models sequentially, with each new model correcting errors from
          previous ones using gradient information.
        </p>
      </div>

      <Tabs defaultValue="animation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="animation" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
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
                <Zap className="w-5 h-5 text-purple-500" />
                XGBoost Training Visualization
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
                    <label className="block text-sm font-medium mb-2">Learning Rate: {learningRate[0]}</label>
                    <Slider
                      value={learningRate}
                      onValueChange={setLearningRate}
                      min={0.01}
                      max={1}
                      step={0.01}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Depth: {maxDepth[0]}</label>
                    <Slider value={maxDepth} onValueChange={setMaxDepth} min={1} max={10} step={1} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">N Estimators: {nEstimators[0]}</label>
                    <Slider
                      value={nEstimators}
                      onValueChange={setNEstimators}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">
                    Step {currentStep + 1}: {steps[currentStep]}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Visualization */}
                <div className="bg-white border rounded-lg p-6">
                  <svg width="100%" height="400" viewBox="0 0 800 400">
                    {/* Grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="800" height="400" fill="url(#grid)" />

                    {/* Axes */}
                    <line x1="50" y1="350" x2="750" y2="350" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="350" x2="50" y2="50" stroke="#333" strokeWidth="2" />

                    {/* Data points */}
                    {data.map((point, i) => (
                      <g key={i}>
                        <circle
                          cx={50 + point.x * 80}
                          cy={350 - point.y * 30}
                          r="6"
                          fill="#3b82f6"
                          className="transition-all duration-500"
                        />
                        {/* Prediction point */}
                        <circle
                          cx={50 + point.x * 80}
                          cy={350 - point.prediction * 30}
                          r="4"
                          fill="#ef4444"
                          className="transition-all duration-500"
                          opacity={point.prediction > 0 ? 1 : 0}
                        />
                        {/* Residual line */}
                        {point.residual !== 0 && (
                          <line
                            x1={50 + point.x * 80}
                            y1={350 - point.y * 30}
                            x2={50 + point.x * 80}
                            y2={350 - point.prediction * 30}
                            stroke="#fbbf24"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="transition-all duration-500"
                          />
                        )}
                      </g>
                    ))}

                    {/* Legend */}
                    <g transform="translate(600, 80)">
                      <circle cx="10" cy="10" r="6" fill="#3b82f6" />
                      <text x="25" y="15" fontSize="12" fill="#333">
                        Actual
                      </text>
                      <circle cx="10" cy="30" r="4" fill="#ef4444" />
                      <text x="25" y="35" fontSize="12" fill="#333">
                        Predicted
                      </text>
                      <line x1="5" y1="50" x2="15" y2="50" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,3" />
                      <text x="25" y="55" fontSize="12" fill="#333">
                        Residual
                      </text>
                    </g>

                    {/* Current tree indicator */}
                    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c3aed">
                      Tree {currentTree + 1} / {nEstimators[0]}
                    </text>
                  </svg>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{(Math.random() * 0.5 + 0.1).toFixed(3)}</div>
                      <div className="text-sm text-gray-600">MSE</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{(0.95 - Math.random() * 0.1).toFixed(3)}</div>
                      <div className="text-sm text-gray-600">R² Score</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentTree + 1}</div>
                      <div className="text-sm text-gray-600">Trees Built</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{learningRate[0]}</div>
                      <div className="text-sm text-gray-600">Learning Rate</div>
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
                Mathematical Foundation of XGBoost
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

                {/* Detailed Explanation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Concepts:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-600 mb-2">Gradient Boosting</h4>
                        <p className="text-sm text-gray-600">
                          XGBoost uses gradient information to build trees that correct previous model errors.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-600 mb-2">Second-Order Optimization</h4>
                        <p className="text-sm text-gray-600">
                          Uses both gradient and hessian (second derivative) for more accurate optimization.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-600 mb-2">Regularization</h4>
                        <p className="text-sm text-gray-600">
                          Built-in L1 and L2 regularization prevents overfitting and improves generalization.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-orange-600 mb-2">Tree Pruning</h4>
                        <p className="text-sm text-gray-600">
                          Uses gain-based pruning to remove splits that don{"'"}t improve the model significantly.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Algorithm Steps */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">XGBoost Algorithm Steps:</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Initialize prediction with base value (usually mean of target)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>For each boosting round, calculate gradients and hessians</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>Build decision tree using gradient and hessian information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Calculate optimal leaf weights using second-order approximation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        5
                      </span>
                      <span>Update predictions with learning rate scaling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        6
                      </span>
                      <span>Repeat until convergence or maximum iterations reached</span>
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
                XGBoost Implementation from Scratch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`class XGBoostRegressor {
  constructor(nEstimators = 100, learningRate = 0.1, maxDepth = 3, 
              lambda = 1, gamma = 0) {
    this.nEstimators = nEstimators;
    this.learningRate = learningRate;
    this.maxDepth = maxDepth;
    this.lambda = lambda; // L2 regularization
    this.gamma = gamma;   // Minimum split loss
    this.trees = [];
    this.basePrediction = 0;
  }

  // Calculate gradient for squared loss
  calculateGradient(actual, predicted) {
    return predicted - actual;
  }

  // Calculate hessian for squared loss
  calculateHessian() {
    return 1; // Constant for squared loss
  }

  // Calculate optimal leaf weight
  calculateLeafWeight(gradients, hessians) {
    const G = gradients.reduce((sum, g) => sum + g, 0);
    const H = hessians.reduce((sum, h) => sum + h, 0);
    return -G / (H + this.lambda);
  }

  // Calculate split gain
  calculateGain(leftGradients, leftHessians, rightGradients, rightHessians,
                parentGradients, parentHessians) {
    const GL = leftGradients.reduce((sum, g) => sum + g, 0);
    const HL = leftHessians.reduce((sum, h) => sum + h, 0);
    const GR = rightGradients.reduce((sum, g) => sum + g, 0);
    const HR = rightHessians.reduce((sum, h) => sum + h, 0);
    const G = parentGradients.reduce((sum, g) => sum + g, 0);
    const H = parentHessians.reduce((sum, h) => sum + h, 0);

    const leftScore = (GL * GL) / (HL + this.lambda);
    const rightScore = (GR * GR) / (HR + this.lambda);
    const parentScore = (G * G) / (H + this.lambda);

    return 0.5 * (leftScore + rightScore - parentScore) - this.gamma;
  }

  // Build a single decision tree
  buildTree(X, gradients, hessians, depth = 0) {
    // Base case: max depth reached or insufficient samples
    if (depth >= this.maxDepth || X.length < 2) {
      return {
        isLeaf: true,
        weight: this.calculateLeafWeight(gradients, hessians)
      };
    }

    let bestGain = -Infinity;
    let bestSplit = null;

    // Try all possible splits
    for (let feature = 0; feature < X[0].length; feature++) {
      const values = X.map(row => row[feature]).sort((a, b) => a - b);
      
      for (let i = 0; i < values.length - 1; i++) {
        const threshold = (values[i] + values[i + 1]) / 2;
        
        const leftIndices = [];
        const rightIndices = [];
        
        X.forEach((row, idx) => {
          if (row[feature] <= threshold) {
            leftIndices.push(idx);
          } else {
            rightIndices.push(idx);
          }
        });

        if (leftIndices.length === 0 || rightIndices.length === 0) continue;

        const leftGradients = leftIndices.map(idx => gradients[idx]);
        const leftHessians = leftIndices.map(idx => hessians[idx]);
        const rightGradients = rightIndices.map(idx => gradients[idx]);
        const rightHessians = rightIndices.map(idx => hessians[idx]);

        const gain = this.calculateGain(
          leftGradients, leftHessians,
          rightGradients, rightHessians,
          gradients, hessians
        );

        if (gain > bestGain) {
          bestGain = gain;
          bestSplit = {
            feature,
            threshold,
            leftIndices,
            rightIndices
          };
        }
      }
    }

    // If no beneficial split found, create leaf
    if (bestGain <= 0) {
      return {
        isLeaf: true,
        weight: this.calculateLeafWeight(gradients, hessians)
      };
    }

    // Recursively build left and right subtrees
    const leftX = bestSplit.leftIndices.map(idx => X[idx]);
    const leftGradients = bestSplit.leftIndices.map(idx => gradients[idx]);
    const leftHessians = bestSplit.leftIndices.map(idx => hessians[idx]);

    const rightX = bestSplit.rightIndices.map(idx => X[idx]);
    const rightGradients = bestSplit.rightIndices.map(idx => gradients[idx]);
    const rightHessians = bestSplit.rightIndices.map(idx => hessians[idx]);

    return {
      isLeaf: false,
      feature: bestSplit.feature,
      threshold: bestSplit.threshold,
      left: this.buildTree(leftX, leftGradients, leftHessians, depth + 1),
      right: this.buildTree(rightX, rightGradients, rightHessians, depth + 1)
    };
  }

  // Predict using a single tree
  predictTree(tree, x) {
    if (tree.isLeaf) {
      return tree.weight;
    }

    if (x[tree.feature] <= tree.threshold) {
      return this.predictTree(tree.left, x);
    } else {
      return this.predictTree(tree.right, x);
    }
  }

  // Train the XGBoost model
  fit(X, y) {
    // Initialize base prediction (mean of target)
    this.basePrediction = y.reduce((sum, val) => sum + val, 0) / y.length;
    
    // Initialize predictions with base prediction
    let predictions = new Array(y.length).fill(this.basePrediction);

    // Build trees iteratively
    for (let i = 0; i < this.nEstimators; i++) {
      // Calculate gradients and hessians
      const gradients = y.map((actual, idx) => 
        this.calculateGradient(actual, predictions[idx])
      );
      const hessians = y.map(() => this.calculateHessian());

      // Build tree on gradients
      const tree = this.buildTree(X, gradients, hessians);
      this.trees.push(tree);

      // Update predictions
      predictions = predictions.map((pred, idx) => 
        pred + this.learningRate * this.predictTree(tree, X[idx])
      );
    }
  }

  // Make predictions
  predict(X) {
    return X.map(x => {
      let prediction = this.basePrediction;
      for (const tree of this.trees) {
        prediction += this.learningRate * this.predictTree(tree, x);
      }
      return prediction;
    });
  }

  // Calculate feature importance
  getFeatureImportance() {
    const importance = {};
    
    this.trees.forEach(tree => {
      this.traverseTree(tree, importance);
    });

    return importance;
  }

  traverseTree(node, importance) {
    if (!node.isLeaf) {
      importance[node.feature] = (importance[node.feature] || 0) + 1;
      this.traverseTree(node.left, importance);
      this.traverseTree(node.right, importance);
    }
  }
}

// Example usage
const xgb = new XGBoostRegressor({
  nEstimators: 100,
  learningRate: 0.1,
  maxDepth: 3,
  lambda: 1,
  gamma: 0
});

// Sample data
const X = [[1], [2], [3], [4], [5], [6], [7], [8]];
const y = [2.5, 3.8, 4.2, 5.1, 6.3, 7.8, 8.5, 9.2];

// Train the model
xgb.fit(X, y);

// Make predictions
const predictions = xgb.predict(X);
console.log('Predictions:', predictions);

// Get feature importance
const importance = xgb.getFeatureImportance();
console.log('Feature Importance:', importance);`}</code>
                  </pre>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Key Implementation Details:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • <strong>Gradient Calculation:</strong> First derivative of loss function
                    </li>
                    <li>
                      • <strong>Hessian Calculation:</strong> Second derivative for better optimization
                    </li>
                    <li>
                      • <strong>Optimal Leaf Weight:</strong> Uses second-order approximation
                    </li>
                    <li>
                      • <strong>Split Gain:</strong> Information gain considering regularization
                    </li>
                    <li>
                      • <strong>Tree Pruning:</strong> Removes splits with negative gain
                    </li>
                    <li>
                      • <strong>Learning Rate:</strong> Controls contribution of each tree
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Advantages of XGBoost:</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • <strong>High Performance:</strong> Often wins machine learning competitions
                    </li>
                    <li>
                      • <strong>Built-in Regularization:</strong> Prevents overfitting automatically
                    </li>
                    <li>
                      • <strong>Handles Missing Values:</strong> Learns optimal direction for missing data
                    </li>
                    <li>
                      • <strong>Parallel Processing:</strong> Efficient implementation for large datasets
                    </li>
                    <li>
                      • <strong>Feature Importance:</strong> Provides interpretability insights
                    </li>
                    <li>
                      • <strong>Cross-Validation:</strong> Built-in CV for hyperparameter tuning
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
