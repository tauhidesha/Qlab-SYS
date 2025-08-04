// @file: src/lib/monitoring/aiQualityScoring.ts
// AI Quality Scoring System

import { AIMetrics } from './aiMetrics';

export interface QualityScore {
  overall: number; // 0-100
  performance: number; // Response time score
  accuracy: number; // Tool selection accuracy
  efficiency: number; // Token usage efficiency
  satisfaction: number; // Customer satisfaction
}

export interface QualityAnalysis {
  score: QualityScore;
  insights: string[];
  recommendations: string[];
  trends: {
    improving: string[];
    declining: string[];
  };
}

// Calculate quality score for a conversation
export function calculateConversationQuality(metrics: AIMetrics): QualityScore {
  // Performance score (response time)
  const performanceScore = Math.max(0, Math.min(100, 
    100 - ((metrics.responseTime - 1000) / 100) // Penalize > 1s response time
  ));

  // Accuracy score (tool selection)
  const accuracyScore = calculateToolAccuracy(metrics);

  // Efficiency score (token usage vs output quality)
  const efficiencyScore = calculateTokenEfficiency(metrics);

  // Satisfaction score (based on conversion and errors)
  const satisfactionScore = calculateSatisfactionScore(metrics);

  // Overall weighted score
  const overall = Math.round(
    (performanceScore * 0.3) +
    (accuracyScore * 0.3) +
    (efficiencyScore * 0.2) +
    (satisfactionScore * 0.2)
  );

  return {
    overall,
    performance: Math.round(performanceScore),
    accuracy: Math.round(accuracyScore),
    efficiency: Math.round(efficiencyScore),
    satisfaction: Math.round(satisfactionScore)
  };
}

// Calculate tool selection accuracy
function calculateToolAccuracy(metrics: AIMetrics): number {
  const { toolsUsed, conversionType, errors } = metrics;
  
  let score = 80; // Base score
  
  // Bonus for successful conversions
  if (conversionType === 'booking') {
    score += 20; // Successful booking = high accuracy
  } else if (conversionType === 'info') {
    score += 10; // Good info response
  } else if (conversionType === 'handover') {
    score -= 10; // Handover might indicate confusion
  }
  
  // Penalty for errors
  score -= errors.length * 15;
  
  // Bonus for appropriate tool usage
  if (conversionType === 'booking' && toolsUsed.includes('createBooking')) {
    score += 10; // Used right tool for booking
  }
  
  if (toolsUsed.includes('searchKnowledgeBase')) {
    score += 5; // Good use of knowledge base
  }
  
  // Penalty for tool overuse
  if (toolsUsed.length > 5) {
    score -= (toolsUsed.length - 5) * 5; // Too many tools = confusion
  }
  
  return Math.max(0, Math.min(100, score));
}

// Calculate token usage efficiency
function calculateTokenEfficiency(metrics: AIMetrics): number {
  const { tokenUsage, responseTime, toolsUsed } = metrics;
  
  let score = 70; // Base score
  
  // Efficiency based on tokens per tool
  const tokensPerTool = toolsUsed.length > 0 ? tokenUsage.input / toolsUsed.length : tokenUsage.input;
  
  if (tokensPerTool < 500) {
    score += 20; // Very efficient
  } else if (tokensPerTool < 1000) {
    score += 10; // Good efficiency
  } else if (tokensPerTool > 2000) {
    score -= 20; // Poor efficiency
  }
  
  // Response time vs token usage
  const tokensPerSecond = tokenUsage.input / (responseTime / 1000);
  if (tokensPerSecond > 100) {
    score += 10; // Fast processing
  }
  
  return Math.max(0, Math.min(100, score));
}

// Calculate customer satisfaction score
function calculateSatisfactionScore(metrics: AIMetrics): number {
  const { conversionType, humanHandover, errors, customerSatisfaction } = metrics;
  
  let score = 60; // Base score
  
  // Use explicit satisfaction if available
  if (customerSatisfaction) {
    score = customerSatisfaction * 20; // Convert 1-5 to 20-100
  }
  
  // Infer satisfaction from behavior
  if (conversionType === 'booking') {
    score = Math.max(score, 85); // Booking = high satisfaction
  } else if (conversionType === 'info') {
    score = Math.max(score, 70); // Info = moderate satisfaction
  }
  
  if (humanHandover) {
    score = Math.min(score, 40); // Handover = low satisfaction
  }
  
  // Penalty for errors
  score -= errors.length * 20;
  
  return Math.max(0, Math.min(100, score));
}

// Analyze quality trends over time
export function analyzeQualityTrends(metrics: AIMetrics[]): QualityAnalysis {
  if (metrics.length === 0) {
    return {
      score: { overall: 0, performance: 0, accuracy: 0, efficiency: 0, satisfaction: 0 },
      insights: ['No data available for analysis'],
      recommendations: ['Start collecting conversation data'],
      trends: { improving: [], declining: [] }
    };
  }
  
  // Calculate scores for all conversations
  const scores = metrics.map(calculateConversationQuality);
  
  // Average scores
  const avgScore: QualityScore = {
    overall: Math.round(scores.reduce((sum, s) => sum + s.overall, 0) / scores.length),
    performance: Math.round(scores.reduce((sum, s) => sum + s.performance, 0) / scores.length),
    accuracy: Math.round(scores.reduce((sum, s) => sum + s.accuracy, 0) / scores.length),
    efficiency: Math.round(scores.reduce((sum, s) => sum + s.efficiency, 0) / scores.length),
    satisfaction: Math.round(scores.reduce((sum, s) => sum + s.satisfaction, 0) / scores.length)
  };
  
  // Generate insights
  const insights = generateQualityInsights(metrics, avgScore);
  
  // Generate recommendations
  const recommendations = generateRecommendations(avgScore, metrics);
  
  // Analyze trends (compare first half vs second half)
  const trends = analyzeTrends(scores);
  
  return {
    score: avgScore,
    insights,
    recommendations,
    trends
  };
}

function generateQualityInsights(metrics: AIMetrics[], avgScore: QualityScore): string[] {
  const insights: string[] = [];
  
  // Overall performance
  if (avgScore.overall >= 80) {
    insights.push('🎉 AI system performing excellently overall');
  } else if (avgScore.overall >= 60) {
    insights.push('✅ AI system performing well with room for improvement');
  } else {
    insights.push('⚠️ AI system needs significant improvement');
  }
  
  // Response time analysis
  const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length;
  if (avgResponseTime < 2000) {
    insights.push('⚡ Excellent response times');
  } else if (avgResponseTime > 5000) {
    insights.push('🐌 Response times need improvement');
  }
  
  // Tool usage patterns
  const toolUsage = metrics.flatMap(m => m.toolsUsed);
  const uniqueTools = new Set(toolUsage).size;
  if (uniqueTools > 8) {
    insights.push('🛠️ Good tool utilization diversity');
  }
  
  // Conversion analysis
  const conversionRate = metrics.filter(m => m.conversionType === 'booking').length / metrics.length;
  if (conversionRate > 0.2) {
    insights.push('💰 Strong booking conversion rate');
  } else if (conversionRate < 0.1) {
    insights.push('📉 Low booking conversion needs attention');
  }
  
  // Error analysis
  const errorRate = metrics.filter(m => m.errors.length > 0).length / metrics.length;
  if (errorRate > 0.2) {
    insights.push('🐛 High error rate requires investigation');
  }
  
  return insights;
}

function generateRecommendations(avgScore: QualityScore, metrics: AIMetrics[]): string[] {
  const recommendations: string[] = [];
  
  // Performance recommendations
  if (avgScore.performance < 70) {
    recommendations.push('🚀 Optimize response times by caching frequent queries');
    recommendations.push('⚡ Consider using lighter prompts for simple queries');
  }
  
  // Accuracy recommendations
  if (avgScore.accuracy < 70) {
    recommendations.push('🎯 Improve tool selection logic with better context analysis');
    recommendations.push('📚 Update knowledge base with recent customer patterns');
  }
  
  // Efficiency recommendations
  if (avgScore.efficiency < 70) {
    recommendations.push('💡 Reduce token usage with more focused prompts');
    recommendations.push('🔄 Implement conversation context pruning');
  }
  
  // Satisfaction recommendations
  if (avgScore.satisfaction < 70) {
    recommendations.push('😊 Add customer feedback collection after conversations');
    recommendations.push('🤝 Reduce handover rate with better AI training');
  }
  
  // Cost optimization
  const avgCost = metrics.reduce((sum, m) => sum + m.tokenUsage.cost, 0) / metrics.length;
  if (avgCost > 0.5) {
    recommendations.push('💰 Implement cost optimization: average cost per conversation is high');
  }
  
  return recommendations;
}

function analyzeTrends(scores: QualityScore[]): { improving: string[]; declining: string[] } {
  if (scores.length < 4) {
    return { improving: [], declining: [] };
  }
  
  const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
  const secondHalf = scores.slice(Math.floor(scores.length / 2));
  
  const firstAvg = {
    overall: firstHalf.reduce((sum, s) => sum + s.overall, 0) / firstHalf.length,
    performance: firstHalf.reduce((sum, s) => sum + s.performance, 0) / firstHalf.length,
    accuracy: firstHalf.reduce((sum, s) => sum + s.accuracy, 0) / firstHalf.length,
    efficiency: firstHalf.reduce((sum, s) => sum + s.efficiency, 0) / firstHalf.length,
    satisfaction: firstHalf.reduce((sum, s) => sum + s.satisfaction, 0) / firstHalf.length
  };
  
  const secondAvg = {
    overall: secondHalf.reduce((sum, s) => sum + s.overall, 0) / secondHalf.length,
    performance: secondHalf.reduce((sum, s) => sum + s.performance, 0) / secondHalf.length,
    accuracy: secondHalf.reduce((sum, s) => sum + s.accuracy, 0) / secondHalf.length,
    efficiency: secondHalf.reduce((sum, s) => sum + s.efficiency, 0) / secondHalf.length,
    satisfaction: secondHalf.reduce((sum, s) => sum + s.satisfaction, 0) / secondHalf.length
  };
  
  const improving: string[] = [];
  const declining: string[] = [];
  
  if (secondAvg.performance - firstAvg.performance > 5) improving.push('Performance');
  else if (firstAvg.performance - secondAvg.performance > 5) declining.push('Performance');
  
  if (secondAvg.accuracy - firstAvg.accuracy > 5) improving.push('Accuracy');
  else if (firstAvg.accuracy - secondAvg.accuracy > 5) declining.push('Accuracy');
  
  if (secondAvg.efficiency - firstAvg.efficiency > 5) improving.push('Efficiency');
  else if (firstAvg.efficiency - secondAvg.efficiency > 5) declining.push('Efficiency');
  
  if (secondAvg.satisfaction - firstAvg.satisfaction > 5) improving.push('Satisfaction');
  else if (firstAvg.satisfaction - secondAvg.satisfaction > 5) declining.push('Satisfaction');
  
  return { improving, declining };
}

export default {
  calculateConversationQuality,
  analyzeQualityTrends
};
