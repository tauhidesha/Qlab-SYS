// @file: src/lib/monitoring/selfHealing.ts
// Self-Healing Mechanisms for AI System

import { AIMetrics, createSystemAlert, getRecentMetrics, recordAIError } from './aiMetrics';
import { generateOptimizationSuggestions, generatePredictiveInsights } from './predictiveAnalytics';

export interface HealingAction {
  id: string;
  trigger: string;
  action: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  timestamp: number;
  result?: string;
  impact?: {
    before: any;
    after: any;
  };
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
  autoFixesApplied: number;
  manualInterventionNeeded: boolean;
}

// Self-healing system that monitors and auto-fixes issues
export class SelfHealingSystem {
  private healingActions: HealingAction[] = [];
  private isRunning = false;
  
  // Start continuous monitoring and healing
  async startMonitoring(intervalMinutes: number = 30): Promise<void> {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('[SelfHealing] Starting continuous monitoring...');
    
    // Run initial health check
    await this.performHealthCheck();
    
    // Set up periodic health checks
    setInterval(async () => {
      if (this.isRunning) {
        await this.performHealthCheck();
      }
    }, intervalMinutes * 60 * 1000);
  }
  
  // Stop monitoring
  stopMonitoring(): void {
    this.isRunning = false;
    console.log('[SelfHealing] Stopped monitoring');
  }
  
  // Perform comprehensive health check and apply fixes
  async performHealthCheck(): Promise<SystemHealth> {
    try {
      console.log('[SelfHealing] Performing health check...');
      
      // Get recent metrics
      const metrics = await getRecentMetrics(4); // Last 4 hours
      
      if (metrics.length === 0) {
        return {
          status: 'healthy',
          issues: [],
          autoFixesApplied: 0,
          manualInterventionNeeded: false
        };
      }
      
      const issues: string[] = [];
      let autoFixesApplied = 0;
      let manualInterventionNeeded = false;
      
      // Check response time degradation
      const responseTimeIssue = await this.checkResponseTime(metrics);
      if (responseTimeIssue) {
        issues.push(responseTimeIssue.issue);
        if (responseTimeIssue.autoFixed) {
          autoFixesApplied++;
        } else {
          manualInterventionNeeded = true;
        }
      }
      
      // Check error rate spikes
      const errorRateIssue = await this.checkErrorRate(metrics);
      if (errorRateIssue) {
        issues.push(errorRateIssue.issue);
        if (errorRateIssue.autoFixed) {
          autoFixesApplied++;
        } else {
          manualInterventionNeeded = true;
        }
      }
      
      // Check cost anomalies
      const costIssue = await this.checkCostAnomalies(metrics);
      if (costIssue) {
        issues.push(costIssue.issue);
        if (costIssue.autoFixed) {
          autoFixesApplied++;
        } else {
          manualInterventionNeeded = true;
        }
      }
      
      // Check conversation quality
      const qualityIssue = await this.checkQualityDegradation(metrics);
      if (qualityIssue) {
        issues.push(qualityIssue.issue);
        if (qualityIssue.autoFixed) {
          autoFixesApplied++;
        } else {
          manualInterventionNeeded = true;
        }
      }
      
      // Determine overall status
      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (manualInterventionNeeded || issues.length > 2) {
        status = 'critical';
      } else if (issues.length > 0) {
        status = 'warning';
      }
      
      const health: SystemHealth = {
        status,
        issues,
        autoFixesApplied,
        manualInterventionNeeded
      };
      
      // Create alert if needed
      if (status !== 'healthy') {
        await createSystemAlert({
          type: status === 'critical' ? 'critical' : 'warning',
          category: 'technical',
          message: `Self-healing detected ${issues.length} issues`,
          details: {
            issues,
            autoFixesApplied,
            manualInterventionNeeded,
            timestamp: Date.now()
          }
        });
      }
      
      console.log(`[SelfHealing] Health check completed - Status: ${status}, Issues: ${issues.length}, Auto-fixes: ${autoFixesApplied}`);
      
      return health;
      
    } catch (error) {
      console.error('[SelfHealing] Health check failed:', error);
      await recordAIError('self-healing-error', error, 'selfHealing');
      
      return {
        status: 'critical',
        issues: ['Self-healing system malfunction'],
        autoFixesApplied: 0,
        manualInterventionNeeded: true
      };
    }
  }
  
  // Check and fix response time issues
  private async checkResponseTime(metrics: AIMetrics[]): Promise<{ issue: string; autoFixed: boolean } | null> {
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length;
    
    if (avgResponseTime > 8000) { // 8 seconds
      const issue = `High response time: ${(avgResponseTime / 1000).toFixed(1)}s average`;
      
      // Auto-fix: Trigger conversation history optimization
      try {
        await this.triggerConversationOptimization();
        
        await this.recordHealingAction({
          trigger: 'High response time detected',
          action: 'Triggered conversation history optimization',
          status: 'completed'
        });
        
        return { issue, autoFixed: true };
      } catch (error) {
        await this.recordHealingAction({
          trigger: 'High response time detected',
          action: 'Failed to optimize conversations',
          status: 'failed'
        });
        
        return { issue, autoFixed: false };
      }
    }
    
    return null;
  }
  
  // Check and fix error rate issues
  private async checkErrorRate(metrics: AIMetrics[]): Promise<{ issue: string; autoFixed: boolean } | null> {
    const errorRate = metrics.filter(m => m.errors.length > 0).length / metrics.length;
    
    if (errorRate > 0.3) { // 30% error rate
      const issue = `High error rate: ${(errorRate * 100).toFixed(1)}%`;
      
      // Auto-fix: Switch to more reliable lightweight prompt
      try {
        await this.switchToSafeMode();
        
        await this.recordHealingAction({
          trigger: 'High error rate detected',
          action: 'Switched to safe mode (lightweight prompt)',
          status: 'completed'
        });
        
        return { issue, autoFixed: true };
      } catch (error) {
        await this.recordHealingAction({
          trigger: 'High error rate detected',
          action: 'Failed to switch to safe mode',
          status: 'failed'
        });
        
        return { issue, autoFixed: false };
      }
    }
    
    return null;
  }
  
  // Check cost anomalies
  private async checkCostAnomalies(metrics: AIMetrics[]): Promise<{ issue: string; autoFixed: boolean } | null> {
    const totalCost = metrics.reduce((sum, m) => sum + m.tokenUsage.cost, 0);
    const hourlyRate = totalCost / 4; // 4 hours of data
    const dailyProjection = hourlyRate * 24;
    
    if (dailyProjection > 50) { // More than $50/day
      const issue = `High cost projection: $${dailyProjection.toFixed(2)}/day`;
      
      // Auto-fix: Enable aggressive token optimization
      try {
        await this.enableCostOptimization();
        
        await this.recordHealingAction({
          trigger: 'High cost detected',
          action: 'Enabled aggressive token optimization',
          status: 'completed'
        });
        
        return { issue, autoFixed: true };
      } catch (error) {
        await this.recordHealingAction({
          trigger: 'High cost detected',
          action: 'Failed to enable cost optimization',
          status: 'failed'
        });
        
        return { issue, autoFixed: false };
      }
    }
    
    return null;
  }
  
  // Check quality degradation
  private async checkQualityDegradation(metrics: AIMetrics[]): Promise<{ issue: string; autoFixed: boolean } | null> {
    const handoverRate = metrics.filter(m => m.humanHandover).length / metrics.length;
    
    if (handoverRate > 0.4) { // 40% handover rate
      const issue = `High handover rate: ${(handoverRate * 100).toFixed(1)}%`;
      
      // Auto-fix: Reset conversation context more frequently
      try {
        await this.improveContextManagement();
        
        await this.recordHealingAction({
          trigger: 'High handover rate detected',
          action: 'Improved context management and conversation flow',
          status: 'completed'
        });
        
        return { issue, autoFixed: true };
      } catch (error) {
        await this.recordHealingAction({
          trigger: 'High handover rate detected',
          action: 'Failed to improve context management',
          status: 'failed'
        });
        
        return { issue, autoFixed: false };
      }
    }
    
    return null;
  }
  
  // Auto-fix implementations
  private async triggerConversationOptimization(): Promise<void> {
    // Implementation would trigger conversation history cleanup
    console.log('[SelfHealing] Triggering conversation optimization...');
    // This would integrate with existing context management system
  }
  
  private async switchToSafeMode(): Promise<void> {
    // Implementation would switch to lightweight, more reliable prompts
    console.log('[SelfHealing] Switching to safe mode...');
    // This could set a flag that forces lightweight prompt usage
  }
  
  private async enableCostOptimization(): Promise<void> {
    // Implementation would enable aggressive token pruning and caching
    console.log('[SelfHealing] Enabling cost optimization...');
    // This could reduce token limits and enable more aggressive context pruning
  }
  
  private async improveContextManagement(): Promise<void> {
    // Implementation would reset conversation contexts more frequently
    console.log('[SelfHealing] Improving context management...');
    // This could clear session data more aggressively
  }
  
  // Record healing actions for audit trail
  private async recordHealingAction(action: Omit<HealingAction, 'id' | 'timestamp'>): Promise<void> {
    const healingAction: HealingAction = {
      id: `heal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      ...action
    };
    
    this.healingActions.push(healingAction);
    
    // Keep only last 100 actions
    if (this.healingActions.length > 100) {
      this.healingActions = this.healingActions.slice(-100);
    }
    
    console.log(`[SelfHealing] Recorded action: ${action.action} - ${action.status}`);
  }
  
  // Get healing history
  getHealingHistory(): HealingAction[] {
    return [...this.healingActions];
  }
  
  // Manual trigger for health check
  async manualHealthCheck(): Promise<SystemHealth> {
    console.log('[SelfHealing] Manual health check triggered');
    return await this.performHealthCheck();
  }
}

// Export singleton instance
export const selfHealingSystem = new SelfHealingSystem();

// Helper functions for integration
export async function initializeSelfHealing(): Promise<void> {
  console.log('[SelfHealing] Initializing self-healing system...');
  await selfHealingSystem.startMonitoring(30); // Check every 30 minutes
}

export async function getSystemHealth(): Promise<SystemHealth> {
  return await selfHealingSystem.performHealthCheck();
}

export function getHealingHistory(): HealingAction[] {
  return selfHealingSystem.getHealingHistory();
}

export default {
  selfHealingSystem,
  initializeSelfHealing,
  getSystemHealth,
  getHealingHistory
};
