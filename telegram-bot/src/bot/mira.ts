/**
 * Mira - The Conversational AI Assistant
 * 
 * Core personality and conversation engine for QLAB POS management
 */

import { ConversationContext, UserContext } from '../types/conversation';
import { IntentRecognizer } from '../ai/intents';
import { BusinessContext } from '../ai/context';
import { ResponseGenerator } from '../ai/responses';
import { ConversationMemory } from './memory';
import { Personality } from './personality';

export interface MiraConfig {
  businessName: string;
  timezone: string;
  dailyTarget: number;
  monthlyTarget: number;
}

export class MiraAssistant {
  private intentRecognizer: IntentRecognizer;
  private businessContext: BusinessContext;
  private responseGenerator: ResponseGenerator;
  private memory: ConversationMemory;
  private personality: Personality;
  private config: MiraConfig;

  constructor() {
    this.config = {
      businessName: process.env.BUSINESS_NAME || 'QLAB POS',
      timezone: process.env.BUSINESS_TIMEZONE || 'Asia/Jakarta',
      dailyTarget: parseInt(process.env.DAILY_TARGET || '2000000'),
      monthlyTarget: parseInt(process.env.MONTHLY_TARGET || '60000000')
    };

    this.intentRecognizer = new IntentRecognizer();
    this.businessContext = new BusinessContext();
    this.responseGenerator = new ResponseGenerator();
    this.memory = new ConversationMemory();
    this.personality = new Personality();
  }

  async initialize(): Promise<void> {
    console.log('🤖 Initializing Mira Assistant...');
    
    // Initialize all components
    await this.businessContext.initialize();
    await this.memory.initialize();
    
    console.log('✅ Mira is ready to chat!');
  }

  async processMessage(
    message: string, 
    userContext: UserContext
  ): Promise<string> {
    try {
      // 1. Get conversation context
      const conversationContext = await this.memory.getContext(userContext.userId);
      
      // 2. Analyze user intent
      const intent = await this.intentRecognizer.analyze(message, conversationContext);
      
      // 3. Get business context
      const businessData = await this.businessContext.getCurrentContext();
      
      // 4. Generate response based on intent and context
      const response = await this.responseGenerator.generate({
        intent,
        message,
        userContext,
        conversationContext,
        businessData,
        config: this.config
      });
      
      // 5. Apply personality and tone
      const personalizedResponse = this.personality.apply(response, {
        intent,
        userContext,
        businessData
      });
      
      // 6. Update conversation memory
      await this.memory.update(userContext.userId, {
        userMessage: message,
        botResponse: personalizedResponse,
        intent,
        timestamp: new Date()
      });
      
      return personalizedResponse;
      
    } catch (error) {
      console.error('Error in Mira.processMessage:', error);
      return this.personality.getErrorResponse();
    }
  }

  async getProactiveNotifications(userId: string): Promise<string[]> {
    try {
      const businessData = await this.businessContext.getCurrentContext();
      const notifications: string[] = [];

      // Check for important alerts
      if (businessData.alerts.length > 0) {
        notifications.push(
          this.personality.formatAlert(businessData.alerts[0])
        );
      }

      // Check for business insights
      if (businessData.insights.length > 0) {
        notifications.push(
          this.personality.formatInsight(businessData.insights[0])
        );
      }

      return notifications;
    } catch (error) {
      console.error('Error getting proactive notifications:', error);
      return [];
    }
  }
}

export default MiraAssistant;
