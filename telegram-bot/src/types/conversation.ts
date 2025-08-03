/**
 * Conversation Types and Interfaces
 */

export interface UserContext {
  userId: string;
  userName: string;
  chatId: string;
  role?: 'admin' | 'manager' | 'staff';
}

export interface ConversationContext {
  userId: string;
  history: ConversationTurn[];
  currentTopic?: string;
  lastIntent?: string;
  sessionStarted: Date;
  lastActivity: Date;
}

export interface ConversationTurn {
  userMessage: string;
  botResponse: string;
  intent: IntentResult;
  timestamp: Date;
  success: boolean;
}

export interface IntentResult {
  type: IntentType;
  confidence: number;
  entities: Record<string, any>;
  action?: string;
  parameters?: Record<string, any>;
}

export type IntentType = 
  // Business Monitoring
  | 'sales_inquiry'
  | 'revenue_check'
  | 'performance_status'
  | 'business_health'
  
  // Financial Operations
  | 'add_expense'
  | 'check_cash_flow'
  | 'profit_loss'
  | 'bank_deposit'
  
  // Customer Management
  | 'customer_inquiry'
  | 'customer_stats'
  | 'add_customer'
  | 'customer_history'
  
  // Transactions
  | 'transaction_search'
  | 'transaction_edit'
  | 'process_refund'
  | 'transaction_stats'
  
  // Staff & Operations
  | 'staff_performance'
  | 'attendance_check'
  | 'operational_status'
  
  // Inventory
  | 'stock_check'
  | 'inventory_alert'
  | 'update_inventory'
  
  // General
  | 'greeting'
  | 'small_talk'
  | 'help_request'
  | 'unknown';

export interface BusinessAlert {
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  actionRequired?: boolean;
}

export interface BusinessInsight {
  type: 'trend' | 'anomaly' | 'recommendation' | 'forecast';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  dataPoints?: Record<string, any>;
}

export interface BusinessMetrics {
  today: {
    revenue: number;
    transactions: number;
    customers: number;
    avgTicket: number;
    target: number;
    progress: number;
  };
  week: {
    revenue: number;
    growth: number;
    transactions: number;
    newCustomers: number;
  };
  month: {
    revenue: number;
    target: number;
    progress: number;
    profitMargin: number;
  };
  cashFlow: {
    cashOnHand: number;
    todayExpenses: number;
    weeklyExpenses: number;
  };
}

export interface ResponseContext {
  intent: IntentResult;
  message: string;
  userContext: UserContext;
  conversationContext: ConversationContext;
  businessData: BusinessContextData;
  config: any;
}

export interface BusinessContextData {
  metrics: BusinessMetrics;
  alerts: BusinessAlert[];
  insights: BusinessInsight[];
  lastUpdated: Date;
}
