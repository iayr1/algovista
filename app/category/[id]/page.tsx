"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Play, Code, Lightbulb, TrendingUp, Target, BarChart3, Zap, Network } from "lucide-react"

const categoryData = {
  supervised: {
    title: "Supervised Learning Algorithms",
    description: "Learn from labeled data to make predictions on new, unseen data",
    color: "from-blue-500 to-cyan-500",
    icon: Target,
    algorithms: [
      {
        id: "linear-regression",
        name: "Linear Regression",
        type: "Regression",
        difficulty: "Beginner",
        description:
          "🏠 Finds the best straight line through data points to predict continuous values like house prices",
        useCase: "House prices, sales forecasting, temperature prediction",
        mathConcept: "y = mx + b (slope-intercept form)",
        keyPoints: ["Perfect for beginners", "Highly interpretable", "Works with linear relationships"],
        timeToLearn: "30 minutes",
        emoji: "📈",
      },
      {
        id: "logistic-regression",
        name: "Logistic Regression",
        type: "Classification",
        difficulty: "Beginner",
        description: "📧 Uses sigmoid function to predict probability of binary outcomes like spam/not spam",
        useCase: "Email spam detection, medical diagnosis, pass/fail prediction",
        mathConcept: "p = 1/(1 + e^(-z)) where z = mx + b",
        keyPoints: ["Outputs probabilities", "Great for binary classification", "Easy to interpret"],
        timeToLearn: "45 minutes",
        emoji: "📊",
      },
      {
        id: "decision-trees",
        name: "Decision Trees",
        type: "Both",
        difficulty: "Beginner",
        description: "🌳 Creates a tree of if-else conditions to make decisions, like a flowchart",
        useCase: "Medical diagnosis, loan approval, customer segmentation",
        mathConcept: "Gini Impurity = 1 - Σ(pi)²",
        keyPoints: ["Highly interpretable", "Handles mixed data types", "No need for scaling"],
        timeToLearn: "1 hour",
        emoji: "🌳",
      },
      {
        id: "random-forest",
        name: "Random Forest",
        type: "Ensemble",
        difficulty: "Intermediate",
        description: "🌲 Combines many decision trees to make more accurate predictions (wisdom of crowds)",
        useCase: "Feature selection, complex pattern recognition, robust predictions",
        mathConcept: "Majority voting for classification, averaging for regression",
        keyPoints: ["Reduces overfitting", "Provides feature importance", "Very robust"],
        timeToLearn: "1.5 hours",
        emoji: "🌲",
      },
      {
        id: "xgboost",
        name: "XGBoost",
        type: "Ensemble",
        difficulty: "Advanced",
        description: "🚀 Gradient boosting algorithm that builds models sequentially, fixing previous mistakes",
        useCase: "Kaggle competitions, structured data problems, high-performance needs",
        mathConcept: "Gradient descent + regularization + boosting",
        keyPoints: ["Interview favorite", "Handles missing values", "Highly optimized"],
        timeToLearn: "2 hours",
        emoji: "🚀",
      },
      {
        id: "svm",
        name: "Support Vector Machine",
        type: "Classification",
        difficulty: "Intermediate",
        description: "⚔️ Finds optimal boundary between classes using support vectors and kernel tricks",
        useCase: "Text classification, image recognition, high-dimensional data",
        mathConcept: "Maximize margin: min ||w||² subject to yi(w·xi + b) ≥ 1",
        keyPoints: ["Kernel trick for non-linear", "Memory efficient", "Works with high dimensions"],
        timeToLearn: "1.5 hours",
        emoji: "⚔️",
      },
    ],
  },
  unsupervised: {
    title: "Unsupervised Learning Algorithms",
    description: "Discover hidden patterns and structures in unlabeled data",
    color: "from-purple-500 to-pink-500",
    icon: BarChart3,
    algorithms: [
      {
        id: "k-means",
        name: "K-Means Clustering",
        type: "Clustering",
        difficulty: "Beginner",
        description: "👥 Groups data into k clusters by finding natural groupings in your data",
        useCase: "Customer segmentation, image compression, market research",
        mathConcept: "Minimize Σ||xi - μj||² where μj is cluster centroid",
        keyPoints: ["Easy to understand", "Fast and efficient", "Works well with spherical clusters"],
        timeToLearn: "45 minutes",
        emoji: "👥",
      },
      {
        id: "hierarchical",
        name: "Hierarchical Clustering",
        type: "Clustering",
        difficulty: "Intermediate",
        description: "🌳 Creates tree-like cluster hierarchy using dendrograms, like a family tree",
        useCase: "Phylogenetic analysis, social network analysis, taxonomy",
        mathConcept: "Linkage criteria: single, complete, average, Ward",
        keyPoints: ["No need to specify k", "Creates dendrograms", "Shows cluster relationships"],
        timeToLearn: "1 hour",
        emoji: "🌳",
      },
      {
        id: "pca",
        name: "Principal Component Analysis",
        type: "Dimensionality Reduction",
        difficulty: "Intermediate",
        description: "📐 Reduces dimensions while preserving maximum variance, like finding the best camera angle",
        useCase: "Data visualization, feature reduction, noise removal",
        mathConcept: "Eigenvalue decomposition of covariance matrix",
        keyPoints: ["Linear transformation", "Preserves variance", "Components are orthogonal"],
        timeToLearn: "1.5 hours",
        emoji: "📐",
      },
      {
        id: "dbscan",
        name: "DBSCAN",
        type: "Clustering",
        difficulty: "Intermediate",
        description: "🔍 Density-based clustering that can find arbitrary shaped clusters and detect outliers",
        useCase: "Anomaly detection, image processing, finding clusters of any shape",
        mathConcept: "Core points: |N(p)| ≥ minPts within ε distance",
        keyPoints: ["Handles noise", "Finds arbitrary shapes", "No need to specify k"],
        timeToLearn: "1 hour",
        emoji: "🔍",
      },
    ],
  },
  "deep-learning": {
    title: "Deep Learning Algorithms",
    description: "Neural networks that learn complex patterns through multiple layers",
    color: "from-green-500 to-emerald-500",
    icon: Brain,
    algorithms: [
      {
        id: "ann",
        name: "Artificial Neural Network",
        type: "Foundation",
        difficulty: "Intermediate",
        description: "🧠 Basic neural network with interconnected nodes (neurons) that mimic the brain",
        useCase: "Pattern recognition, function approximation, classification",
        mathConcept: "y = f(Σ(wi·xi) + b) where f is activation function",
        keyPoints: ["Universal function approximator", "Foundation for deep learning", "Learns complex patterns"],
        timeToLearn: "2 hours",
        emoji: "🧠",
      },
      {
        id: "cnn",
        name: "Convolutional Neural Network",
        type: "Computer Vision",
        difficulty: "Advanced",
        description: "👁️ Uses convolution operations to detect features in images, like edge detection",
        useCase: "Image classification, object detection, medical imaging",
        mathConcept: "Convolution: (f * g)(t) = ∫f(τ)g(t-τ)dτ",
        keyPoints: ["Translation invariant", "Parameter sharing", "Hierarchical features"],
        timeToLearn: "3 hours",
        emoji: "👁️",
      },
      {
        id: "rnn",
        name: "Recurrent Neural Network",
        type: "Sequential Data",
        difficulty: "Advanced",
        description: "🔄 Processes sequential data with memory of previous inputs, like reading a story",
        useCase: "Language modeling, time series prediction, speech recognition",
        mathConcept: "ht = f(Wxh·xt + Whh·ht-1 + bh)",
        keyPoints: ["Handles sequences", "Has memory", "Good for time series"],
        timeToLearn: "2.5 hours",
        emoji: "🔄",
      },
      {
        id: "lstm",
        name: "Long Short-Term Memory",
        type: "Sequential Data",
        difficulty: "Advanced",
        description: "🧠💾 Advanced RNN that can learn long-term dependencies using gates",
        useCase: "Machine translation, speech recognition, long sequence modeling",
        mathConcept: "Gates: forget, input, output control information flow",
        keyPoints: ["Solves vanishing gradients", "Long-term memory", "Complex but powerful"],
        timeToLearn: "3 hours",
        emoji: "🧠",
      },
    ],
  },
  reinforcement: {
    title: "Reinforcement Learning Algorithms",
    description: "Learn through interaction and rewards, like training a pet",
    color: "from-orange-500 to-red-500",
    icon: Zap,
    algorithms: [
      {
        id: "q-learning",
        name: "Q-Learning",
        type: "Value-Based",
        difficulty: "Intermediate",
        description: "🎮 Learns optimal actions by building a Q-table of state-action values",
        useCase: "Game playing, robot navigation, resource allocation",
        mathConcept: "Q(s,a) = Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]",
        keyPoints: ["Model-free learning", "Learns optimal policy", "Works with discrete spaces"],
        timeToLearn: "2 hours",
        emoji: "🎮",
      },
      {
        id: "dqn",
        name: "Deep Q-Network",
        type: "Value-Based",
        difficulty: "Advanced",
        description: "🤖 Combines Q-Learning with deep neural networks for complex environments",
        useCase: "Atari games, complex game playing, high-dimensional states",
        mathConcept: "Neural network approximates Q(s,a) function",
        keyPoints: ["Handles high dimensions", "Experience replay", "Target networks"],
        timeToLearn: "3 hours",
        emoji: "🤖",
      },
      {
        id: "ppo",
        name: "Proximal Policy Optimization",
        type: "Policy-Based",
        difficulty: "Advanced",
        description: "🎯 Directly optimizes policy while preventing large updates that could hurt performance",
        useCase: "Robotics, continuous control, stable training",
        mathConcept: "Clipped surrogate objective function",
        keyPoints: ["Stable training", "Good sample efficiency", "Works with continuous actions"],
        timeToLearn: "3.5 hours",
        emoji: "🎯",
      },
      {
        id: "actor-critic",
        name: "Actor-Critic",
        type: "Hybrid",
        difficulty: "Advanced",
        description: "🎭 Combines value-based and policy-based methods using actor and critic networks",
        useCase: "Continuous control, robotics, complex environments",
        mathConcept: "Actor updates policy, Critic estimates value function",
        keyPoints: ["Combines best of both worlds", "Lower variance", "More stable"],
        timeToLearn: "3 hours",
        emoji: "🎭",
      },
      {
        id: "sarsa",
        name: "SARSA",
        type: "Value-Based",
        difficulty: "Intermediate",
        description: "🛡️ On-policy learning that updates based on actual actions taken (more conservative)",
        useCase: "Safe navigation, risk-averse applications, online learning",
        mathConcept: "Q(s,a) = Q(s,a) + α[r + γ Q(s',a') - Q(s,a)]",
        keyPoints: ["On-policy learning", "More conservative", "Learns actual policy"],
        timeToLearn: "2 hours",
        emoji: "🛡️",
      },
    ],
  },
  "model-selection": {
    title: "Model Selection & Evaluation",
    description: "Optimize and evaluate model performance",
    color: "from-indigo-500 to-purple-500",
    icon: TrendingUp,
    algorithms: [
      {
        id: "cross-validation",
        name: "Cross Validation",
        type: "Evaluation",
        difficulty: "Beginner",
        description: "✅ Tests model performance by splitting data multiple ways to get reliable estimates",
        useCase: "Model evaluation, hyperparameter tuning, performance estimation",
        mathConcept: "k-fold: split data into k parts, train on k-1, test on 1",
        keyPoints: ["Reliable performance estimates", "Reduces overfitting", "Standard practice"],
        timeToLearn: "1 hour",
        emoji: "✅",
      },
      {
        id: "grid-search",
        name: "Grid Search",
        type: "Optimization",
        difficulty: "Intermediate",
        description: "🔍 Systematically tests all combinations of hyperparameters to find the best ones",
        useCase: "Hyperparameter tuning, model optimization, finding best settings",
        mathConcept: "Exhaustive search over parameter grid",
        keyPoints: ["Finds optimal parameters", "Systematic approach", "Can be computationally expensive"],
        timeToLearn: "1 hour",
        emoji: "🔍",
      },
      {
        id: "bayesian-optimization",
        name: "Bayesian Optimization",
        type: "Optimization",
        difficulty: "Advanced",
        description: "🧠 Smart hyperparameter search that learns from previous trials to find optimal settings faster",
        useCase: "Expensive model tuning, neural network optimization, efficient search",
        mathConcept: "Gaussian processes + acquisition functions",
        keyPoints: ["More efficient than grid search", "Learns from previous trials", "Good for expensive evaluations"],
        timeToLearn: "2.5 hours",
        emoji: "🧠",
      },
    ],
  },
  nlp: {
    title: "NLP & Probabilistic Models",
    description: "Process and understand human language",
    color: "from-teal-500 to-blue-500",
    icon: Network,
    algorithms: [
      {
        id: "word2vec",
        name: "Word2Vec",
        type: "Embeddings",
        difficulty: "Intermediate",
        description: "📝 Converts words into numerical vectors that capture semantic meaning and relationships",
        useCase: "Text analysis, semantic similarity, language understanding",
        mathConcept: "Skip-gram or CBOW neural network training",
        keyPoints: ["Captures word relationships", "Dense vector representations", "Foundation for NLP"],
        timeToLearn: "2 hours",
        emoji: "📝",
      },
      {
        id: "bert",
        name: "BERT",
        type: "Transformer",
        difficulty: "Advanced",
        description: "🤖 Bidirectional transformer that understands context from both directions in text",
        useCase: "Question answering, text classification, language understanding",
        mathConcept: "Bidirectional transformer with masked language modeling",
        keyPoints: ["Bidirectional context", "Pre-trained on large corpus", "State-of-the-art results"],
        timeToLearn: "4 hours",
        emoji: "🤖",
      },
      {
        id: "gpt",
        name: "GPT (Transformer)",
        type: "Generative",
        difficulty: "Advanced",
        description: "✨ Generative transformer that can create human-like text by predicting next words",
        useCase: "Text generation, chatbots, creative writing, code generation",
        mathConcept: "Autoregressive transformer with self-attention",
        keyPoints: ["Generates coherent text", "Scales with data and compute", "Foundation for ChatGPT"],
        timeToLearn: "4 hours",
        emoji: "✨",
      },
      {
        id: "hmm",
        name: "Hidden Markov Models",
        type: "Probabilistic",
        difficulty: "Intermediate",
        description: "🔮 Models sequences where the true state is hidden but we can observe some evidence",
        useCase: "Speech recognition, part-of-speech tagging, bioinformatics",
        mathConcept: "P(observation|hidden_state) × P(hidden_state|previous_state)",
        keyPoints: ["Models hidden states", "Good for sequences", "Probabilistic framework"],
        timeToLearn: "2.5 hours",
        emoji: "🔮",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string
  const category = categoryData[categoryId as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = category.icon

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
                Back to Home
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">{category.algorithms.length} algorithms</p>
            </div>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-6`}>
              <IconComponent className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Algorithms Grid */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.algorithms.map((algorithm) => (
              <Link key={algorithm.id} href={`/algorithm/${algorithm.id}`}>
                <Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{algorithm.emoji}</span>
                        <Badge variant="secondary" className={`bg-gradient-to-r ${category.color} text-white border-0`}>
                          {algorithm.type}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className={`border-white/20 text-xs ${
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

                    <CardTitle className="text-white text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {algorithm.name}
                    </CardTitle>

                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                      {algorithm.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Use Case:</p>
                          <p className="text-sm text-gray-300">{algorithm.useCase}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Code className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Math Concept:</p>
                          <p className="text-sm text-gray-300 font-mono text-xs">{algorithm.mathConcept}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Time to Learn:</p>
                          <p className="text-sm text-green-400 font-semibold">{algorithm.timeToLearn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-gray-400 mb-2">Key Points:</p>
                      <div className="flex flex-wrap gap-1">
                        {algorithm.keyPoints.slice(0, 2).map((point, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-white/5 border-white/20 text-gray-300"
                          >
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 group-hover:border-purple-400/50"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
