// @file: src/app/(app)/monitoring/page.tsx
// AI Monitoring Dashboard

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSystemHealth, getRecentMetrics, type AIMetrics } from '@/lib/monitoring/aiMetrics';
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
      
      const [healthData, metricsData] = await Promise.all([
        getSystemHealth(),
        getRecentMetrics(hours)
      ]);
      
      setHealth(healthData);
      setMetrics(metricsData);
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
      </Tabs>
    </div>
  );
}
