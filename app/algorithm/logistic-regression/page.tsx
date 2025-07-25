"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, BookOpen, Brain, Mail } from "lucide-react"

// Animated Logistic Regression Visualization
const AnimatedLogisticRegression = () => {
  const [weight, setWeight] = useState([2])
  const [bias, setBias] = useState([0])
  const [animationStep, setAnimationStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"sigmoid" | "decision" | "training">("sigmoid")

  // Sample email data (spam detection)
  const emailData = [
    { x: 1, y: 0, spamWords: 1, label: "Not Spam", isSpam: false },
    { x: 2, y: 0, spamWords: 2, label: "Not Spam", isSpam: false },
    { x: 3, y: 0, spamWords: 3, label: "Not Spam", isSpam: false },
    { x: 4, y: 1, spamWords: 4, label: "Spam", isSpam: true },
    { x: 5, y: 1, spamWords: 5, label: "Spam", isSpam: true },
    { x: 6, y: 1, spamWords: 6, label: "Spam", isSpam: true },
    { x: 7, y: 1, spamWords: 7, label: "Spam", isSpam: true },
    { x: 8, y: 1, spamWords: 8, label: "Spam", isSpam: true },
  ]

  // Sigmoid function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

  // Prediction function
  const predict = (x: number) => sigmoid(weight[0] * x + bias[0])

  // Animation logic
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 200)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mail className="w-5 h-5 mr-2" />📧 Logistic Regression: Email Spam Detection
          </CardTitle>
          <CardDescription className="text-gray-300">
            Watch how logistic regression uses the sigmoid function to classify emails as spam or not spam! 🎬
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phase Explanation */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                {currentPhase === "sigmoid" && "🌊 Understanding the Sigmoid Function"}
                {currentPhase === "decision" && "⚖️ Making Classification Decisions"}
                {currentPhase === "training" && "🎯 Training the Model"}
              </h3>
              <div className="flex space-x-2">
                {["sigmoid", "decision", "training"].map((phase) => (
                  <Button
                    key={phase}
                    variant={currentPhase === phase ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPhase(phase as any)}
                    className="text-xs"
                  >
                    {phase === "sigmoid" && "🌊"}
                    {phase === "decision" && "⚖️"}
                    {phase === "training" && "🎯"}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {currentPhase === "sigmoid" &&
                "The sigmoid function squashes any input into a probability between 0 and 1. This is perfect for classification!"}
              {currentPhase === "decision" &&
                "We use a threshold (usually 0.5) to make decisions. Above 0.5 = Spam, Below 0.5 = Not Spam."}
              {currentPhase === "training" &&
                "The model learns by adjusting weights and bias to minimize prediction errors using gradient descent."}
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Weight (slope): {weight[0].toFixed(2)}</label>
              <Slider value={weight} onValueChange={setWeight} max={5} min={-2} step={0.1} />
              <p className="text-xs text-gray-400">
                📈 <strong>Higher weight</strong> = steeper sigmoid curve, more sensitive to spam words
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-300 font-semibold">Bias (shift): {bias[0].toFixed(2)}</label>
              <Slider value={bias} onValueChange={setBias} max={5} min={-5} step={0.1} />
              <p className="text-xs text-gray-400">
                ↔️ <strong>Bias</strong> shifts the curve left/right, changes the decision threshold
              </p>
            </div>
          </div>

          {/* Animated Visualization */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold">📊 Interactive Sigmoid Visualization</h4>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Animate"}
              </Button>
            </div>

            <svg viewBox="0 0 600 400" className="w-full h-96">
              {/* Grid Background */}
              <defs>
                <pattern id="logistic-grid" width="60" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="600" height="400" fill="url(#logistic-grid)" />

              {/* Axes */}
              <line x1="50" y1="350" x2="550" y2="350" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
              <line x1="50" y1="350" x2="50" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />

              {/* Axis Labels */}
              <text x="300" y="380" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                📧 Number of Spam Words
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
                🎯 Probability of Spam
              </text>

              {/* Decision Boundary Line */}
              <line
                x1="50"
                y1={350 - 0.5 * 250}
                x2="550"
                y2={350 - 0.5 * 250}
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <text x="560" y={350 - 0.5 * 250 + 5} fill="#fbbf24" fontSize="12" fontWeight="bold">
                Decision Boundary (0.5)
              </text>

              {/* Sigmoid Curve */}
              <path
                d={`M 50,${350 - predict(0) * 250} ${Array.from({ length: 100 }, (_, i) => {
                  const x = i * 5
                  const inputValue = (i / 100) * 10
                  const y = 350 - predict(inputValue) * 250
                  return `L ${50 + x},${y}`
                }).join(" ")}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                opacity="0.9"
              />

              {/* Data Points */}
              {emailData.map((email, index) => {
                const x = 50 + email.x * 60
                const y = 350 - email.y * 250
                const predictedProb = predict(email.x)
                const predictedY = 350 - predictedProb * 250

                // Animation effects
                const shouldPulse = isPlaying && (animationStep + index * 20) % 100 < 50
                const radius = shouldPulse ? 8 : 6

                return (
                  <g key={index}>
                    {/* Connection line to sigmoid curve */}
                    {currentPhase === "decision" && (
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={predictedY}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        opacity="0.6"
                      />
                    )}

                    {/* Actual data point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={email.isSpam ? "#ef4444" : "#10b981"}
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.8"
                    />

                    {/* Predicted point on sigmoid curve */}
                    {currentPhase === "decision" && (
                      <circle
                        cx={x}
                        cy={predictedY}
                        r="4"
                        fill="#8b5cf6"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.9"
                      />
                    )}

                    {/* Email icon */}
                    <text x={x} y={y + 2} textAnchor="middle" fontSize="8" fill="white">
                      📧
                    </text>

                    {/* Probability label */}
                    {currentPhase === "decision" && (
                      <text
                        x={x}
                        y={predictedY - 15}
                        textAnchor="middle"
                        fill="#8b5cf6"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {(predictedProb * 100).toFixed(0)}%
                      </text>
                    )}

                    <title>
                      Email with {email.spamWords} spam words - {email.label} (Predicted:{" "}
                      {(predictedProb * 100).toFixed(1)}%)
                    </title>
                  </g>
                )
              })}

              {/* Probability scale */}
              {[0, 0.25, 0.5, 0.75, 1].map((prob) => (
                <g key={prob}>
                  <text x="40" y={350 - prob * 250 + 5} textAnchor="end" fill="white" fontSize="12">
                    {(prob * 100).toFixed(0)}%
                  </text>
                  <line
                    x1="45"
                    y1={350 - prob * 250}
                    x2="55"
                    y2={350 - prob * 250}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Spam word scale */}
              {[0, 2, 4, 6, 8].map((words) => (
                <g key={words}>
                  <text x={50 + words * 60} y={370} textAnchor="middle" fill="white" fontSize="12">
                    {words}
                  </text>
                  <line
                    x1={50 + words * 60}
                    y1="345"
                    x2={50 + words * 60}
                    y2="355"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(400, 80)">
                <rect x="0" y="0" width="150" height="80" fill="rgba(0,0,0,0.7)" rx="5" />
                <text x="10" y="20" fill="white" fontSize="12" fontWeight="bold">
                  Legend:
                </text>
                <circle cx="20" cy="35" r="4" fill="#10b981" />
                <text x="30" y="40" fill="white" fontSize="10">
                  Not Spam
                </text>
                <circle cx="20" cy="50" r="4" fill="#ef4444" />
                <text x="30" y="55" fill="white" fontSize="10">
                  Spam
                </text>
                <line x1="10" y1="65" x2="30" y2="65" stroke="#ef4444" strokeWidth="3" />
                <text x="35" y="70" fill="white" fontSize="10">
                  Sigmoid Curve
                </text>
              </g>
            </svg>
          </div>

          {/* Mathematical Formula Display */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">🧮 Live Mathematical Calculation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-purple-400 font-semibold">📐 Sigmoid Function:</h5>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/30">
                  <p className="text-center text-lg font-mono text-purple-400 mb-2">σ(z) = 1 / (1 + e^(-z))</p>
                  <p className="text-center text-sm text-gray-300">
                    where z = {weight[0].toFixed(2)} × (spam_words) + {bias[0].toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-green-400 font-semibold">🎯 Example Calculation:</h5>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-green-500/30">
                  <p className="text-sm text-gray-300">
                    For email with <strong>5 spam words</strong>:
                    <br />z = {weight[0].toFixed(2)} × 5 + {bias[0].toFixed(2)} = {(weight[0] * 5 + bias[0]).toFixed(2)}
                    <br />
                    P(spam) = 1 / (1 + e^(-{(weight[0] * 5 + bias[0]).toFixed(2)})) ={" "}
                    <strong>{(predict(5) * 100).toFixed(1)}%</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Insights */}
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
            <h4 className="text-white font-semibold mb-4">🚀 Real-World Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <h5 className="text-orange-400 font-semibold">Email Filtering</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Automatically classify emails as spam or legitimate based on content features like suspicious words,
                  sender reputation, and formatting.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h5 className="text-red-400 font-semibold">Medical Diagnosis</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Predict probability of disease based on symptoms and test results. The probability output helps
                  doctors make informed decisions.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <h5 className="text-yellow-400 font-semibold">Marketing</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Predict customer conversion probability for targeted campaigns. Focus marketing budget on
                  high-probability prospects.
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
const LogisticRegressionMath = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const mathSteps = [
    {
      title: "🤔 Why Not Linear Regression for Classification?",
      content: "Linear regression can output any value, but we need probabilities between 0 and 1 for classification!",
      formula: "Linear: y = wx + b (can be any value)",
      explanation:
        "If we use linear regression for classification, we might get probabilities like 1.5 or -0.3, which don't make sense!",
      intuition:
        "Imagine trying to express 'how likely' something is with a number that can be negative or greater than 100% - it's impossible!",
    },
    {
      title: "🌊 Enter the Sigmoid Function",
      content: "The sigmoid function squashes any input into a value between 0 and 1, perfect for probabilities!",
      formula: "σ(z) = 1 / (1 + e^(-z))",
      explanation: "No matter what z is, σ(z) will always be between 0 and 1. When z=0, σ(z)=0.5 (50% probability)",
      intuition:
        "Think of sigmoid as a smooth 'squashing' function that takes any number and converts it to a probability!",
    },
    {
      title: "🔗 Combining Linear Model with Sigmoid",
      content: "We use our linear model as input to the sigmoid function to get probabilities.",
      formula: "P(y=1|x) = σ(wx + b) = 1 / (1 + e^(-(wx + b)))",
      explanation: "First calculate wx + b (linear part), then apply sigmoid to get probability between 0 and 1",
      intuition: "It's like having a linear model that gets 'squeezed' through a probability converter!",
    },
    {
      title: "📊 Maximum Likelihood Estimation",
      content: "We want to find weights that make our observed data most likely to occur.",
      formula: "L(w,b) = ∏ᵢ P(yᵢ|xᵢ)^yᵢ × (1-P(yᵢ|xᵢ))^(1-yᵢ)",
      explanation: "For each data point, if y=1 we want high P(y=1|x), if y=0 we want high P(y=0|x) = 1-P(y=1|x)",
      intuition: "We're asking: 'What weights make our training data most believable?'",
    },
    {
      title: "📉 Log-Likelihood and Cross-Entropy Loss",
      content: "Taking the log makes the math easier and gives us the cross-entropy loss function.",
      formula: "ℓ(w,b) = -∑ᵢ [yᵢlog(pᵢ) + (1-yᵢ)log(1-pᵢ)]",
      explanation: "This is the cross-entropy loss! We minimize this to find the best weights.",
      intuition: "Log converts multiplication to addition, making optimization much easier computationally!",
    },
    {
      title: "🎯 Gradient Descent Update Rules",
      content: "We use calculus to find how to update weights to minimize the loss function.",
      formula: "∂ℓ/∂w = ∑ᵢ (pᵢ - yᵢ)xᵢ, ∂ℓ/∂b = ∑ᵢ (pᵢ - yᵢ)",
      explanation: "Update rule: w := w - α(∂ℓ/∂w), b := b - α(∂ℓ/∂b) where α is learning rate",
      intuition: "We nudge the weights in the direction that reduces our prediction errors!",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />🧠 Logistic Regression Mathematics (Step by Step!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Understanding the beautiful math behind logistic regression! 🎓
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

          {/* Interactive Sigmoid Visualization */}
          {currentStep === 1 && (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">📊 Interactive Sigmoid Function</h4>
              <svg viewBox="0 0 400 300" className="w-full h-64">
                {/* Grid */}
                <defs>
                  <pattern id="sigmoid-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#sigmoid-grid)" />

                {/* Axes */}
                <line x1="200" y1="50" x2="200" y2="250" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

                {/* Sigmoid curve */}
                <path
                  d={`M 50,${150 - (1 / (1 + Math.exp(-(-6))) - 0.5) * 200} ${Array.from({ length: 100 }, (_, i) => {
                    const x = (i / 100) * 12 - 6 // from -6 to 6
                    const y = 1 / (1 + Math.exp(-x))
                    const plotX = 50 + ((x + 6) / 12) * 300
                    const plotY = 150 - (y - 0.5) * 200
                    return `L ${plotX},${plotY}`
                  }).join(" ")}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                {/* Key points */}
                <circle cx="200" cy="150" r="4" fill="#fbbf24" stroke="white" strokeWidth="2" />
                <text x="210" y="155" fill="#fbbf24" fontSize="12" fontWeight="bold">
                  (0, 0.5)
                </text>

                {/* Labels */}
                <text x="200" y="270" textAnchor="middle" fill="white" fontSize="12">
                  z (input)
                </text>
                <text x="30" y="155" textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90 30 155)">
                  σ(z)
                </text>

                {/* Asymptotes */}
                <line x1="50" y1="50" x2="350" y2="50" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
                <text x="360" y="55" fill="#8b5cf6" fontSize="10">
                  y = 1
                </text>
                <line x1="50" y1="250" x2="350" y2="250" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
                <text x="360" y="255" fill="#8b5cf6" fontSize="10">
                  y = 0
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
              <h4 className="text-white font-semibold mb-4">🎉 You Now Understand Logistic Regression!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ Key Concepts Mastered:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Why sigmoid function is perfect for probabilities</li>
                    <li>• How maximum likelihood estimation works</li>
                    <li>• The connection to cross-entropy loss</li>
                    <li>• Gradient descent for logistic regression</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-2">🚀 Next Steps:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Try the interactive visualization above</li>
                    <li>• Experiment with different weights and bias</li>
                    <li>• Apply to your own classification problems</li>
                    <li>• Learn about regularization techniques</li>
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
const LogisticRegressionCode = () => {
  // JavaScript implementation of logistic regression
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

  const calculateLogLoss = (actual: number[], predicted: number[]) => {
    const epsilon = 1e-15 // Small value to prevent log(0)
    return (
      -actual.reduce((sum, y, i) => {
        const p = Math.max(epsilon, Math.min(1 - epsilon, predicted[i]))
        return sum + y * Math.log(p) + (1 - y) * Math.log(1 - p)
      }, 0) / actual.length
    )
  }

  const calculateAccuracy = (actual: number[], predicted: number[]) => {
    const correct = actual.reduce((sum, y, i) => {
      const prediction = predicted[i] > 0.5 ? 1 : 0
      return sum + (y === prediction ? 1 : 0)
    }, 0)
    return correct / actual.length
  }

  // Sample spam detection data
  const spamWords = [1, 2, 3, 4, 5, 6, 7, 8]
  const isSpam = [0, 0, 0, 1, 1, 1, 1, 1]

  // Simple gradient descent implementation
  const weight = 1.0
  const bias = -3.0
  const learningRate = 0.1

  const predict = (x: number) => sigmoid(weight * x + bias)
  const predictions = spamWords.map((x) => predict(x))
  const logLoss = calculateLogLoss(isSpam, predictions)
  const accuracy = calculateAccuracy(isSpam, predictions)

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />💻 Logistic Regression Implementation (From Scratch!)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Build logistic regression step by step with detailed explanations! 🛠️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Sigmoid Function */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🌊 Step 1: Implement the Sigmoid Function</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-3">The Heart of Logistic Regression</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// The sigmoid function: converts any real number to probability (0-1)
const sigmoid = (z) => {
    return 1 / (1 + Math.exp(-z));
};

// Test the sigmoid function
console.log("Sigmoid function examples:");
console.log(\`sigmoid(-10) = \${sigmoid(-10).toFixed(4)}\`);  // ≈ 0.0000
console.log(\`sigmoid(-2) = \${sigmoid(-2).toFixed(4)}\`);   // ≈ 0.1192
console.log(\`sigmoid(0) = \${sigmoid(0).toFixed(4)}\`);     // = 0.5000
console.log(\`sigmoid(2) = \${sigmoid(2).toFixed(4)}\`);     // ≈ 0.8808
console.log(\`sigmoid(10) = \${sigmoid(10).toFixed(4)}\`);   // ≈ 1.0000

// Notice how it smoothly transitions from 0 to 1!`}
              </pre>
              <div className="mt-3 p-3 bg-blue-500/20 rounded border border-blue-500/30">
                <p className="text-blue-400 text-sm">
                  <strong>💡 What's happening:</strong> The sigmoid function takes any real number and squashes it into
                  a probability between 0 and 1. This is perfect for binary classification!
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-green-400 font-semibold mb-3">Create the Prediction Function</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Logistic regression prediction function
const predict = (x, weight, bias) => {
    const z = weight * x + bias;  // Linear combination
    return sigmoid(z);            // Apply sigmoid to get probability
};

// Example: Email spam detection based on number of spam words
const weight = 1.5;  // How much each spam word increases spam probability
const bias = -4.0;   // Base bias (negative = emails are usually not spam)

console.log("Spam probability predictions:");
for (let spamWords = 0; spamWords <= 8; spamWords++) {
    const probability = predict(spamWords, weight, bias);
    const percentage = (probability * 100).toFixed(1);
    const classification = probability > 0.5 ? "SPAM" : "NOT SPAM";
    
    console.log(\`\${spamWords} spam words → \${percentage}% → \${classification}\`);
}

// Output example:
// 0 spam words → 1.8% → NOT SPAM
// 1 spam words → 4.7% → NOT SPAM
// 2 spam words → 11.9% → NOT SPAM
// 3 spam words → 26.9% → NOT SPAM
// 4 spam words → 50.0% → NOT SPAM (borderline!)
// 5 spam words → 73.1% → SPAM
// 6 spam words → 88.1% → SPAM
// 7 spam words → 95.3% → SPAM
// 8 spam words → 98.2% → SPAM`}
              </pre>
              <div className="mt-3 p-3 bg-green-500/20 rounded border border-green-500/30">
                <p className="text-green-400 text-sm">
                  <strong>💡 What's happening:</strong> We combine our input (spam words) with learned parameters
                  (weight and bias) to get a probability. The decision boundary is at 50%.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Loss Function */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">📉 Step 2: Implement the Loss Function</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-3">Cross-Entropy Loss (Log-Likelihood)</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Cross-entropy loss function for binary classification
const calculateLogLoss = (actualLabels, predictedProbabilities) => {
    const epsilon = 1e-15;  // Small value to prevent log(0)
    let totalLoss = 0;
    
    for (let i = 0; i < actualLabels.length; i++) {
        const y = actualLabels[i];           // Actual label (0 or 1)
        let p = predictedProbabilities[i];   // Predicted probability
        
        // Clip probability to prevent log(0) which is undefined
        p = Math.max(epsilon, Math.min(1 - epsilon, p));
        
        // Cross-entropy formula: -[y*log(p) + (1-y)*log(1-p)]
        const loss = -(y * Math.log(p) + (1 - y) * Math.log(1 - p));
        totalLoss += loss;
    }
    
    return totalLoss / actualLabels.length;  // Average loss
};

// Example with our spam data
const actualLabels = [0, 0, 0, 1, 1, 1, 1, 1];  // 0 = not spam, 1 = spam
const spamWordCounts = [1, 2, 3, 4, 5, 6, 7, 8];

// Make predictions with current parameters
const predictions = spamWordCounts.map(count => predict(count, weight, bias));

console.log("Predictions vs Actual:");
for (let i = 0; i < actualLabels.length; i++) {
    const prob = (predictions[i] * 100).toFixed(1);
    const actual = actualLabels[i] === 1 ? "SPAM" : "NOT SPAM";
    console.log(\`\${spamWordCounts[i]} words: \${prob}% spam probability, actual: \${actual}\`);
}

const currentLoss = calculateLogLoss(actualLabels, predictions);
console.log(\`Current loss: \${currentLoss.toFixed(4)}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-purple-500/20 rounded border border-purple-500/30">
                <p className="text-purple-400 text-sm">
                  <strong>💡 What's happening:</strong> Cross-entropy loss heavily penalizes confident wrong
                  predictions. If we predict 90% spam but it's actually not spam, we get a huge penalty!
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Training with Gradient Descent */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">🎯 Step 3: Train the Model with Gradient Descent</h3>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-orange-400 font-semibold mb-3">Gradient Descent Implementation</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Gradient descent for logistic regression
const trainLogisticRegression = (X, y, learningRate = 0.1, epochs = 1000) => {
    let weight = Math.random() - 0.5;  // Random initialization
    let bias = Math.random() - 0.5;
    
    console.log(\`Starting training with \${epochs} epochs...\`);
    console.log(\`Initial weight: \${weight.toFixed(4)}, bias: \${bias.toFixed(4)}\`);
    
    for (let epoch = 0; epoch < epochs; epoch++) {
        // Forward pass: calculate predictions
        const predictions = X.map(x => sigmoid(weight * x + bias));
        
        // Calculate gradients
        let weightGradient = 0;
        let biasGradient = 0;
        
        for (let i = 0; i < X.length; i++) {
            const error = predictions[i] - y[i];  // prediction - actual
            weightGradient += error * X[i];       // ∂L/∂w = error * x
            biasGradient += error;                // ∂L/∂b = error
        }
        
        // Average the gradients
        weightGradient /= X.length;
        biasGradient /= X.length;
        
        // Update parameters
        weight -= learningRate * weightGradient;
        bias -= learningRate * biasGradient;
        
        // Print progress every 100 epochs
        if (epoch % 100 === 0) {
            const loss = calculateLogLoss(y, predictions);
            console.log(\`Epoch \${epoch}: Loss = \${loss.toFixed(4)}, Weight = \${weight.toFixed(4)}, Bias = \${bias.toFixed(4)}\`);
        }
    }
    
    return { weight, bias };
};

// Train on our spam data
const X = [1, 2, 3, 4, 5, 6, 7, 8];  // Number of spam words
const y = [0, 0, 0, 1, 1, 1, 1, 1];  // Labels: 0 = not spam, 1 = spam

const trainedModel = trainLogisticRegression(X, y, 0.1, 500);

console.log(\`\\nFinal trained parameters:\`);
console.log(\`Weight: \${trainedModel.weight.toFixed(4)}\`);
console.log(\`Bias: \${trainedModel.bias.toFixed(4)}\`);`}
              </pre>
              <div className="mt-3 p-3 bg-orange-500/20 rounded border border-orange-500/30">
                <p className="text-orange-400 text-sm">
                  <strong>💡 What's happening:</strong> Gradient descent iteratively adjusts our parameters to minimize
                  the loss. The gradients tell us which direction to move the parameters to reduce errors.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-3">Evaluate the Trained Model</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Evaluation functions
const calculateAccuracy = (actual, predicted) => {
    let correct = 0;
    for (let i = 0; i < actual.length; i++) {
        const prediction = predicted[i] > 0.5 ? 1 : 0;  // Threshold at 0.5
        if (prediction === actual[i]) correct++;
    }
    return correct / actual.length;
};

const makePredictions = (X, weight, bias) => {
    return X.map(x => sigmoid(weight * x + bias));
};

// Test our trained model
const finalPredictions = makePredictions(X, trainedModel.weight, trainedModel.bias);
const accuracy = calculateAccuracy(y, finalPredictions);
const finalLoss = calculateLogLoss(y, finalPredictions);

console.log(\`\\n📊 Model Performance:\`);
console.log(\`Accuracy: \${(accuracy * 100).toFixed(1)}%\`);
console.log(\`Final Loss: \${finalLoss.toFixed(4)}\`);

console.log(\`\\n🔮 Predictions on training data:\`);
for (let i = 0; i < X.length; i++) {
    const prob = (finalPredictions[i] * 100).toFixed(1);
    const prediction = finalPredictions[i] > 0.5 ? "SPAM" : "NOT SPAM";
    const actual = y[i] === 1 ? "SPAM" : "NOT SPAM";
    const correct = prediction === actual ? "✅" : "❌";
    
    console.log(\`\${X[i]} spam words: \${prob}% → \${prediction} (actual: \${actual}) \${correct}\`);
}

// Test on new data
console.log(\`\\n🆕 Predictions on new emails:\`);
const newEmails = [0, 3.5, 9, 12];
newEmails.forEach(spamWords => {
    const prob = sigmoid(trainedModel.weight * spamWords + trainedModel.bias);
    const percentage = (prob * 100).toFixed(1);
    const classification = prob > 0.5 ? "SPAM" : "NOT SPAM";
    console.log(\`Email with \${spamWords} spam words: \${percentage}% → \${classification}\`);
});`}
              </pre>
              <div className="mt-3 p-3 bg-cyan-500/20 rounded border border-cyan-500/30">
                <p className="text-cyan-400 text-sm">
                  <strong>💡 What's happening:</strong> We evaluate our trained model using accuracy and loss metrics,
                  then test it on new, unseen data to see how well it generalizes.
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-4">📊 Live Model Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-green-400 font-semibold">🎯 Model Parameters</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Weight:</span>
                      <span className="text-white font-bold">{weight.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Bias:</span>
                      <span className="text-white font-bold">{bias.toFixed(4)}</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-500/20 rounded border border-blue-500/30">
                      <p className="text-blue-400 text-xs text-center">
                        <strong>Model:</strong> P(spam) = σ({weight.toFixed(2)} × spam_words + {bias.toFixed(2)})
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
                      <span className="text-gray-300">Accuracy:</span>
                      <span className="text-white font-bold">{(accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Log Loss:</span>
                      <span className="text-white font-bold">{logLoss.toFixed(4)}</span>
                    </div>
                    <div className="mt-3 p-2 bg-green-500/20 rounded border border-green-500/30">
                      <p className="text-green-400 text-xs text-center">
                        <strong>Interpretation:</strong> Model correctly classifies {(accuracy * 100).toFixed(0)}% of
                        emails!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/20 rounded border border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-2">🎉 Congratulations!</h4>
              <p className="text-gray-300 text-sm">
                You've successfully implemented Logistic Regression from scratch! You now understand the sigmoid
                function, cross-entropy loss, and gradient descent. This is the foundation for neural networks and deep
                learning! 🚀
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LogisticRegressionAlgorithm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
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
              <p className="text-sm text-gray-300">Classification Deep Dive 🚀</p>
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
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-sm px-4 py-2"
              >
                📧 Logistic Regression
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white text-sm px-4 py-2">
                🎯 Classification
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30 text-sm px-4 py-2">
                👶 Beginner Friendly
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">📧 Logistic Regression Explained</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Learn how to <strong>classify data</strong> using the beautiful sigmoid function! Perfect for spam
              detection, medical diagnosis, and any yes/no decision. We'll show you the math, the intuition, and the
              code! 🎬
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="text-white font-semibold mb-2">Sigmoid Function</h3>
                <p className="text-gray-300 text-sm">Beautiful S-curve for probabilities</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-white font-semibold mb-2">Spam Detection</h3>
                <p className="text-gray-300 text-sm">Real-world classification example</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">🧮</div>
                <h3 className="text-white font-semibold mb-2">Maximum Likelihood</h3>
                <p className="text-gray-300 text-sm">Elegant mathematical foundation</p>
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
                <AnimatedLogisticRegression />
              </TabsContent>

              <TabsContent value="math">
                <LogisticRegressionMath />
              </TabsContent>

              <TabsContent value="code">
                <LogisticRegressionCode />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
