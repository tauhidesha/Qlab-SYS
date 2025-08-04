# Bosmat-SYS: Advanced AI-Powered Customer Service System

A comprehensive, production-ready AI customer service system built with Next.js, featuring advanced OpenAI integration, robust error handling, comprehensive monitoring, and enterprise-grade security.

## 🚀 Features

### Core AI Capabilities
- **Advanced OpenAI Integration**: Flexible agent architecture with multiple AI models
- **Intelligent Conversation Flow**: Context-aware responses with adaptive conversation patterns
- **Tool Integration**: Comprehensive tool system for booking, pricing, and service inquiries
- **Multi-Agent Architecture**: Specialized agents for different conversation types

### Enterprise Features
- **Robust Error Handling**: Circuit breakers, retry mechanisms, and graceful degradation
- **Comprehensive Security**: Authentication, authorization, rate limiting, and input validation
- **Advanced Monitoring**: Metrics collection, health checks, and alerting
- **Performance Optimization**: Caching strategies, database connection pooling
- **Scalable Architecture**: Microservices-ready with Docker containerization

### Development & Testing
- **Comprehensive Test Framework**: Unit, integration, and performance testing
- **Type Safety**: Full TypeScript implementation with strict typing
- **Code Quality**: ESLint, Prettier, and comprehensive error handling
- **Documentation**: Extensive API documentation and usage examples

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+
- OpenAI API Key

### 1. Clone and Install
```bash
git clone <repository-url>
cd Bosmat-SYS
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start with Docker
```bash
docker-compose up -d
```

### 4. Run Migrations
```bash
npm run migrate
```

### 5. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   Load Balancer │    │   Monitoring    │
│  (WhatsApp,Web) │────│     (Nginx)     │────│  (Grafana)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   Next.js App   │
                       │   (Main Server) │
                       └─────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │      Redis      │    │   OpenAI API    │
│   (Database)    │    │    (Cache)      │    │   (AI Models)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Agent Architecture
```
┌─────────────────┐
│   BaseAgent     │
│  (Abstract)     │
└─────────────────┘
         │
    ┌────┴────┐
    │         │
┌─────────┐ ┌─────────┐
│  Zoya   │ │ Router  │
│ Agent   │ │ Agent   │
└─────────┘ └─────────┘
```

### Key Components

#### 1. Agent System (`src/ai/agents/`)
- **BaseAgent**: Abstract base class with common functionality
- **ZoyaAgent**: Main conversational AI agent
- **RouterAgent**: Intent classification and routing
- **Error Handling**: Comprehensive error management with retry logic

#### 2. Middleware (`src/ai/middleware/`)
- **Authentication**: JWT, API key, and session-based auth
- **Rate Limiting**: Configurable rate limiting per client
- **Input Validation**: Comprehensive input sanitization
- **Security**: XSS protection, SQL injection prevention

#### 3. Utilities (`src/ai/utils/`)
- **Caching**: In-memory and Redis-based caching
- **Database**: Connection pooling and query optimization
- **Logging**: Structured logging with multiple levels
- **Monitoring**: Metrics collection and health checks
- **Validation**: Input validation and sanitization

#### 4. Testing (`src/ai/tests/`)
- **Test Framework**: Custom testing framework
- **Unit Tests**: Component-level testing
- **Integration Tests**: End-to-end testing
- **Performance Tests**: Load and stress testing

## 🛠️ Installation

### Development Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Database Setup**
```bash
# Start PostgreSQL (if not using Docker)
createdb bosmat_sys

# Run migrations
npm run migrate
```

3. **Redis Setup**
```bash
# Start Redis (if not using Docker)
redis-server
```

4. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bosmat_sys
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bosmat_sys
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Firebase (for session storage)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Security
JWT_SECRET=your_jwt_secret
API_KEYS=key1:permissions,key2:permissions

# Monitoring
GRAFANA_PASSWORD=admin
SLACK_WEBHOOK_URL=your_slack_webhook
```

### Production Setup

1. **Docker Deployment**
```bash
# Build and start all services
docker-compose up -d

# Check service health
docker-compose ps
```

2. **Environment Variables**
```bash
# Set production environment variables
export NODE_ENV=production
export DATABASE_URL=your_production_db_url
# ... other production variables
```

3. **SSL Configuration**
```bash
# Place SSL certificates in nginx/ssl/
cp your_cert.pem nginx/ssl/
cp your_key.pem nginx/ssl/
```

## ⚙️ Configuration

### Agent Configuration
```typescript
// src/ai/config/agentConfig.ts
export const agentConfig = {
  zoya: {
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 2000,
    timeout: 30000,
    retryAttempts: 3
  },
  router: {
    model: 'gpt-4o-mini',
    temperature: 0,
    maxTokens: 500,
    timeout: 10000
  }
};
```

### Security Configuration
```typescript
// src/ai/middleware/auth.ts
export const authConfig = {
  requireAuth: true,
  allowedOrigins: ['https://yourdomain.com'],
  rateLimitConfig: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100
  },
  apiKeys: {
    'your-api-key': {
      permissions: ['user', 'admin'],
      name: 'Production Key'
    }
  }
};
```

### Database Configuration
```typescript
// src/ai/utils/database.ts
export const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  poolConfig: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
  }
};
```

## 📚 Usage Examples

### Basic Agent Usage
```typescript
import { ZoyaAgent } from '@/ai/agents/implementations/ZoyaAgent';

const agent = new ZoyaAgent({
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 2000,
  timeout: 30000,
  retryAttempts: 3
});

const response = await agent.generateResponse({
  message: 'Halo, saya mau tanya tentang layanan detailing',
  context: { isFirstMessage: true },
  sessionId: 'user-session-123',
  userId: 'user-456'
});

console.log(response.response); // AI response
console.log(response.confidence); // Confidence score
console.log(response.route); // Routing decision
```

### Authentication Middleware
```typescript
import { AuthMiddleware } from '@/ai/middleware/auth';

const authMiddleware = new AuthMiddleware(authConfig);

// In your API route
export async function POST(request: NextRequest) {
  try {
    const authContext = await authMiddleware.authenticate(request);
    
    if (!authContext.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Process authenticated request
    // ...
    
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return authMiddleware.createAuthResponse(error);
    }
    throw error;
  }
}
```

### Caching Usage
```typescript
import { CacheManager } from '@/ai/utils/cache';

const cache = new CacheManager({
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 1000
});

// Cache a response
await cache.set('user-123-response', response, 10 * 60 * 1000); // 10 minutes

// Retrieve from cache
const cachedResponse = await cache.get('user-123-response');

if (cachedResponse) {
  return cachedResponse;
}
```

### Database Usage
```typescript
import { DatabasePool } from '@/ai/utils/database';

const db = new DatabasePool(dbConfig);
await db.initialize();

// Simple query
const users = await db.query<User>('SELECT * FROM users WHERE active = $1', [true]);

// Transaction
await db.transaction(async (tx) => {
  await tx.query('INSERT INTO sessions (id, user_id) VALUES ($1, $2)', [sessionId, userId]);
  await tx.query('UPDATE users SET last_active = NOW() WHERE id = $1', [userId]);
});
```

### Monitoring Usage
```typescript
import { metricsCollector, healthChecker } from '@/ai/utils/monitoring';

// Record metrics
metricsCollector.counter('api.requests', 1, { endpoint: '/api/chat' });
metricsCollector.timer('api.response_time', startTime, { endpoint: '/api/chat' });

// Health checks
healthChecker.registerCheck('database', async () => {
  const isHealthy = await db.healthCheck();
  return {
    service: 'database',
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: Date.now()
  };
});

// Get health status
const health = healthChecker.getOverallHealth();
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "ZoyaAgent"

# Run with coverage
npm run test:coverage

# Run performance tests
npm run test:performance
```

### Writing Tests
```typescript
import { TestFramework, TestUtils } from '@/ai/tests/framework/TestFramework';

const testSuite = {
  name: 'My Test Suite',
  tests: [
    {
      name: 'should handle basic input',
      input: TestUtils.createMockInput({
        message: 'Hello'
      }),
      assertions: [
        (output) => TestUtils.assertContains(output, 'Hello'),
        (output) => TestUtils.assertConfidenceAbove(output, 0.7)
      ]
    }
  ]
};

const framework = new TestFramework();
framework.addSuite(testSuite);
const results = await framework.runAll();
```

### Performance Testing
```typescript
import { PerformanceTestUtils } from '@/ai/tests/framework/TestFramework';

// Measure response time
const perfResults = await PerformanceTestUtils.measureResponseTime(
  async () => agent.generateResponse(input),
  100 // iterations
);

// Load testing
const loadResults = await PerformanceTestUtils.loadTest(
  async () => agent.generateResponse(input),
  10, // concurrency
  30000 // duration in ms
);
```

## 🚀 Deployment

### Docker Deployment
```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Development deployment
docker-compose -f docker-compose.dev.yml up -d

# Scaling services
docker-compose up -d --scale app=3
```

### Environment-Specific Configurations

#### Development
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  app:
    build:
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

#### Production
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    build:
      target: production
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### Health Checks
```bash
# Check application health
curl http://localhost:3000/api/health

# Check individual services
docker-compose exec app npm run health-check
```

### Monitoring Setup
```bash
# Access monitoring dashboards
open http://localhost:3001  # Grafana
open http://localhost:9090  # Prometheus
```

## 📊 Monitoring

### Metrics Collection
The system automatically collects:
- **Response Times**: API endpoint performance
- **Error Rates**: Success/failure ratios
- **Token Usage**: OpenAI API consumption
- **Cache Hit Rates**: Caching effectiveness
- **Database Performance**: Query times and connection pool stats

### Health Checks
- **Application Health**: `/api/health`
- **Database Connectivity**: Automatic connection testing
- **OpenAI API Status**: API availability checks
- **Memory Usage**: System resource monitoring

### Alerting
Configure alerts in `src/ai/utils/monitoring.ts`:
```typescript
alertManager.addRule({
  name: 'High Error Rate',
  condition: (metrics) => {
    const errorRate = calculateErrorRate(metrics);
    return errorRate > 0.1; // 10%
  },
  severity: 'high',
  message: 'Error rate exceeded 10%',
  cooldownMs: 5 * 60 * 1000
});
```

### Grafana Dashboards
Pre-configured dashboards for:
- Application Performance
- Database Metrics
- AI Agent Performance
- System Resources
- Error Tracking

## 🔒 Security

### Authentication Methods
1. **JWT Tokens**: For user sessions
2. **API Keys**: For service-to-service communication
3. **Session-based**: For web applications

### Security Features
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: Configurable per-client limits
- **CORS Protection**: Origin-based access control
- **XSS Prevention**: Output sanitization
- **SQL Injection Prevention**: Parameterized queries

### Security Configuration
```typescript
// Enable security features
const securityConfig = {
  enableRateLimit: true,
  enableCORS: true,
  enableInputValidation: true,
  enableOutputSanitization: true,
  maxRequestSize: '10mb',
  allowedOrigins: ['https://yourdomain.com']
};
```

## 🔧 Troubleshooting

### Common Issues

#### 1. OpenAI API Errors
```bash
# Check API key
echo $OPENAI_API_KEY

# Test API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

#### 2. Database Connection Issues
```bash
# Check database connectivity
npm run db:test

# Check connection pool
docker-compose exec app npm run db:pool-status
```

#### 3. Redis Connection Issues
```bash
# Test Redis connectivity
redis-cli ping

# Check Redis logs
docker-compose logs redis
```

#### 4. High Memory Usage
```bash
# Check memory usage
docker stats

# Analyze memory leaks
npm run memory:analyze
```

### Debug Mode
```bash
# Enable debug logging
export DEBUG=bosmat:*
npm run dev

# Or with Docker
docker-compose -f docker-compose.debug.yml up
```

### Log Analysis
```bash
# View application logs
docker-compose logs -f app

# Search for errors
docker-compose logs app | grep ERROR

# Monitor real-time logs
tail -f logs/application.log
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

### Code Standards
- **TypeScript**: Strict typing required
- **ESLint**: Follow configured rules
- **Prettier**: Auto-formatting enabled
- **Testing**: Minimum 80% coverage
- **Documentation**: Update README for new features

### Commit Guidelines
```bash
# Use conventional commits
git commit -m "feat: add new agent capability"
git commit -m "fix: resolve caching issue"
git commit -m "docs: update API documentation"
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the excellent framework
- The open-source community for various tools and libraries

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the [troubleshooting guide](#troubleshooting)
- Review the [API documentation](#api-documentation)

---

**Built with ❤️ for enterprise-grade AI customer service**
