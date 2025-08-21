# 🚀 Gemini Migration Guide

## Overview

This guide provides step-by-step instructions for migrating from OpenAI GPT-4o to Google Gemini 2.5 Pro in the Bosmat-SYS project.

## 🎯 Benefits of Migration

### Cost Optimization
- **Gemini 2.5 Pro**: ~$0.0025 per 1M input tokens, $0.0075 per 1M output tokens
- **GPT-4o**: ~$0.005 per 1M input tokens, $0.015 per 1M output tokens
- **Potential Savings**: 50-75% reduction in AI costs

### Performance Improvements
- **Longer Context**: Gemini supports up to 2M tokens vs GPT-4o's 128K
- **Better Multilingual**: Enhanced Indonesian language support
- **Faster Response**: Optimized for conversational AI

### Reliability
- **Google Infrastructure**: Enterprise-grade reliability
- **Hybrid Mode**: Automatic fallback to OpenAI if needed
- **Redundancy**: Multiple AI providers for fault tolerance

## 📋 Migration Checklist

### Phase 1: Preparation (Week 1)
- [ ] Get Google AI API key
- [ ] Install Google AI SDK
- [ ] Backup current OpenAI configuration
- [ ] Review existing prompts and tools

### Phase 2: Core Migration (Week 2-3)
- [ ] Create Gemini client configuration
- [ ] Migrate Zoya AI agent
- [ ] Update vision analysis tools
- [ ] Migrate embedding functions
- [ ] Update AI configuration

### Phase 3: Integration (Week 4)
- [ ] Implement AI provider switching
- [ ] Update WhatsApp flow
- [ ] Create migration scripts
- [ ] Add comprehensive testing

### Phase 4: Deployment (Week 5)
- [ ] Test in staging environment
- [ ] Monitor performance metrics
- [ ] Gradual rollout to production
- [ ] Update monitoring dashboard

## 🛠️ Quick Start Migration

### 1. Install Dependencies
```bash
npm install @google/generative-ai @google-ai/generativelanguage
```

### 2. Set Environment Variables
```bash
# Add to .env.local
GOOGLE_AI_API_KEY=your_gemini_api_key
GOOGLE_AI_PROJECT_ID=your_project_id
GOOGLE_AI_LOCATION=us-central1
AI_PROVIDER=gemini
```

### 3. Run Migration Script
```bash
npm run migrate:gemini
```

### 4. Test Integration
```bash
npm run test:gemini
```

### 5. Switch to Gemini
```bash
npm run switch:ai-provider gemini
```

## 🔧 Manual Migration Steps

### Step 1: Update AI Client Configuration

Replace `src/lib/openai.ts` with Gemini configuration:

```typescript
// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export const gemini = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
export const GEMINI_MODELS = {
  PRO: 'gemini-2.0-flash-exp',
  PRO_VISION: 'gemini-2.0-flash-exp',
  EMBEDDING: 'embedding-001',
};
```

### Step 2: Migrate AI Agent

Update `src/ai/agent/runZoyaAIAgent.ts`:

```typescript
// Import Gemini agent instead of OpenAI
import { runZoyaAIGeminiAgent } from './runZoyaAIGeminiAgent';

// Use Gemini agent
const result = await runZoyaAIGeminiAgent({
  chatHistory,
  session,
  senderNumber,
  senderName,
  imageContext,
});
```

### Step 3: Update Tool Calls

Gemini handles tool calls differently than OpenAI. Update tool execution:

```typescript
// Gemini tool call format
const toolsConfig = zoyaTools.map(tool => ({
  functionDeclarations: [{
    name: tool.function.name,
    description: tool.function.description,
    parameters: tool.function.parameters,
  }],
}));
```

### Step 4: Update Vision Analysis

Replace OpenAI vision with Gemini vision:

```typescript
// src/ai/tools/vision/analyzeMotorImageGemini.ts
import { analyzeImage } from '@/lib/gemini';

export async function analyzeMotorImageGemini(
  imageUrl: string,
  analysisType: string,
  specificRequest?: string
) {
  return await analyzeImage(imageUrl, prompt, {
    temperature: 0.3,
    maxOutputTokens: 1024,
  });
}
```

## 🧪 Testing Strategy

### 1. Unit Tests
```bash
# Test individual components
npm run test:gemini
```

### 2. Integration Tests
```bash
# Test full conversation flow
npm run test:ai
```

### 3. Performance Tests
```bash
# Test response times and token usage
npm run test:token-optimization:real
```

### 4. Manual Testing
- Test WhatsApp integration
- Test image analysis
- Test booking flow
- Test error handling

## 📊 Monitoring & Metrics

### Key Metrics to Track
- **Response Time**: Target < 3 seconds
- **Token Usage**: Compare with OpenAI costs
- **Success Rate**: Target > 95%
- **Error Rate**: Target < 5%
- **Fallback Usage**: Monitor hybrid mode effectiveness

### Dashboard Updates
- Add Gemini-specific metrics
- Show cost comparison
- Display provider usage statistics
- Alert on performance issues

## 🔄 Hybrid Mode Configuration

### Enable Hybrid Mode
```bash
# Set environment variable
AI_PROVIDER=hybrid
```

### Fallback Logic
```typescript
try {
  // Try Gemini first
  result = await runZoyaAIGeminiAgent(input);
} catch (error) {
  if (shouldUseFallback(error)) {
    // Fallback to OpenAI
    result = await runZoyaAIAgent(input);
  }
}
```

### Fallback Triggers
- Rate limit exceeded
- Service unavailable
- Timeout errors
- Quota exceeded

## 🚨 Troubleshooting

### Common Issues

#### 1. API Key Issues
```bash
# Check environment variables
echo $GOOGLE_AI_API_KEY

# Verify API key format
# Should be a long string starting with "AI"
```

#### 2. Tool Call Errors
```typescript
// Gemini tool calls use different format
// Update tool definitions for Gemini compatibility
```

#### 3. Response Format Issues
```typescript
// Gemini responses may need parsing
// Add response validation and parsing logic
```

#### 4. Performance Issues
```typescript
// Optimize prompts for Gemini
// Reduce context length if needed
// Use appropriate model variants
```

### Debug Commands
```bash
# Check current provider
npm run switch:ai-provider show

# Test specific functionality
npm run test:gemini

# Compare providers
npm run switch:ai-provider compare
```

## 📈 Performance Optimization

### Prompt Optimization
- Reduce prompt length for faster responses
- Use Gemini-specific prompt patterns
- Optimize tool descriptions

### Context Management
- Implement conversation summarization
- Use sliding window for long conversations
- Optimize token usage

### Caching Strategy
- Cache common responses
- Cache tool results
- Implement conversation caching

## 🔒 Security Considerations

### API Key Management
- Use environment variables
- Rotate keys regularly
- Monitor usage patterns

### Data Privacy
- Review data handling policies
- Ensure compliance with regulations
- Monitor data transmission

### Rate Limiting
- Implement request throttling
- Monitor API quotas
- Set up alerts for quota limits

## 📚 Additional Resources

### Documentation
- [Google AI SDK Documentation](https://ai.google.dev/docs)
- [Gemini API Reference](https://ai.google.dev/api)
- [Gemini Safety Guidelines](https://ai.google.dev/safety)

### Community
- [Google AI Community](https://ai.google.dev/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-ai)
- [GitHub Issues](https://github.com/google/generative-ai-js/issues)

### Support
- [Google AI Support](https://ai.google.dev/support)
- [API Status Page](https://status.ai.google.dev/)
- [Developer Console](https://console.cloud.google.com/)

## 🎉 Migration Success Criteria

### Technical Criteria
- [ ] All tests passing
- [ ] Response times < 3 seconds
- [ ] Error rate < 5%
- [ ] Cost reduction achieved
- [ ] No data loss

### Business Criteria
- [ ] Customer satisfaction maintained
- [ ] Booking flow working correctly
- [ ] Image analysis accurate
- [ ] Support workload not increased
- [ ] ROI targets met

### Monitoring Criteria
- [ ] Dashboard metrics updated
- [ ] Alerts configured
- [ ] Performance tracked
- [ ] Costs monitored
- [ ] Fallback tested

## 🔄 Rollback Plan

### If Issues Arise
1. **Immediate Rollback**: Switch back to OpenAI
   ```bash
   npm run switch:ai-provider openai
   ```

2. **Investigate Issues**: Check logs and metrics

3. **Fix Problems**: Address specific issues

4. **Gradual Rollout**: Test with limited traffic

5. **Full Migration**: Complete migration once stable

### Rollback Triggers
- Error rate > 10%
- Response time > 5 seconds
- Customer complaints
- Cost increase
- Data loss

---

**Need Help?** Contact the development team or refer to the troubleshooting section above.
