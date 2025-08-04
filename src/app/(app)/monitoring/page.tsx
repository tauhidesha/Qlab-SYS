// @file: src/app/(app)/monitoring/page.tsx
// AI Monitoring Dashboard

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSystemHealth, getRecentMetrics, type AIMetrics } from '@/lib/monitoring/aiMetrics';
import { analyzeQualityTrends, type QualityAnalysis } from '@/lib/monitoring/aiQualityScoring';
import { generatePredictiveInsights, generateOptimizationSuggestions, analyzeCustomerBehavior, type PredictiveInsight, type OptimizationSuggestion } from '@/lib/monitoring/predictiveAnalytics';
import { getSystemHealth as getSelfHealingHealth, getHealingHistory, type SystemHealth as SelfHealingHealth, type HealingAction } from '@/lib/monitoring/selfHealing';
import { Activity, DollarSign, MessageSquare, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

interface SystemHealth {
  totalConversations: number;
  averageResponseTime: number;
  errorRate: number;
  totalCost: number;
  topTools: string[];
}

export default function MonitoringPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [metrics, setMetrics] = useState<AIMetrics[]>([]);
  const [qualityAnalysis, setQualityAnalysis] = useState<QualityAnalysis | null>(null);
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [selfHealingHealth, setSelfHealingHealth] = useState<SelfHealingHealth | null>(null);
  const [healingHistory, setHealingHistory] = useState<HealingAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('24h');

  useEffect(() => {
    loadMonitoringData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadMonitoringData, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadMonitoringData = async () => {
    try {
      const hours = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : 168;
      
      const [healthData, metricsData, selfHealingData, healingHistoryData] = await Promise.all([
        getSystemHealth(),
        getRecentMetrics(hours),
        getSelfHealingHealth(),
        getHealingHistory()
      ]);
      
      setHealth(healthData);
      setMetrics(metricsData);
      setSelfHealingHealth(selfHealingData);
      setHealingHistory(healingHistoryData);
      
      // Generate advanced analytics
      if (metricsData.length > 0) {
        const quality = analyzeQualityTrends(metricsData);
        const insights = generatePredictiveInsights(metricsData);
        const suggestions = generateOptimizationSuggestions(metricsData);
        
        setQualityAnalysis(quality);
        setPredictiveInsights(insights);
        setOptimizationSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Failed to load monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const getHealthStatus = () => {
    if (!health) return 'unknown';
    if (health.errorRate > 10) return 'critical';
    if (health.errorRate > 5 || health.averageResponseTime > 5000) return 'warning';
    return 'healthy';
  };

  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
    unknown: 'bg-gray-500'
  };

  const conversionRate = metrics.length > 0 
    ? (metrics.filter(m => m.conversionType === 'booking').length / metrics.length) * 100 
    : 0;

  const handoverRate = metrics.length > 0 
    ? (metrics.filter(m => m.humanHandover).length / metrics.length) * 100 
    : 0;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Zoya AI Performance & Health</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[getHealthStatus()]}`}></div>
            <span className="text-sm font-medium capitalize">{getHealthStatus()}</span>
          </div>
          
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border rounded px-3 py-1"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health?.totalConversations || 0}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === '1h' ? 'in the last hour' : 
               timeRange === '24h' ? 'in the last 24 hours' : 'in the last 7 days'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {health?.averageResponseTime ? `${(health.averageResponseTime / 1000).toFixed(1)}s` : '0s'}
            </div>
            <Progress 
              value={health?.averageResponseTime ? Math.min((health.averageResponseTime / 3000) * 100, 100) : 0} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health?.errorRate || 0}%</div>
            <Progress 
              value={health?.errorRate || 0} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${health?.totalCost || 0}</div>
            <p className="text-xs text-muted-foreground">
              OpenAI API costs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="insights">🔮 Insights</TabsTrigger>
          <TabsTrigger value="optimization">🚀 Optimization</TabsTrigger>
          <TabsTrigger value="healing">🛡️ Self-Healing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <Badge variant={health?.averageResponseTime && health.averageResponseTime > 3000 ? "destructive" : "default"}>
                    {health?.averageResponseTime ? `${(health.averageResponseTime / 1000).toFixed(1)}s` : '0s'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate</span>
                  <Badge variant={health?.errorRate && health.errorRate > 5 ? "destructive" : "default"}>
                    {health?.errorRate || 0}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Uptime</span>
                  <Badge variant="default">99.9%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top AI Tools</CardTitle>
                <CardDescription>Most frequently used tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {health?.topTools.map((tool, index) => (
                    <div key={tool} className="flex justify-between items-center">
                      <span className="text-sm">{tool}</span>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  )) || <p className="text-muted-foreground">No data available</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
                <CardDescription>How well AI converts conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Booking Conversion Rate</span>
                  <Badge variant={conversionRate < 10 ? "destructive" : conversionRate > 20 ? "default" : "secondary"}>
                    {conversionRate.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Human Handover Rate</span>
                  <Badge variant={handoverRate > 30 ? "destructive" : "default"}>
                    {handoverRate.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={conversionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>Latest AI interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {metrics.slice(0, 10).map((metric) => (
                    <div key={metric.conversationId} className="flex justify-between items-center text-sm p-2 border rounded">
                      <div>
                        <Badge variant={metric.conversionType === 'booking' ? 'default' : 'secondary'}>
                          {metric.conversionType}
                        </Badge>
                        <span className="ml-2">{(metric.responseTime / 1000).toFixed(1)}s</span>
                      </div>
                      <div className="text-muted-foreground">
                        ${metric.tokenUsage.cost.toFixed(3)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Tool Performance</CardTitle>
              <CardDescription>Individual AI tool usage and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tool performance analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>AI usage costs and optimization opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Cost ({timeRange})</span>
                  <span className="font-bold">${health?.totalCost || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Cost per Conversation</span>
                  <span>${health?.totalConversations ? (health.totalCost / health.totalConversations).toFixed(3) : '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Monthly Cost</span>
                  <span>${health?.totalCost ? (health.totalCost * 30).toFixed(2) : '0'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🔮 Predictive Insights</CardTitle>
                <CardDescription>AI-powered predictions and early warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveInsights.length > 0 ? predictiveInsights.map((insight, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${
                      insight.severity === 'high' ? 'border-red-200 bg-red-50' :
                      insight.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge variant={insight.severity === 'high' ? 'destructive' : insight.severity === 'medium' ? 'secondary' : 'default'}>
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <p className="text-sm font-medium mb-2">Prediction: {insight.prediction}</p>
                      <div className="text-xs">
                        <span className="font-medium">Timeframe:</span> {insight.timeframe}
                      </div>
                      {insight.recommendations.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs font-medium">Recommendations:</span>
                          <ul className="text-xs mt-1 list-disc list-inside">
                            {insight.recommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )) : (
                    <p className="text-muted-foreground">No predictive insights available yet. More data needed.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Quality Analysis</CardTitle>
                <CardDescription>AI conversation quality metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                {qualityAnalysis ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{qualityAnalysis.score.overall}</div>
                        <div className="text-xs text-muted-foreground">Overall</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{qualityAnalysis.score.performance}</div>
                        <div className="text-xs text-muted-foreground">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{qualityAnalysis.score.accuracy}</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{qualityAnalysis.score.efficiency}</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{qualityAnalysis.score.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium">Insights:</h5>
                      {qualityAnalysis.insights.map((insight, i) => (
                        <p key={i} className="text-sm">{insight}</p>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium">Trends:</h5>
                      {qualityAnalysis.trends.improving.length > 0 && (
                        <p className="text-sm text-green-600">📈 Improving: {qualityAnalysis.trends.improving.join(', ')}</p>
                      )}
                      {qualityAnalysis.trends.declining.length > 0 && (
                        <p className="text-sm text-red-600">📉 Declining: {qualityAnalysis.trends.declining.join(', ')}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Quality analysis requires more conversation data</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Optimization Suggestions</CardTitle>
                <CardDescription>AI-generated recommendations for system improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationSuggestions.length > 0 ? optimizationSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <div className="flex gap-2">
                          <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'secondary' : 'default'}>
                            {suggestion.priority} priority
                          </Badge>
                          <Badge variant="outline">{suggestion.category}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                      <div className="text-sm mb-2">
                        <span className="font-medium">Implementation:</span> {suggestion.implementation}
                      </div>
                      <div className="text-sm mb-2">
                        <span className="font-medium">Effort:</span> {suggestion.effort}
                      </div>
                      {Object.keys(suggestion.expectedImpact).length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium">Expected Impact:</span>
                          <ul className="list-disc list-inside mt-1">
                            {Object.entries(suggestion.expectedImpact).map(([key, value]) => (
                              <li key={key}>{key}: {value}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )) : (
                    <p className="text-muted-foreground">No optimization suggestions available. System appears to be running optimally.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="healing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Self-Healing System</CardTitle>
                <CardDescription>Automatic issue detection and resolution</CardDescription>
              </CardHeader>
              <CardContent>
                {selfHealingHealth ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        selfHealingHealth.status === 'healthy' ? 'bg-green-500' :
                        selfHealingHealth.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="font-medium capitalize">{selfHealingHealth.status}</span>
                      {selfHealingHealth.manualInterventionNeeded && (
                        <Badge variant="destructive">Manual Intervention Needed</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Issues Detected:</h5>
                        {selfHealingHealth.issues.length > 0 ? (
                          <ul className="text-sm space-y-1">
                            {selfHealingHealth.issues.map((issue, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-green-600">No issues detected</p>
                        )}
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Auto-Fixes Applied:</h5>
                        <div className="text-2xl font-bold text-blue-600">{selfHealingHealth.autoFixesApplied}</div>
                        <p className="text-sm text-muted-foreground">automatic corrections</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Self-healing system data not available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔧 Healing History</CardTitle>
                <CardDescription>Recent automatic fixes and interventions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {healingHistory.length > 0 ? healingHistory.slice(0, 10).map((action) => (
                    <div key={action.id} className="flex justify-between items-center text-sm p-2 border rounded">
                      <div>
                        <div className="font-medium">{action.action}</div>
                        <div className="text-muted-foreground">{action.trigger}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={action.status === 'completed' ? 'default' : action.status === 'failed' ? 'destructive' : 'secondary'}>
                          {action.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {new Date(action.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-muted-foreground">No healing actions recorded yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
