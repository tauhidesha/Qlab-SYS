// @file: src/lib/monitoring/predictiveAnalytics.ts
// Predictive Analytics & Auto-Optimization

import { AIMetrics } from './aiMetrics';
import { QualityScore } from './aiQualityScoring';

export interface PredictiveInsight {
  type: 'performance' | 'cost' | 'quality' | 'behavior';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  prediction: string;
  confidence: number; // 0-100
  timeframe: string;
  recommendations: string[];
}

export interface OptimizationSuggestion {
  category: 'prompt' | 'tool' | 'flow' | 'cost';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: {
    performance?: string;
    cost?: string;
    quality?: string;
  };
  effort: 'low' | 'medium' | 'high';
}

export interface CustomerBehaviorInsight {
  pattern: string;
  frequency: number;
  examples: string[];
  impact: 'positive' | 'negative' | 'neutral';
  suggestion: string;
}

// Analyze metrics and generate predictive insights
export function generatePredictiveInsights(metrics: AIMetrics[]): PredictiveInsight[] {
  if (metrics.length < 10) {
    return [{
      type: 'behavior',
      severity: 'low',
      title: 'Insufficient Data',
      description: 'Need more conversation data for reliable predictions',
      prediction: 'Collect at least 50 conversations for meaningful insights',
      confidence: 100,
      timeframe: 'Now',
      recommendations: ['Continue using the system to gather more data']
    }];
  }

  const insights: PredictiveInsight[] = [];
  
  // Performance trend analysis
  const performanceInsight = analyzePerformanceTrend(metrics);
  if (performanceInsight) insights.push(performanceInsight);
  
  // Cost trend analysis
  const costInsight = analyzeCostTrend(metrics);
  if (costInsight) insights.push(costInsight);
  
  // Quality degradation prediction
  const qualityInsight = analyzeQualityTrend(metrics);
  if (qualityInsight) insights.push(qualityInsight);
  
  // Usage pattern prediction
  const usageInsight = analyzeUsagePattern(metrics);
  if (usageInsight) insights.push(usageInsight);
  
  return insights;
}

function analyzePerformanceTrend(metrics: AIMetrics[]): PredictiveInsight | null {
  // Calculate response time trend
  const recent = metrics.slice(-20); // Last 20 conversations
  const older = metrics.slice(-40, -20); // Previous 20 conversations
  
  if (older.length < 10) return null;
  
  const recentAvg = recent.reduce((sum, m) => sum + m.responseTime, 0) / recent.length;
  const olderAvg = older.reduce((sum, m) => sum + m.responseTime, 0) / older.length;
  
  const trend = ((recentAvg - olderAvg) / olderAvg) * 100;
  
  if (trend > 20) {
    return {
      type: 'performance',
      severity: 'high',
      title: 'Response Time Degradation',
      description: `Response times increased by ${trend.toFixed(1)}% recently`,
      prediction: 'If this trend continues, response times will exceed 10 seconds within a week',
      confidence: 85,
      timeframe: '7 days',
      recommendations: [
        'Check OpenAI API status and quotas',
        'Optimize conversation history pruning',
        'Consider using lighter prompts for simple queries',
        'Monitor server resources and scaling'
      ]
    };
  } else if (trend < -20) {
    return {
      type: 'performance',
      severity: 'low',
      title: 'Performance Improvement',
      description: `Response times improved by ${Math.abs(trend).toFixed(1)}% recently`,
      prediction: 'System performance is trending positively',
      confidence: 80,
      timeframe: 'Current',
      recommendations: [
        'Document what changes led to this improvement',
        'Monitor to ensure improvement is sustained'
      ]
    };
  }
  
  return null;
}

function analyzeCostTrend(metrics: AIMetrics[]): PredictiveInsight | null {
  const recent = metrics.slice(-30); // Last 30 conversations
  const dailyCosts = calculateDailyCosts(recent);
  
  if (dailyCosts.length < 3) return null;
  
  // Simple linear trend analysis
  const trend = calculateTrend(dailyCosts);
  
  if (trend > 0.1) { // More than $0.10 increase per day
    const projectedMonthlyCost = (dailyCosts[dailyCosts.length - 1] + (trend * 30)) * 30;
    
    return {
      type: 'cost',
      severity: projectedMonthlyCost > 200 ? 'high' : 'medium',
      title: 'Rising AI Costs',
      description: `Daily AI costs increasing by $${trend.toFixed(3)}/day`,
      prediction: `Projected monthly cost: $${projectedMonthlyCost.toFixed(2)}`,
      confidence: 75,
      timeframe: '30 days',
      recommendations: [
        'Implement conversation context pruning',
        'Use lightweight prompts for simple queries',
        'Add cost limits and alerts',
        'Review token usage patterns'
      ]
    };
  }
  
  return null;
}

function analyzeQualityTrend(metrics: AIMetrics[]): PredictiveInsight | null {
  const recent = metrics.slice(-20);
  const errorRate = recent.filter(m => m.errors.length > 0).length / recent.length;
  const handoverRate = recent.filter(m => m.humanHandover).length / recent.length;
  
  if (errorRate > 0.3) {
    return {
      type: 'quality',
      severity: 'high',
      title: 'Quality Degradation Alert',
      description: `Error rate at ${(errorRate * 100).toFixed(1)}%, handover rate at ${(handoverRate * 100).toFixed(1)}%`,
      prediction: 'Customer satisfaction likely to decline if not addressed',
      confidence: 90,
      timeframe: '3-5 days',
      recommendations: [
        'Review recent error patterns',
        'Update AI prompts and tools',
        'Check for API issues',
        'Consider prompt engineering improvements'
      ]
    };
  }
  
  return null;
}

function analyzeUsagePattern(metrics: AIMetrics[]): PredictiveInsight | null {
  // Analyze time-based patterns
  const hourlyUsage = new Map<number, number>();
  
  metrics.forEach(m => {
    const hour = new Date(m.startTime).getHours();
    hourlyUsage.set(hour, (hourlyUsage.get(hour) || 0) + 1);
  });
  
  const peakHour = Array.from(hourlyUsage.entries())
    .sort(([,a], [,b]) => b - a)[0];
  
  if (peakHour && peakHour[1] > metrics.length * 0.2) {
    return {
      type: 'behavior',
      severity: 'medium',
      title: 'Peak Usage Pattern Detected',
      description: `${peakHour[1]} conversations (${((peakHour[1]/metrics.length)*100).toFixed(1)}%) occur at ${peakHour[0]}:00`,
      prediction: 'Expect higher load during this time period',
      confidence: 85,
      timeframe: 'Daily recurring',
      recommendations: [
        'Ensure adequate system resources during peak hours',
        'Consider pre-warming caches before peak time',
        'Monitor response times during peak usage'
      ]
    };
  }
  
  return null;
}

// Generate optimization suggestions
export function generateOptimizationSuggestions(metrics: AIMetrics[]): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];
  
  // Analyze for prompt optimization opportunities
  const promptSuggestion = analyzePromptOptimization(metrics);
  if (promptSuggestion) suggestions.push(promptSuggestion);
  
  // Analyze tool usage optimization
  const toolSuggestion = analyzeToolOptimization(metrics);
  if (toolSuggestion) suggestions.push(toolSuggestion);
  
  // Analyze cost optimization
  const costSuggestion = analyzeCostOptimization(metrics);
  if (costSuggestion) suggestions.push(costSuggestion);
  
  // Analyze flow optimization
  const flowSuggestion = analyzeFlowOptimization(metrics);
  if (flowSuggestion) suggestions.push(flowSuggestion);
  
  return suggestions;
}

function analyzePromptOptimization(metrics: AIMetrics[]): OptimizationSuggestion | null {
  const avgTokens = metrics.reduce((sum, m) => sum + m.tokenUsage.input, 0) / metrics.length;
  const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length;
  
  if (avgTokens > 2000 && avgResponseTime > 4000) {
    return {
      category: 'prompt',
      priority: 'high',
      title: 'Optimize Prompt Length',
      description: `Average input tokens (${avgTokens.toFixed(0)}) and response time (${(avgResponseTime/1000).toFixed(1)}s) are high`,
      implementation: 'Create context-aware prompt selection: use lightweight prompts for simple queries, detailed prompts only when needed',
      expectedImpact: {
        performance: '30-50% faster response times',
        cost: '20-40% reduction in token costs',
        quality: 'Maintained or improved for simple queries'
      },
      effort: 'medium'
    };
  }
  
  return null;
}

function analyzeToolOptimization(metrics: AIMetrics[]): OptimizationSuggestion | null {
  // Analyze tool usage patterns
  const toolUsage = new Map<string, number>();
  const toolSuccessRate = new Map<string, { total: number; success: number }>();
  
  metrics.forEach(m => {
    m.toolsUsed.forEach(tool => {
      toolUsage.set(tool, (toolUsage.get(tool) || 0) + 1);
      
      const stats = toolSuccessRate.get(tool) || { total: 0, success: 0 };
      stats.total++;
      if (m.errors.length === 0) stats.success++;
      toolSuccessRate.set(tool, stats);
    });
  });
  
  // Find tools with low success rates
  const problematicTools = Array.from(toolSuccessRate.entries())
    .filter(([tool, stats]) => stats.total > 5 && (stats.success / stats.total) < 0.7)
    .map(([tool]) => tool);
  
  if (problematicTools.length > 0) {
    return {
      category: 'tool',
      priority: 'high',
      title: 'Improve Tool Reliability',
      description: `Tools with low success rates: ${problematicTools.join(', ')}`,
      implementation: 'Review tool implementations, add better error handling, and improve input validation',
      expectedImpact: {
        quality: 'Reduced error rate and better user experience',
        performance: 'Fewer retries and faster completion'
      },
      effort: 'medium'
    };
  }
  
  return null;
}

function analyzeCostOptimization(metrics: AIMetrics[]): OptimizationSuggestion | null {
  const dailyCost = calculateDailyCosts(metrics.slice(-30))[0] || 0;
  
  if (dailyCost > 10) { // More than $10/day
    return {
      category: 'cost',
      priority: 'high',
      title: 'Implement Cost Controls',
      description: `Daily AI costs averaging $${dailyCost.toFixed(2)}`,
      implementation: 'Add conversation context pruning, implement token limits, and use cached responses for common queries',
      expectedImpact: {
        cost: '40-60% reduction in daily costs',
        performance: 'Faster responses for cached queries'
      },
      effort: 'medium'
    };
  }
  
  return null;
}

function analyzeFlowOptimization(metrics: AIMetrics[]): OptimizationSuggestion | null {
  const avgIterations = metrics.reduce((sum, m) => sum + m.iterations, 0) / metrics.length;
  
  if (avgIterations > 3) {
    return {
      category: 'flow',
      priority: 'medium',
      title: 'Optimize Conversation Flow',
      description: `Average ${avgIterations.toFixed(1)} iterations per conversation`,
      implementation: 'Improve initial tool selection and add conversation state management to reduce back-and-forth',
      expectedImpact: {
        performance: 'Faster conversation resolution',
        quality: 'More direct and efficient responses',
        cost: 'Reduced token usage from fewer iterations'
      },
      effort: 'high'
    };
  }
  
  return null;
}

// Analyze customer behavior patterns
export function analyzeCustomerBehavior(metrics: AIMetrics[]): CustomerBehaviorInsight[] {
  const insights: CustomerBehaviorInsight[] = [];
  
  // Most common conversion types
  const conversionTypes = metrics.reduce((acc, m) => {
    acc[m.conversionType] = (acc[m.conversionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(conversionTypes).forEach(([type, count]) => {
    const frequency = count / metrics.length;
    if (frequency > 0.1) { // More than 10%
      insights.push({
        pattern: `${type} conversations`,
        frequency: frequency * 100,
        examples: metrics.filter(m => m.conversionType === type).slice(0, 3).map(m => `${m.toolsUsed.join(', ')}`),
        impact: type === 'booking' ? 'positive' : type === 'handover' ? 'negative' : 'neutral',
        suggestion: type === 'booking' ? 'Continue optimizing for bookings' : 
                   type === 'handover' ? 'Reduce handover rate with better AI training' :
                   'Monitor and optimize based on business goals'
      });
    }
  });
  
  return insights;
}

// Helper functions
function calculateDailyCosts(metrics: AIMetrics[]): number[] {
  const dailyCosts = new Map<string, number>();
  
  metrics.forEach(m => {
    const date = new Date(m.startTime).toDateString();
    dailyCosts.set(date, (dailyCosts.get(date) || 0) + m.tokenUsage.cost);
  });
  
  return Array.from(dailyCosts.values());
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  
  // Simple linear regression slope
  const n = values.length;
  const sumX = (n * (n - 1)) / 2;
  const sumY = values.reduce((sum, val) => sum + val, 0);
  const sumXY = values.reduce((sum, val, i) => sum + (i * val), 0);
  const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;
  
  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
}

export default {
  generatePredictiveInsights,
  generateOptimizationSuggestions,
  analyzeCustomerBehavior
};
