"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Users, ShoppingCart, TrendingUp, Target } from "lucide-react"

// Simulated customer data
const customerData = [
  { id: 1, annual_spending: 15000, frequency: 12, recency: 30, age: 35, cluster: 0 },
  { id: 2, annual_spending: 45000, frequency: 24, recency: 5, age: 42, cluster: 1 },
  { id: 3, annual_spending: 8000, frequency: 6, recency: 90, age: 28, cluster: 2 },
  { id: 4, annual_spending: 32000, frequency: 18, recency: 15, age: 38, cluster: 1 },
  { id: 5, annual_spending: 5000, frequency: 3, recency: 180, age: 65, cluster: 2 },
  { id: 6, annual_spending: 52000, frequency: 30, recency: 2, age: 45, cluster: 1 },
  { id: 7, annual_spending: 12000, frequency: 8, recency: 45, age: 32, cluster: 0 },
  { id: 8, annual_spending: 3000, frequency: 2, recency: 365, age: 70, cluster: 2 },
]

const CustomerSegmentationViz = () => {
  const [k, setK] = useState([3])
  const [selectedFeatures, setSelectedFeatures] = useState(["annual_spending", "frequency"])

  const clusterColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]
  const clusterNames = ["Regular Customers", "VIP Customers", "At-Risk Customers", "New Customers", "Occasional Buyers"]

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Customer Segmentation Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">
            Segment customers based on purchasing behavior using K-Means clustering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Number of Segments: {k[0]}</label>
              <Slider value={k} onValueChange={setK} max={5} min={2} step={1} />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Feature Selection</label>
              <div className="flex flex-wrap gap-2">
                {["annual_spending", "frequency", "recency", "age"].map((feature) => (
                  <Button
                    key={feature}
                    variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedFeatures.includes(feature)) {
                        setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
                      } else {
                        setSelectedFeatures([...selectedFeatures, feature])
                      }
                    }}
                    className="text-xs"
                  >
                    {feature.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scatter Plot */}
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-4">Customer Segments</h4>
              <svg viewBox="0 0 400 300" className="w-full h-64">
                {/* Grid */}
                <defs>
                  <pattern id="customer-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#customer-grid)" />

                {/* Axes */}
                <line x1="40" y1="260" x2="360" y2="260" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="40" y1="260" x2="40" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                {/* Data points */}
                {customerData.map((customer, index) => (
                  <circle
                    key={index}
                    cx={40 + (customer.annual_spending / 60000) * 320}
                    cy={260 - (customer.frequency / 35) * 220}
                    r="6"
                    fill={clusterColors[customer.cluster % k[0]]}
                    stroke="white"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                ))}

                {/* Labels */}
                <text x="200" y="285" textAnchor="middle" fill="white" fontSize="12">
                  Annual Spending ($)
                </text>
                <text x="20" y="150" textAnchor="middle" fill="white" fontSize="12" transform="rotate(-90 20 150)">
                  Purchase Frequency
                </text>
              </svg>
            </div>

            {/* Cluster Summary */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Segment Profiles</h4>
              {Array.from({ length: k[0] }, (_, i) => {
                const clusterCustomers = customerData.filter((c) => c.cluster === i)
                const avgSpending =
                  clusterCustomers.reduce((sum, c) => sum + c.annual_spending, 0) / clusterCustomers.length || 0
                const avgFrequency =
                  clusterCustomers.reduce((sum, c) => sum + c.frequency, 0) / clusterCustomers.length || 0

                return (
                  <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: clusterColors[i] }}></div>
                      <h5 className="text-white font-semibold">{clusterNames[i]}</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Avg Spending:</span>
                        <span className="text-white ml-2">${avgSpending.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Avg Frequency:</span>
                        <span className="text-white ml-2">{avgFrequency.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white ml-2">{clusterCustomers.length} customers</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue %:</span>
                        <span className="text-white ml-2">
                          {(
                            ((avgSpending * clusterCustomers.length) /
                              customerData.reduce((sum, c) => sum + c.annual_spending, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Business Insights */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
            <h4 className="text-white font-semibold mb-4">Business Insights & Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h5 className="text-blue-400 font-semibold">Regular Customers</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Moderate spenders with consistent purchase patterns. Focus on loyalty programs and cross-selling.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h5 className="text-red-400 font-semibold">VIP Customers</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  High-value customers with frequent purchases. Provide premium service and exclusive offers.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h5 className="text-green-400 font-semibold">At-Risk Customers</h5>
                </div>
                <p className="text-gray-300 text-sm">
                  Low engagement and spending. Implement win-back campaigns and special promotions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CustomerSegmentationProject() {
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
            <Link href="/" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">AlgoVista</h1>
              <p className="text-sm text-gray-300">Customer Analytics Project</p>
            </div>
          </div>
        </div>
      </header>

      {/* Project Header */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                K-Means Clustering
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                Unsupervised Learning
              </Badge>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                Intermediate
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Customer Segmentation</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Discover customer segments using K-Means clustering on retail transaction data. Learn RFM analysis,
              customer lifetime value, and targeted marketing strategies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-white font-semibold">Dataset</h3>
                <p className="text-gray-300 text-sm">Retail Customer Transactions (10K+ records)</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <Target className="w-8 h-8 text-pink-400 mb-2" />
                <h3 className="text-white font-semibold">Algorithm</h3>
                <p className="text-gray-300 text-sm">K-Means Clustering with RFM features</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
                <h3 className="text-white font-semibold">Goal</h3>
                <p className="text-gray-300 text-sm">Identify customer segments for targeted marketing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="interactive" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="interactive" className="data-[state=active]:bg-white/10">
                  <Play className="w-4 h-4 mr-2" />
                  Interactive
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-white/10">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Data Analysis
                </TabsTrigger>
                <TabsTrigger value="rfm" className="data-[state=active]:bg-white/10">
                  RFM Analysis
                </TabsTrigger>
                <TabsTrigger value="clustering" className="data-[state=active]:bg-white/10">
                  Clustering
                </TabsTrigger>
                <TabsTrigger value="strategy" className="data-[state=active]:bg-white/10">
                  Strategy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="interactive">
                <CustomerSegmentationViz />
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Dataset Overview</CardTitle>
                    <CardDescription className="text-gray-300">
                      Retail customer transaction data with purchase history and demographics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Customer Distribution */}
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Customer Value Distribution</h4>
                        <svg viewBox="0 0 400 200" className="w-full h-48">
                          {/* Histogram bars for customer value */}
                          {[
                            { x: 20, height: 120, label: "$0-10K" },
                            { x: 70, height: 80, label: "$10-20K" },
                            { x: 120, height: 100, label: "$20-30K" },
                            { x: 170, height: 60, label: "$30-40K" },
                            { x: 220, height: 40, label: "$40-50K" },
                            { x: 270, height: 25, label: "$50K+" },
                          ].map((bar, index) => (
                            <g key={index}>
                              <rect
                                x={bar.x}
                                y={180 - bar.height}
                                width="40"
                                height={bar.height}
                                fill="#8b5cf6"
                                opacity="0.7"
                              />
                              <text x={bar.x + 20} y={195} textAnchor="middle" fill="white" fontSize="10">
                                {bar.label}
                              </text>
                            </g>
                          ))}
                          {/* Axes */}
                          <line x1="20" y1="180" x2="320" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                          <line x1="20" y1="180" x2="20" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        </svg>
                      </div>

                      {/* Purchase Frequency */}
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Purchase Frequency Patterns</h4>
                        <svg viewBox="0 0 400 200" className="w-full h-48">
                          {/* Line chart for frequency over time */}
                          <polyline
                            points="20,160 60,140 100,120 140,100 180,90 220,85 260,80 300,75 340,70"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          {/* Data points */}
                          {[
                            { x: 20, y: 160 },
                            { x: 60, y: 140 },
                            { x: 100, y: 120 },
                            { x: 140, y: 100 },
                            { x: 180, y: 90 },
                            { x: 220, y: 85 },
                            { x: 260, y: 80 },
                            { x: 300, y: 75 },
                            { x: 340, y: 70 },
                          ].map((point, index) => (
                            <circle
                              key={index}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#10b981"
                              stroke="white"
                              strokeWidth="2"
                            />
                          ))}
                          {/* Axes */}
                          <line x1="20" y1="180" x2="360" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                          <line x1="20" y1="180" x2="20" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                          <text x="190" y="195" textAnchor="middle" fill="white" fontSize="12">
                            Time (Months)
                          </text>
                          <text
                            x="10"
                            y="110"
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            transform="rotate(-90 10 110)"
                          >
                            Frequency
                          </text>
                        </svg>
                      </div>
                    </div>

                    {/* Sample Data Table */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">Sample Customer Data</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left text-gray-300 p-2">Customer ID</th>
                              <th className="text-left text-gray-300 p-2">Annual Spending</th>
                              <th className="text-left text-gray-300 p-2">Frequency</th>
                              <th className="text-left text-gray-300 p-2">Recency (Days)</th>
                              <th className="text-left text-gray-300 p-2">Age</th>
                              <th className="text-left text-gray-300 p-2">Segment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerData.slice(0, 6).map((customer, index) => (
                              <tr key={index} className="border-b border-white/5">
                                <td className="text-gray-300 p-2">{customer.id}</td>
                                <td className="text-gray-300 p-2">${customer.annual_spending.toLocaleString()}</td>
                                <td className="text-gray-300 p-2">{customer.frequency}</td>
                                <td className="text-gray-300 p-2">{customer.recency}</td>
                                <td className="text-gray-300 p-2">{customer.age}</td>
                                <td className="text-gray-300 p-2">
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-white/20"
                                    style={{ color: ["#3b82f6", "#ef4444", "#10b981"][customer.cluster] }}
                                  >
                                    {["Regular", "VIP", "At-Risk"][customer.cluster]}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rfm" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">RFM Analysis Implementation</CardTitle>
                    <CardDescription className="text-gray-300">
                      Recency, Frequency, and Monetary analysis for customer segmentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">RFM Score Calculation</h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Load transaction data
df = pd.read_csv('customer_transactions.csv')

# Calculate RFM metrics
current_date = datetime.now()

rfm = df.groupby('customer_id').agg({
    'order_date': lambda x: (current_date - x.max()).days,  # Recency
    'order_id': 'count',                                    # Frequency
    'total_amount': 'sum'                                   # Monetary
}).reset_index()

rfm.columns = ['customer_id', 'recency', 'frequency', 'monetary']

# Create RFM scores (1-5 scale)
rfm['r_score'] = pd.qcut(rfm['recency'], 5, labels=[5,4,3,2,1])
rfm['f_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['m_score'] = pd.qcut(rfm['monetary'], 5, labels=[1,2,3,4,5])

# Combine scores
rfm['rfm_score'] = rfm['r_score'].astype(str) + rfm['f_score'].astype(str) + rfm['m_score'].astype(str)

print(rfm.head())`}
                          </pre>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Customer Segmentation Rules</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                            <h5 className="text-blue-400 font-semibold mb-2">Champions (555, 554, 544)</h5>
                            <p className="text-gray-300 text-sm">Recent buyers, frequent purchasers, high spenders</p>
                          </div>
                          <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                            <h5 className="text-green-400 font-semibold mb-2">Loyal Customers (543, 444, 435)</h5>
                            <p className="text-gray-300 text-sm">Regular buyers with good monetary value</p>
                          </div>
                          <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                            <h5 className="text-yellow-400 font-semibold mb-2">Potential Loyalists (512, 511, 422)</h5>
                            <p className="text-gray-300 text-sm">
                              Recent customers with potential to increase frequency
                            </p>
                          </div>
                          <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                            <h5 className="text-red-400 font-semibold mb-2">At Risk (155, 144, 214)</h5>
                            <p className="text-gray-300 text-sm">Haven't purchased recently, need win-back campaigns</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RFM Distribution */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-white font-semibold mb-4">RFM Score Distribution</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <h5 className="text-blue-400 font-semibold mb-2">Recency</h5>
                          <div className="bg-gray-900/50 rounded-lg p-4">
                            <div className="text-3xl font-bold text-white mb-2">28</div>
                            <div className="text-sm text-gray-300">Average days since last purchase</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h5 className="text-green-400 font-semibold mb-2">Frequency</h5>
                          <div className="bg-gray-900/50 rounded-lg p-4">
                            <div className="text-3xl font-bold text-white mb-2">12.4</div>
                            <div className="text-sm text-gray-300">Average purchases per year</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h5 className="text-purple-400 font-semibold mb-2">Monetary</h5>
                          <div className="bg-gray-900/50 rounded-lg p-4">
                            <div className="text-3xl font-bold text-white mb-2">$2,340</div>
                            <div className="text-sm text-gray-300">Average annual spending</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clustering" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">K-Means Clustering Implementation</CardTitle>
                    <CardDescription className="text-gray-300">
                      Apply K-Means algorithm to RFM features for customer segmentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Clustering Implementation</h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt

# Prepare features for clustering
features = ['recency', 'frequency', 'monetary']
X = rfm[features]

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Determine optimal number of clusters using elbow method
inertias = []
silhouette_scores = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X_scaled)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X_scaled, kmeans.labels_))

# Plot elbow curve
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(k_range, inertias, 'bo-')
plt.title('Elbow Method')
plt.xlabel('Number of Clusters')
plt.ylabel('Inertia')

plt.subplot(1, 2, 2)
plt.plot(k_range, silhouette_scores, 'ro-')
plt.title('Silhouette Score')
plt.xlabel('Number of Clusters')
plt.ylabel('Silhouette Score')
plt.show()`}
                          </pre>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Final Clustering</h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`# Apply K-Means with optimal k=4
optimal_k = 4
kmeans = KMeans(n_clusters=optimal_k, random_state=42)
rfm['cluster'] = kmeans.fit_predict(X_scaled)

# Analyze clusters
cluster_summary = rfm.groupby('cluster').agg({
    'recency': 'mean',
    'frequency': 'mean', 
    'monetary': 'mean',
    'customer_id': 'count'
}).round(2)

cluster_summary.columns = ['Avg_Recency', 'Avg_Frequency', 'Avg_Monetary', 'Count']

print("Cluster Summary:")
print(cluster_summary)

# Assign business names to clusters
cluster_names = {
    0: 'Regular Customers',
    1: 'VIP Customers', 
    2: 'At-Risk Customers',
    3: 'New Customers'
}

rfm['segment'] = rfm['cluster'].map(cluster_names)
print("\\nSegment Distribution:")
print(rfm['segment'].value_counts())`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Cluster Evaluation Metrics */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-white font-semibold mb-4">Clustering Performance Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                          <h5 className="text-blue-400 font-semibold">Silhouette Score</h5>
                          <p className="text-2xl font-bold text-white mt-2">0.73</p>
                          <p className="text-sm text-gray-300">Good cluster separation</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                          <h5 className="text-green-400 font-semibold">Inertia</h5>
                          <p className="text-2xl font-bold text-white mt-2">1,247</p>
                          <p className="text-sm text-gray-300">Within-cluster sum of squares</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                          <h5 className="text-purple-400 font-semibold">Calinski-Harabasz</h5>
                          <p className="text-2xl font-bold text-white mt-2">892.4</p>
                          <p className="text-sm text-gray-300">Cluster validity index</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                          <h5 className="text-orange-400 font-semibold">Davies-Bouldin</h5>
                          <p className="text-2xl font-bold text-white mt-2">0.42</p>
                          <p className="text-sm text-gray-300">Lower is better</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strategy" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Marketing Strategy & Business Impact</CardTitle>
                    <CardDescription className="text-gray-300">
                      Actionable insights and targeted marketing strategies for each customer segment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Segment Strategies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Targeted Marketing Strategies</h4>

                        <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <h5 className="text-blue-400 font-semibold">Regular Customers (35%)</h5>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>
                              <strong>Strategy:</strong> Loyalty programs and cross-selling
                            </p>
                            <p>
                              <strong>Tactics:</strong> Points rewards, product recommendations
                            </p>
                            <p>
                              <strong>Expected ROI:</strong> 15-20% increase in purchase frequency
                            </p>
                          </div>
                        </div>

                        <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <h5 className="text-red-400 font-semibold">VIP Customers (20%)</h5>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>
                              <strong>Strategy:</strong> Premium service and exclusive offers
                            </p>
                            <p>
                              <strong>Tactics:</strong> VIP events, early access, personal shopper
                            </p>
                            <p>
                              <strong>Expected ROI:</strong> 25-30% increase in monetary value
                            </p>
                          </div>
                        </div>

                        <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <h5 className="text-green-400 font-semibold">At-Risk Customers (30%)</h5>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>
                              <strong>Strategy:</strong> Win-back campaigns and re-engagement
                            </p>
                            <p>
                              <strong>Tactics:</strong> Discount offers, surveys, personalized emails
                            </p>
                            <p>
                              <strong>Expected ROI:</strong> 10-15% reactivation rate
                            </p>
                          </div>
                        </div>

                        <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            <h5 className="text-yellow-400 font-semibold">New Customers (15%)</h5>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>
                              <strong>Strategy:</strong> Onboarding and education
                            </p>
                            <p>
                              <strong>Tactics:</strong> Welcome series, tutorials, first-purchase discounts
                            </p>
                            <p>
                              <strong>Expected ROI:</strong> 40-50% conversion to regular customers
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Business Impact Analysis</h4>

                        {/* Revenue Impact */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h5 className="text-white font-semibold mb-3">Projected Revenue Impact</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Current Annual Revenue</span>
                              <span className="text-white font-bold">$2.4M</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Projected Increase</span>
                              <span className="text-green-400 font-bold">+18%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Additional Revenue</span>
                              <span className="text-green-400 font-bold">$432K</span>
                            </div>
                          </div>
                        </div>

                        {/* Customer Lifetime Value */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h5 className="text-white font-semibold mb-3">Customer Lifetime Value</h5>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-400">$3,200</div>
                              <div className="text-xs text-gray-300">Regular Customers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-red-400">$8,500</div>
                              <div className="text-xs text-gray-300">VIP Customers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-400">$1,200</div>
                              <div className="text-xs text-gray-300">At-Risk Customers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-yellow-400">$1,800</div>
                              <div className="text-xs text-gray-300">New Customers</div>
                            </div>
                          </div>
                        </div>

                        {/* Implementation Timeline */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h5 className="text-white font-semibold mb-3">Implementation Timeline</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-300">Week 1-2: VIP program launch</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-300">Week 3-4: Win-back campaigns</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-gray-300">Week 5-6: Loyalty program rollout</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-gray-300">Week 7-8: New customer onboarding</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Success Metrics */}
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
                      <h4 className="text-white font-semibold mb-4">Key Success Metrics to Track</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="text-green-400 font-semibold mb-2">Customer Retention</h5>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Churn rate reduction by segment</li>
                            <li>• Customer lifetime value increase</li>
                            <li>• Repeat purchase rate improvement</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-blue-400 font-semibold mb-2">Revenue Growth</h5>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Average order value by segment</li>
                            <li>• Purchase frequency increase</li>
                            <li>• Cross-sell/up-sell success rate</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-purple-400 font-semibold mb-2">Campaign Effectiveness</h5>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Email open and click rates</li>
                            <li>• Conversion rates by segment</li>
                            <li>• ROI of targeted campaigns</li>
                          </ul>
                        </div>
                      </div>
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
