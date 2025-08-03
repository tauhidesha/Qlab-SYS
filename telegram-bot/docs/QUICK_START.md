# QLAB Telegram Bot - Quick Start Guide

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- Telegram account
- Firebase Admin SDK credentials
- OpenAI API key

### 2. Create Telegram Bot

1. Open Telegram and find [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow instructions
3. Choose name: `QLAB AI Assistant` 
4. Choose username: `qlab_ai_assistant_bot` (or any available)
5. Save the bot token

### 3. Get Your Telegram User ID

1. Find [@userinfobot](https://t.me/userinfobot)
2. Send `/start`
3. Save your user ID number

### 4. Setup Project

```bash
cd telegram-bot
npm install
cp .env.example .env
```

### 5. Configure Environment

Edit `.env` file:

```env
# Your bot token from BotFather
TELEGRAM_BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi

# Your Telegram user ID from userinfobot
ADMIN_TELEGRAM_ID=123456789

# Same OpenAI key from main QLAB project
OPENAI_API_KEY=sk-...

# Same Firebase config from main project
FIREBASE_PROJECT_ID=detailflow-8mkmj
FIREBASE_SERVICE_ACCOUNT_BASE64=eyJ0eXBlIjoi...

# Business settings
BUSINESS_NAME=Bosmat Repainting and Detailing Studio
DAILY_TARGET=2000000
MONTHLY_TARGET=60000000
```

### 6. Run the Bot

```bash
npm run dev
```

### 7. Test the Bot

1. Find your bot on Telegram
2. Send `/start`
3. Try: "Gimana penjualan hari ini?"

## 🛠️ Development Commands

```bash
# Development with auto-reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Option 2: Railway
```bash
# Connect Railway to your GitHub repo
# Set environment variables in Railway dashboard
```

### Option 3: Heroku
```bash
# Create Heroku app
heroku create qlab-telegram-bot

# Set environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token

# Deploy
git push heroku main
```

## 📱 First Conversations

Try these example messages:

### Business Monitoring
- "Halo Mira!"
- "Gimana penjualan hari ini?"
- "Ada yang aneh gak?"
- "Berapa untung hari ini?"

### Financial Operations
- "Catat pengeluaran bensin 50ribu"
- "Setorkan 500ribu ke bank"
- "Berapa cash kita sekarang?"

### Customer Insights
- "Siapa customer hari ini?"
- "Ada customer baru gak?"
- "Customer mana yang paling sering datang?"

## 🔧 Troubleshooting

### Bot doesn't respond
1. Check bot token is correct
2. Verify your user ID is in AUTHORIZED_USERS
3. Check Firebase connection

### Permission errors
1. Verify Firebase service account has correct permissions
2. Check Firestore security rules

### OpenAI errors
1. Verify API key is valid
2. Check account has credits

## 📞 Support

- Check logs for detailed error messages
- Join our Discord for help
- Create GitHub issue for bugs

---

**Ready to chat with your business? Start with "Halo Mira!" 🤖**
