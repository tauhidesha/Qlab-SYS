// @file: src/lib/monitoring/aiMetrics.ts
// AI Monitoring System - Core Metrics Collection

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// Types
export interface AIMetrics {
  conversationId: string;
  customerPhone: string;
  startTime: number;
  endTime: number;
  
  // Performance metrics
  responseTime: number;
  toolsUsed: string[];
  iterations: number;
  
  // Token usage & cost
  tokenUsage: {
    input: number;
    output: number;
    estimated: number;
    actual?: number;
    cost: number;
  };
  
  // Quality metrics
  conversionType: 'booking' | 'info' | 'inquiry' | 'handover' | 'abandoned';
  customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
  humanHandover: boolean;
  
  // Technical health
  errors: Array<{
    type: 'tool_error' | 'api_error' | 'timeout' | 'validation_error';
    tool?: string;
    message: string;
    resolved: boolean;
    timestamp: number;
  }>;
  
  // Context
  messageType: 'text' | 'image' | 'mixed';
  promptVersion: 'master' | 'lightweight' | 'minimal';
  environment: string;
  
  // Metadata
  timestamp: any; // Firestore serverTimestamp
  version: string;
}

export interface ToolMetrics {
  tool: string;
  conversationId: string;
  customerPhone: string;
  duration: number;
  success: boolean;
  error?: string;
  inputSize?: number;
  outputSize?: number;
  timestamp: any;
}

export interface SystemAlert {
  type: 'critical' | 'warning' | 'info';
  category: 'performance' | 'cost' | 'quality' | 'technical';
  message: string;
  details: any;
  resolved: boolean;
  timestamp: any;
}

// Collections
const AI_METRICS_COLLECTION = 'ai_metrics';
const TOOL_METRICS_COLLECTION = 'tool_metrics';
const SYSTEM_ALERTS_COLLECTION = 'system_alerts';

// Record conversation-level AI metrics
export async function recordAIMetrics(metrics: Omit<AIMetrics, 'timestamp' | 'version'>): Promise<void> {
  try {
    const metricsWithMeta: AIMetrics = {
      ...metrics,
      timestamp: serverTimestamp(),
      version: '2.0',
      environment: process.env.NODE_ENV || 'development'
    };
    
    await addDoc(collection(db, AI_METRICS_COLLECTION), metricsWithMeta);
    
    // Check for alerts
    await checkMetricsForAlerts(metricsWithMeta);
    
    console.log(`[AIMetrics] Recorded metrics for conversation ${metrics.conversationId}`);
  } catch (error) {
    console.error('[AIMetrics] Failed to record metrics:', error);
    // Don't throw - monitoring shouldn't break the main flow
  }
}

// Record tool-level metrics
export async function recordToolMetrics(metrics: Omit<ToolMetrics, 'timestamp'>): Promise<void> {
  try {
    const toolMetrics: ToolMetrics = {
      ...metrics,
      timestamp: serverTimestamp()
    };
    
    await addDoc(collection(db, TOOL_METRICS_COLLECTION), toolMetrics);
    
    console.log(`[ToolMetrics] Recorded ${metrics.tool} tool metrics`);
  } catch (error) {
    console.error('[ToolMetrics] Failed to record tool metrics:', error);
  }
}

// Record AI errors
export async function recordAIError(
  conversationId: string, 
  error: Error | string,
  tool?: string,
  customerPhone?: string
): Promise<void> {
  try {
    const errorMetrics: Partial<AIMetrics> = {
      conversationId,
      customerPhone: customerPhone || 'unknown',
      startTime: Date.now(),
      endTime: Date.now(),
      responseTime: 0,
      toolsUsed: tool ? [tool] : [],
      iterations: 0,
      tokenUsage: {
        input: 0,
        output: 0,
        estimated: 0,
        cost: 0
      },
      conversionType: 'abandoned',
      humanHandover: true,
      errors: [{
        type: 'api_error',
        tool,
        message: error instanceof Error ? error.message : String(error),
        resolved: false,
        timestamp: Date.now()
      }],
      messageType: 'text',
      promptVersion: 'lightweight',
      environment: process.env.NODE_ENV || 'development',
      timestamp: serverTimestamp(),
      version: '2.0'
    };
    
    await addDoc(collection(db, AI_METRICS_COLLECTION), errorMetrics);
    
    // Create critical alert for errors
    await createSystemAlert({
      type: 'critical',
      category: 'technical',
      message: `AI Error in conversation ${conversationId}`,
      details: {
        error: error instanceof Error ? error.message : String(error),
        tool,
        customerPhone
      }
    });
    
  } catch (metricError) {
    console.error('[AIMetrics] Failed to record error metrics:', metricError);
  }
}

// Create system alerts
export async function createSystemAlert(alert: Omit<SystemAlert, 'timestamp' | 'resolved'>): Promise<void> {
  try {
    const systemAlert: SystemAlert = {
      ...alert,
      resolved: false,
      timestamp: serverTimestamp()
    };
    
    await addDoc(collection(db, SYSTEM_ALERTS_COLLECTION), systemAlert);
    
    // Send immediate notification for critical alerts
    if (alert.type === 'critical') {
      await sendCriticalAlertNotification(systemAlert);
    }
    
    console.log(`[SystemAlert] Created ${alert.type} alert: ${alert.message}`);
  } catch (error) {
    console.error('[SystemAlert] Failed to create alert:', error);
  }
}

// Check metrics for potential alerts
async function checkMetricsForAlerts(metrics: AIMetrics): Promise<void> {
  try {
    // Response time alert
    if (metrics.responseTime > 10000) { // 10 seconds
      await createSystemAlert({
        type: 'warning',
        category: 'performance',
        message: 'High AI response time detected',
        details: {
          responseTime: metrics.responseTime,
          conversationId: metrics.conversationId
        }
      });
    }
    
    // Cost alert
    if (metrics.tokenUsage.cost > 5) { // $5 per conversation
      await createSystemAlert({
        type: 'warning',
        category: 'cost',
        message: 'High conversation cost detected',
        details: {
          cost: metrics.tokenUsage.cost,
          tokens: metrics.tokenUsage.input + metrics.tokenUsage.output,
          conversationId: metrics.conversationId
        }
      });
    }
    
    // Quality alert - too many errors
    if (metrics.errors.length > 3) {
      await createSystemAlert({
        type: 'warning',
        category: 'quality',
        message: 'Multiple errors in single conversation',
        details: {
          errorCount: metrics.errors.length,
          errors: metrics.errors,
          conversationId: metrics.conversationId
        }
      });
    }
    
  } catch (error) {
    console.error('[MetricsAlert] Failed to check alerts:', error);
  }
}

// Send critical alert notifications
async function sendCriticalAlertNotification(alert: SystemAlert): Promise<void> {
  try {
    // TODO: Implement notification system
    // Options: WhatsApp to admin, email, Slack, etc.
    console.log(`🚨 CRITICAL ALERT: ${alert.message}`, alert.details);
    
    // For now, just log critical alerts
    // In production, integrate with notification service
    
  } catch (error) {
    console.error('[CriticalAlert] Failed to send notification:', error);
  }
}

// Analytics functions
export async function getRecentMetrics(hours: number = 24): Promise<AIMetrics[]> {
  try {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    const q = query(
      collection(db, AI_METRICS_COLLECTION),
      where('startTime', '>=', cutoff),
      orderBy('startTime', 'desc'),
      limit(100)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AIMetrics);
  } catch (error) {
    console.error('[Analytics] Failed to get recent metrics:', error);
    return [];
  }
}

export async function getSystemHealth(): Promise<{
  totalConversations: number;
  averageResponseTime: number;
  errorRate: number;
  totalCost: number;
  topTools: string[];
}> {
  try {
    const metrics = await getRecentMetrics(24);
    
    if (metrics.length === 0) {
      return {
        totalConversations: 0,
        averageResponseTime: 0,
        errorRate: 0,
        totalCost: 0,
        topTools: []
      };
    }
    
    const totalConversations = metrics.length;
    const averageResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / totalConversations;
    const errorCount = metrics.filter(m => m.errors.length > 0).length;
    const errorRate = (errorCount / totalConversations) * 100;
    const totalCost = metrics.reduce((sum, m) => sum + m.tokenUsage.cost, 0);
    
    // Count tool usage
    const toolCount: Record<string, number> = {};
    metrics.forEach(m => {
      m.toolsUsed.forEach(tool => {
        toolCount[tool] = (toolCount[tool] || 0) + 1;
      });
    });
    
    const topTools = Object.entries(toolCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([tool]) => tool);
    
    return {
      totalConversations,
      averageResponseTime: Math.round(averageResponseTime),
      errorRate: Math.round(errorRate * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      topTools
    };
  } catch (error) {
    console.error('[SystemHealth] Failed to calculate health:', error);
    return {
      totalConversations: 0,
      averageResponseTime: 0,
      errorRate: 0,
      totalCost: 0,
      topTools: []
    };
  }
}

export default {
  recordAIMetrics,
  recordToolMetrics,
  recordAIError,
  createSystemAlert,
  getRecentMetrics,
  getSystemHealth
};
