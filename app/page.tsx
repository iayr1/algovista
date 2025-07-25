"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Layers, Zap, Target, BarChart3, Network, Cpu, Play, BookOpen } from "lucide-react"

const algorithmCategories = [
  {
    id: "supervised",
    title: "Supervised Learning",
    description: "Learn from labeled data to make predictions",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    count: 6,
    algorithms: [
      { id: "linear-regression", name: "Linear Regression", difficulty: "Beginner" },
      { id: "logistic-regression", name: "Logistic Regression", difficulty: "Beginner" },
      { id: "decision-trees", name: "Decision Trees", difficulty: "Beginner" },
      { id: "random-forest", name: "Random Forest", difficulty: "Intermediate" },
      { id: "xgboost", name: "XGBoost", difficulty: "Advanced" },
      { id: "svm", name: "Support Vector Machine", difficulty: "Intermediate" },
    ],
  },
  {
    id: "unsupervised",
    title: "Unsupervised Learning",
    description: "Discover hidden patterns in unlabeled data",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    count: 4,
    algorithms: [
      { id: "k-means", name: "K-Means Clustering", difficulty: "Beginner" },
      { id: "hierarchical", name: "Hierarchical Clustering", difficulty: "Intermediate" },
      { id: "pca", name: "Principal Component Analysis", difficulty: "Intermediate" },
      { id: "dbscan", name: "DBSCAN", difficulty: "Intermediate" },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Neural networks that mimic the human brain",
    icon: Brain,
    color: "from-green-500 to-emerald-500",
    count: 4,
    algorithms: [
      { id: "ann", name: "Artificial Neural Network", difficulty: "Intermediate" },
      { id: "cnn", name: "Convolutional Neural Network", difficulty: "Advanced" },
      { id: "rnn", name: "Recurrent Neural Network", difficulty: "Advanced" },
      { id: "lstm", name: "Long Short-Term Memory", difficulty: "Advanced" },
    ],
  },
  {
    id: "reinforcement",
    title: "Reinforcement Learning",
    description: "Learn through interaction and rewards",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    count: 5,
    algorithms: [
      { id: "q-learning", name: "Q-Learning", difficulty: "Intermediate" },
      { id: "dqn", name: "Deep Q-Network", difficulty: "Advanced" },
      { id: "ppo", name: "Proximal Policy Optimization", difficulty: "Advanced" },
      { id: "actor-critic", name: "Actor-Critic", difficulty: "Advanced" },
      { id: "sarsa", name: "SARSA", difficulty: "Intermediate" },
    ],
  },
  {
    id: "model-selection",
    title: "Model Selection & Evaluation",
    description: "Optimize and evaluate model performance",
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-500",
    count: 3,
    algorithms: [
      { id: "cross-validation", name: "Cross Validation", difficulty: "Beginner" },
      { id: "grid-search", name: "Grid Search", difficulty: "Intermediate" },
      { id: "bayesian-optimization", name: "Bayesian Optimization", difficulty: "Advanced" },
    ],
  },
  {
    id: "nlp",
    title: "NLP & Probabilistic Models",
    description: "Process and understand human language",
    icon: Network,
    color: "from-teal-500 to-blue-500",
    count: 4,
    algorithms: [
      { id: "word2vec", name: "Word2Vec", difficulty: "Intermediate" },
      { id: "bert", name: "BERT", difficulty: "Advanced" },
      { id: "gpt", name: "GPT (Transformer)", difficulty: "Advanced" },
      { id: "hmm", name: "Hidden Markov Models", difficulty: "Intermediate" },
    ],
  },
]

const featuredProjects = [
  {
    title: "House Price Prediction",
    description: "Predict real estate prices using Linear Regression with Boston Housing dataset",
    algorithm: "Linear Regression",
    dataset: "Boston Housing",
    difficulty: "Beginner",
    color: "from-blue-500 to-cyan-500",
    href: "/projects/house-prices",
    icon: "🏠",
  },
  {
    title: "Customer Segmentation",
    description: "Segment customers using K-Means clustering on retail transaction data",
    algorithm: "K-Means Clustering",
    dataset: "Retail Transactions",
    difficulty: "Intermediate",
    color: "from-purple-500 to-pink-500",
    href: "/projects/customer-segmentation",
    icon: "👥",
  },
  {
    title: "Email Spam Detection",
    description: "Classify emails as spam/ham using Naive Bayes and text processing",
    algorithm: "Naive Bayes",
    dataset: "Email Dataset",
    difficulty: "Intermediate",
    color: "from-green-500 to-emerald-500",
    href: "/projects/spam-detection",
    icon: "📧",
  },
  {
    title: "Image Recognition",
    description: "Classify handwritten digits using Convolutional Neural Networks",
    algorithm: "CNN",
    dataset: "MNIST Digits",
    difficulty: "Advanced",
    color: "from-indigo-500 to-purple-500",
    href: "/projects/digit-classification",
    icon: "🖼️",
  },
  {
    title: "Stock Price Prediction",
    description: "Predict stock prices using LSTM neural networks with historical data",
    algorithm: "LSTM",
    dataset: "Stock Market Data",
    difficulty: "Advanced",
    color: "from-orange-500 to-red-500",
    href: "/projects/stock-prediction",
    icon: "📈",
  },
  {
    title: "Chatbot with NLP",
    description: "Build an intelligent chatbot using transformer models and NLP",
    algorithm: "GPT/BERT",
    dataset: "Conversation Data",
    difficulty: "Advanced",
    color: "from-teal-500 to-blue-500",
    href: "/projects/chatbot",
    icon: "🤖",
  },
]

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AlgoVista</h1>
                <p className="text-sm text-gray-300">Complete ML Algorithm Visualization Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/glossary">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <BookOpen className="w-4 h-4 mr-2" />
                  ML Glossary
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Master Machine Learning
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Learn 26+ machine learning algorithms through <strong>interactive visualizations</strong>,
              <strong>step-by-step explanations</strong>, and <strong>real-world projects</strong>. Perfect for
              teenagers and beginners! 🚀
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2">
                🎬 Animated Visualizations
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2">
                🧮 Math Made Simple
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2">
                💻 Code Examples
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2">
                🎯 Real Projects
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400">26+</div>
                <div className="text-sm text-gray-300">Algorithms</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-cyan-400">6</div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-pink-400">15+</div>
                <div className="text-sm text-gray-300">Projects</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-sm text-gray-300">Interactive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">🎯 Explore Algorithm Categories</h3>
            <p className="text-gray-300 text-lg">Choose a category to dive deep into specific algorithms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithmCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <Card
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full"
                    onMouseEnter={() => setHoveredCard(category.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                          {category.count} algorithms
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">{category.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-400 mb-3">Featured algorithms:</p>
                        <div className="space-y-2">
                          {category.algorithms.slice(0, 3).map((algo, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">{algo.name}</span>
                              <Badge
                                variant="outline"
                                className={`text-xs border-white/20 ${
                                  algo.difficulty === "Beginner"
                                    ? "text-green-400 border-green-400/30"
                                    : algo.difficulty === "Intermediate"
                                      ? "text-yellow-400 border-yellow-400/30"
                                      : "text-red-400 border-red-400/30"
                                }`}
                              >
                                {algo.difficulty}
                              </Badge>
                            </div>
                          ))}
                          {category.algorithms.length > 3 && (
                            <div className="text-xs text-gray-400">
                              +{category.algorithms.length - 3} more algorithms
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 group-hover:border-purple-400/50"
                        >
                          Explore Category
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">🚀 Real-World Projects</h3>
            <p className="text-gray-300 text-lg">Complete ML projects with real datasets and detailed workflows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link key={index} href={project.href}>
                <Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-3xl">{project.icon}</div>
                      <Badge
                        variant="outline"
                        className={`border-white/20 text-xs ${
                          project.difficulty === "Beginner"
                            ? "text-green-400 border-green-400/30"
                            : project.difficulty === "Intermediate"
                              ? "text-yellow-400 border-yellow-400/30"
                              : "text-red-400 border-red-400/30"
                        }`}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>

                    <CardTitle className="text-white text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </CardTitle>

                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Algorithm:</span>
                        <Badge
                          variant="secondary"
                          className={`bg-gradient-to-r ${project.color} text-white border-0 text-xs`}
                        >
                          {project.algorithm}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Dataset:</span>
                        <span className="text-sm text-gray-300">{project.dataset}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 group-hover:border-purple-400/50"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-8">🎓 Recommended Learning Path</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">👶</div>
                  <h4 className="text-white font-semibold mb-2">1. Beginner</h4>
                  <p className="text-green-100 text-sm">Linear Regression, K-Means, Decision Trees</p>
                </div>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gray-800 text-sm">→</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🧑‍🎓</div>
                  <h4 className="text-white font-semibold mb-2">2. Intermediate</h4>
                  <p className="text-yellow-100 text-sm">SVM, Random Forest, Neural Networks</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gray-800 text-sm">→</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="text-white font-semibold mb-2">3. Advanced</h4>
                  <p className="text-purple-100 text-sm">Deep Learning, CNNs, RNNs, Transformers</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gray-800 text-sm">→</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🏆</div>
                  <h4 className="text-white font-semibold mb-2">4. Expert</h4>
                  <p className="text-cyan-100 text-sm">Reinforcement Learning, Custom Models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-8">✨ Why Choose AlgoVista?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <Layers className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">🎬 Interactive Learning</h4>
                <p className="text-gray-300">
                  Watch algorithms come to life with beautiful animations and interactive demos. Adjust parameters and
                  see results in real-time!
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">🧮 Math Made Simple</h4>
                <p className="text-gray-300">
                  Complex mathematical concepts explained in simple terms with step-by-step derivations and visual
                  examples.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <Target className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibent text-white mb-2">🎯 Real-World Focus</h4>
                <p className="text-gray-300">
                  Learn through practical projects with real datasets. Build a portfolio of machine learning projects
                  you can be proud of!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 backdrop-blur-sm bg-white/5 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">AlgoVista</span>
                <p className="text-sm text-gray-400">Master ML through visualization</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">Built with ❤️ for aspiring data scientists • © 2024 AlgoVista</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
