# 🧠 Sentiment Analysis Setup Guide

## Overview
Sentiment Analysis system untuk mendeteksi mood customer dan auto-escalate ke human agent jika diperlukan.

## 🔧 Setup Requirements

### 1. Google Cloud Natural Language API
- **Service**: Google Cloud Natural Language API
- **Cost**: Free tier 1000 requests/month
- **Setup**: [Google Cloud Console](https://console.cloud.google.com/apis/library/language.googleapis.com)

### 2. Environment Variables
```env
# Google Cloud Natural Language API
GOOGLE_CLOUD_API_KEY=your_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id

# Alternative: Service Account File
GOOGLE_CLOUD_KEY_FILE=path/to/service-account.json
```

## 🚀 Features

### Sentiment Detection
- **Positive/Negative/Neutral** sentiment classification
- **Emotion detection** (angry, frustrated, happy, etc.)
- **Confidence scoring** untuk setiap analisis
- **Magnitude detection** untuk intensitas emosi

### Escalation System
- **Level 0-3** escalation berdasarkan sentiment
- **Auto-escalation** ke Bos Mamat untuk level 3
- **Manual escalation** trigger
- **Escalation analytics** dan tracking

### Response Enhancement
- **Sentiment-aware** AI responses
- **Tone adjustment** berdasarkan mood customer
- **Apology/compensation** suggestions
- **Context-aware** response guidelines

## 📊 Business Logic

### Escalation Levels
- **Level 0-1**: Normal response
- **Level 2**: Apologize + offer compensation
- **Level 3**: Immediate escalation to human

### Emotion Detection
- **Angry**: Auto-escalate
- **Frustrated**: Enhanced apology
- **Happy/Satisfied**: Normal response
- **Confused**: Clarification needed
- **Worried**: Reassurance needed

## 🧪 Testing

### Run Tests
```bash
npm run test:sentiment
```

### Test Coverage
- ✅ Basic sentiment analysis
- ✅ Emotion detection
- ✅ Escalation flow
- ✅ Performance testing
- ✅ Error handling

## 📈 Analytics

### Metrics Tracked
- Total interactions
- Negative interaction rate
- Escalation count
- Sentiment trends
- Response effectiveness

### Dashboard Data
```typescript
{
  totalInteractions: number,
  negativeRate: number, // percentage
  escalationRate: number, // percentage
  averageSentiment: number, // -1 to 1
  trend: 'improving' | 'declining' | 'stable'
}
```

## 🔄 Integration

### AI Flow Integration
1. **Pre-processing**: Analyze sentiment sebelum AI response
2. **Prompt enhancement**: Add sentiment context ke AI prompt
3. **Response adjustment**: Modify AI response berdasarkan sentiment
4. **Escalation check**: Auto-escalate jika diperlukan

### Database Integration
- **Session tracking**: Sentiment history per customer
- **Analytics storage**: Sentiment metrics untuk reporting
- **Escalation logs**: Track semua escalation events

## 💰 Cost Estimation

### Google Cloud Natural Language
- **Free tier**: 1000 requests/month
- **Paid**: $0.001 per request
- **Estimated monthly**: $0-50 (tergantung volume)

### WhatsApp API (Escalation)
- **Escalation messages**: $0.01-0.05 per message
- **Estimated monthly**: $10-100 (tergantung escalation rate)

## 🛠️ Troubleshooting

### Common Issues
1. **API Key Error**: Check `GOOGLE_CLOUD_API_KEY`
2. **Project ID Error**: Verify `GOOGLE_CLOUD_PROJECT_ID`
3. **Rate Limit**: Monitor API usage
4. **Escalation Not Working**: Check Bos Mamat phone number

### Debug Mode
```env
SENTIMENT_DEBUG=true
```
Enable untuk detailed logging.

## 📋 Maintenance

### Regular Tasks
- Monitor API usage dan costs
- Review escalation effectiveness
- Update emotion keywords
- Analyze sentiment trends
- Optimize escalation thresholds

### Performance Optimization
- Cache sentiment results
- Batch API calls
- Optimize emotion detection
- Reduce false positives

## 🔮 Future Enhancements

### Planned Features
- **Multi-language support**
- **Advanced emotion detection**
- **Predictive escalation**
- **Sentiment-based routing**
- **Customer satisfaction scoring**
