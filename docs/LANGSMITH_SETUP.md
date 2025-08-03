# LangSmith Integration Setup

This document explains how to configure and use LangSmith tracing in the Qlab-SYS project.

## Overview

LangSmith has been integrated into the Zoya AI agent to provide:
- **Performance monitoring**: Track token usage, latency, and tool execution
- **Debugging**: Trace conversations and tool calls for debugging
- **Analytics**: Monitor customer interactions and AI behavior
- **Error tracking**: Capture and analyze errors in AI flows

## Environment Configuration

Add these environment variables to your `.env.local` file:

```bash
# LangSmith Configuration
LANGSMITH_TRACING=true
LANGSMITH_PROJECT=qlab-sys-development
LANGSMITH_API_KEY=your_langsmith_api_key_here
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
```

### Environment Variables Explained

- `LANGSMITH_TRACING`: Enable/disable tracing (true/false)
- `LANGSMITH_PROJECT`: Project name in LangSmith dashboard
- `LANGSMITH_API_KEY`: Your LangSmith API key
- `LANGSMITH_ENDPOINT`: LangSmith API endpoint (usually default)

## What's Being Tracked

### 1. AI Agent Conversations
- Customer message processing
- Token usage (estimated vs actual)
- Response generation
- Tool executions
- Performance metrics

### 2. Tool Executions
- Individual tool calls
- Batch tool executions
- Tool arguments and results
- Execution latency

### 3. WhatsApp Flow
- Message processing flow
- Session management
- Conversation history optimization

## Implementation Details

### Files Modified

1. **`src/lib/openai.ts`**: OpenAI client wrapped with LangSmith
2. **`src/lib/langsmith.ts`**: LangSmith utilities and configuration
3. **`src/ai/agent/runZoyaAIAgent.ts`**: AI agent with tracing
4. **`src/ai/flows/cs-whatsapp-reply-flow.ts`**: WhatsApp flow with tracing

### Key Features

- **Automatic OpenAI Tracing**: All OpenAI calls are automatically traced
- **Tool Execution Tracking**: Individual and batch tool executions
- **Performance Metrics**: Token usage, latency, memory usage
- **Error Tracking**: Detailed error information in traces
- **Customer Context**: Customer information included in traces

## Usage

### Enabling LangSmith

Set `LANGSMITH_TRACING=true` in your environment variables. The system will automatically start tracing.

### Viewing Traces

1. Go to your LangSmith dashboard
2. Select your project (e.g., `qlab-sys-development`)
3. View traces in real-time as conversations happen

### Trace Data Structure

Each trace includes:
- Customer information (number, name)
- Conversation metrics (token usage, message count)
- Tool executions and results
- Performance data (latency, iterations)
- Error information (if any)

## Development

### Adding New Traceable Functions

Use the `createTraceable` utility:

```typescript
import { createTraceable, TRACE_TAGS, createTraceMetadata } from '@/lib/langsmith';

const myFunction = createTraceable(
  async (data) => {
    // Your function logic
  },
  'my-function-name',
  [...TRACE_TAGS.CUSTOM],
  createTraceMetadata('my-component', 'my-operation')
);
```

### Available Trace Tags

- `TRACE_TAGS.AI_AGENT`: AI agent operations
- `TRACE_TAGS.WHATSAPP`: WhatsApp messaging
- `TRACE_TAGS.TOOLS`: Tool executions
- `TRACE_TAGS.BOOKING`: Booking operations
- `TRACE_TAGS.REPAINT`: Repaint services
- `TRACE_TAGS.CUSTOMER`: Customer interactions

## Production Considerations

1. **Performance**: LangSmith adds minimal overhead
2. **Privacy**: Ensure customer data handling complies with privacy policies
3. **Costs**: Monitor LangSmith usage for cost optimization
4. **Retention**: Configure trace retention policies in LangSmith

## Troubleshooting

### Common Issues

1. **Traces not appearing**: Check API key and project configuration
2. **Performance impact**: Disable in production if needed
3. **Large traces**: Consider sampling for high-volume scenarios

### Debug Logs

The system logs LangSmith configuration on startup:
```
[LangSmith Config] { enabled: true, project: 'qlab-sys-development', ... }
```

## Benefits

1. **Debugging**: Quickly identify issues in AI conversations
2. **Optimization**: Find performance bottlenecks and token waste
3. **Monitoring**: Track system health and customer satisfaction
4. **Analytics**: Understand usage patterns and customer behavior

This integration provides comprehensive observability for the Zoya AI system while maintaining performance and reliability.
