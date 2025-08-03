# Token Optimization Testing Guide

## Quick Start

### 1. Mock Testing (No API Key Required)
```bash
# Run dengan simulasi data - tidak perlu API key
npm run test:token-optimization

# Quick analysis tanpa API calls
npm run test:token-simple
```

### 2. Real API Testing (Requires OPENAI_API_KEY)

#### Option A: Set Environment Variable
```bash
# Linux/Mac
export OPENAI_API_KEY=your_openai_api_key_here
npm run test:token-optimization

# Windows Command Prompt
set OPENAI_API_KEY=your_openai_api_key_here
npm run test:token-optimization

# Windows PowerShell
$env:OPENAI_API_KEY="your_openai_api_key_here"
npm run test:token-optimization
```

#### Option B: Use .env File
```bash
# Pastikan .env file sudah ada dengan OPENAI_API_KEY
npm run test:token-optimization:real
```

#### Option C: One-liner dengan Environment Variable
```bash
# Linux/Mac
OPENAI_API_KEY=your_key_here npm run test:token-optimization

# Alternative dengan dotenv-cli
npx dotenv-cli -e .env -- npm run test:token-optimization
```

## Testing Commands

| Command | Description | API Key Required |
|---------|-------------|------------------|
| `npm run test:token-simple` | Quick analysis tanpa API calls | ❌ No |
| `npm run test:token-optimization` | Mock testing (simulated data) | ❌ No |
| `npm run test:token-optimization:real` | Real API testing dengan .env | ✅ Yes |
| `OPENAI_API_KEY=key npm run test:token-optimization` | Real API testing inline | ✅ Yes |

## Expected Output

### Mock Mode (No API Key)
```
🚀 Starting Token Optimization Test Suite
📋 Running 5 test cases...
⚠️  OPENAI_API_KEY not found, using mock functions
💡 To test with real API, set OPENAI_API_KEY environment variable

🎭 MOCK MODE ENABLED
📊 This will simulate token usage patterns for demonstration
🔑 To test with real API: OPENAI_API_KEY=your_key npm run test:token-optimization

🧪 Testing: Simple Service Inquiry
  📊 Running original flow...
  ⚡ Running optimized flow...

📈 TOKEN OPTIMIZATION TEST REPORT
```

### Real API Mode (With API Key)
```
🚀 Starting Token Optimization Test Suite
📋 Running 5 test cases...
✅ Using real API flows with OPENAI_API_KEY

🧪 Testing: Simple Service Inquiry
  📊 Running original flow...
  ⚡ Running optimized flow...

📈 TOKEN OPTIMIZATION TEST REPORT
📊 SUMMARY STATISTICS
✅ Successful Tests: 5/5
📊 Average Token Usage:
   Original: 6500 tokens
   Optimized: 2100 tokens
📉 Average Token Reduction: 67.7%
⚡ Average Latency Improvement: 42.3%
```

## Troubleshooting

### Error: "OPENAI_API_KEY environment variable is missing"
**Solution**: Script akan otomatis menggunakan mock mode. Untuk real testing:
```bash
# Set API key dan jalankan lagi
export OPENAI_API_KEY=your_key_here
npm run test:token-optimization
```

### Error: "Cannot find module '@/ai/flows/...'"
**Solution**: Pastikan TypeScript path mapping sudah benar:
```bash
# Check tsconfig.json paths
npm run typecheck
```

### Error: Module import issues
**Solution**: Gunakan tsx untuk menjalankan TypeScript:
```bash
# Pastikan tsx terinstall
npm install -g tsx
# atau gunakan npx
npx tsx scripts/test-token-optimization.ts
```

## File Structure

```
scripts/
├── test-token-optimization.ts    # Full A/B testing script
└── test-token-simple.ts         # Quick analysis script

src/ai/
├── config/
│   ├── aiPrompts.ts             # Original prompts
│   └── aiPrompts-optimized.ts   # Optimized prompts
├── utils/
│   └── contextManagement.ts    # Context optimization
├── agent/
│   └── runZoyaAIAgent-optimized.ts  # Optimized agent
└── flows/
    └── cs-whatsapp-reply-flow-optimized.ts  # Optimized flow
```

## Next Steps

1. **Start with Mock Testing**:
   ```bash
   npm run test:token-simple
   ```

2. **Review Results**: Analisis token reduction estimates

3. **Setup Real Testing**: Get OpenAI API key dan test dengan real data

4. **Implement Optimizations**: Gunakan files yang sudah dibuat

5. **Deploy Gradually**: A/B testing di production

## API Key Sources

- [OpenAI Platform](https://platform.openai.com/api-keys)
- Organization settings untuk team access
- Environment variables untuk security

## Security Note

**NEVER** commit API keys ke git repository. Gunakan:
- Environment variables
- .env files (dengan .gitignore)
- Secret management systems
