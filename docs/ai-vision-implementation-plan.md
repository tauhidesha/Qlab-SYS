# AI Vision Implementation Plan - Bosmat Qlab-SYS

## 🎯 Tujuan & Use Cases

### Primary Use Cases:
1. **Motor Condition Analysis** - Analisis kondisi motor dari foto customer
2. **License Plate Reading** - Otomatis baca plat nomor untuk booking data
3. **Color Detection** - Identifikasi warna motor untuk repaint service
4. **Damage Assessment** - Analisis tingkat kerusakan dari foto
5. **Before/After Comparison** - Bandingkan hasil kerja Bosmat

### Secondary Use Cases:
6. **Motor Type Detection** - Deteksi jenis/merk motor otomatis
7. **Parts Identification** - Identifikasi part yang butuh service
8. **Paint Quality Check** - Analisis kualitas cat dari foto
9. **Workshop Documentation** - Otomatis kategorisasi foto hasil kerja

## 2. Technical Architecture

### 2.1 Model Selection
- **Primary Model**: GPT-4.1 mini (gpt-4.1-mini) ✨ **UPDATED**
  - Input: $0.40 per 1M tokens (text + image)
  - Output: $1.60 per 1M tokens
  - Max context: 1,047,576 tokens
  - Image resolution: Up to 2048x2048 pixels
  - **Benefits**: More cost-effective, faster processing, same vision capabilities

### 2.2 Image Processing Pipeline

## 📋 Technical Implementation Plan

### 1. WhatsApp Integration Enhancement

```typescript
// File: src/ai/utils/whatsapp/imageHandler.ts
interface ImageMessage {
  base64: string;
  mimeType: string;
  caption?: string;
  originalUrl?: string;
}

// Handle incoming images from WhatsApp
export async function processWhatsAppImage(imageData: ImageMessage) {
  // 1. Validate image format
  // 2. Resize if needed (max 20MB for OpenAI)
  // 3. Convert to base64 if needed
  // 4. Pass to vision analysis
}
```

### 2. Vision Analysis Tools

```typescript
// File: src/ai/tools/vision/analyzeMotorCondition.ts
export const analyzeMotorConditionTool = {
  name: 'analyzeMotorCondition',
  description: 'Analisis kondisi motor dari foto customer',
  parameters: {
    imageBase64: 'string',
    analysisType: 'condition' | 'damage' | 'color' | 'type'
  },
  implementation: async (input) => {
    // GPT-4 Vision analysis
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [{
        role: 'user',
        content: [{
          type: 'text',
          text: 'Analisis kondisi motor ini untuk service Bosmat...'
        }, {
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${input.imageBase64}` }
        }]
      }]
    });
    return analysis;
  }
};
```

### 3. Specialized Vision Tools

#### A. License Plate Reader
```typescript
// File: src/ai/tools/vision/readLicensePlate.ts
export const readLicensePlateTool = {
  name: 'readLicensePlate',
  description: 'Baca plat nomor motor otomatis',
  implementation: async (input) => {
    // OCR focused prompt for license plates
    const prompt = `
    Baca plat nomor motor di foto ini dengan teliti.
    Format Indonesia: [HURUF][ANGKA][HURUF] (contoh: B1234CD)
    Return: { plateNumber: string, confidence: number }
    `;
  }
};
```

#### B. Color Detection & Matching
```typescript
// File: src/ai/tools/vision/detectMotorColor.ts
export const detectMotorColorTool = {
  name: 'detectMotorColor',
  description: 'Deteksi warna motor untuk repaint service',
  implementation: async (input) => {
    // Color analysis with Bosmat color database
    const colorAnalysis = await analyzeImageColors(input.imageBase64);
    const matchedColors = matchToBosmatColors(colorAnalysis);
    return {
      detectedColors: colorAnalysis,
      bosmatMatches: matchedColors,
      recommendations: generateColorRecommendations(matchedColors)
    };
  }
};
```

#### C. Damage Assessment
```typescript
// File: src/ai/tools/vision/assessDamage.ts
export const assessDamageTool = {
  name: 'assessDamage',
  description: 'Analisis tingkat kerusakan motor',
  implementation: async (input) => {
    const damagePrompt = `
    Analisis kerusakan motor ini untuk estimasi service Bosmat:
    1. Tingkat kerusakan (1-5 scale)
    2. Area yang butuh repaint
    3. Estimasi waktu pengerjaan
    4. Rekomendasi service
    `;
    // Return structured damage assessment
  }
};
```

### 4. Database Schema Updates

```sql
-- Add image support to sessions
ALTER TABLE zoya_sessions ADD COLUMN images JSON;

-- Add image analysis results
CREATE TABLE image_analyses (
  id VARCHAR(255) PRIMARY KEY,
  session_id VARCHAR(255),
  image_url TEXT,
  analysis_type ENUM('condition', 'damage', 'color', 'license_plate'),
  analysis_result JSON,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add motor identification data
CREATE TABLE motor_identifications (
  id VARCHAR(255) PRIMARY KEY,
  session_id VARCHAR(255),
  detected_brand VARCHAR(100),
  detected_model VARCHAR(100),
  detected_year INT,
  confidence_score DECIMAL(3,2),
  source_image_id VARCHAR(255)
);
```

### 5. API Route Enhancements

```typescript
// File: src/app/api/whatsapp/receive/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Check if message contains image
  if (body.type === 'image') {
    const imageAnalysis = await processImageMessage({
      imageUrl: body.image.url,
      caption: body.image.caption,
      senderNumber: body.from
    });
    
    // Continue with regular flow but include image context
    const aiResponse = await generateWhatsAppReply({
      customerMessage: body.image.caption || 'Foto dari customer',
      senderNumber: body.from,
      imageContext: imageAnalysis
    });
  }
}
```

## 💰 Cost Analysis (Updated for GPT-4.1 mini)

### GPT-4.1 mini Pricing:
- **Input tokens**: $0.40 per 1M tokens (text + image)
- **Output tokens**: $1.60 per 1M tokens  
- **Image processing**: ~1,000-2,000 tokens per image (included in input cost)
- **No separate image fee** ✨

### Cost per Image Analysis:
- **Input**: 1,500 tokens × $0.40/1M = $0.0006
- **Output**: 500 tokens × $1.60/1M = $0.0008
- **Total per image**: ~$0.0014 (vs ~$0.005 for GPT-4 Vision) 💰

### Monthly Estimates:
- **100 images/day (3,000/month)**: ~$4.20/month
- **500 images/day (15,000/month)**: ~$21/month  
- **1,000 images/day (30,000/month)**: ~$42/month

### ROI Calculation:
- **Manual inspection time saved**: 10-15 minutes per motor
- **Labor cost saved per analysis**: Rp 25,000 - Rp 50,000
- **Break-even**: 1-2 image analyses per month
- **Monthly ROI** (3,000 analyses): Rp 75M - Rp 150M vs $4.20 cost 🚀

## 🚀 Implementation Timeline

### Week 1: Foundation
- [ ] Set up image handling infrastructure
- [ ] Create basic vision tool framework
- [ ] Test GPT-4 Vision integration
- [ ] Update WhatsApp message processing

### Week 2: Core Features
- [ ] Motor condition analysis tool
- [ ] License plate reading tool
- [ ] Basic color detection
- [ ] Integration with existing flow

### Week 3: Advanced Analysis
- [ ] Damage assessment tool
- [ ] Motor type detection
- [ ] Color matching with Bosmat database
- [ ] Before/after comparison

### Week 4: Polish & Optimization
- [ ] Error handling & fallbacks
- [ ] Performance optimization
- [ ] Cost monitoring
- [ ] User experience improvements

### Week 5-6: Extended Features
- [ ] Parts identification
- [ ] Paint quality analysis
- [ ] Automated documentation
- [ ] Analytics dashboard

## 🔒 Security & Privacy

### Image Handling:
- ✅ **Temporary storage** - Delete images after processing
- ✅ **Base64 encoding** - No permanent URL storage
- ✅ **Size limits** - Max 20MB per image
- ✅ **Format validation** - JPEG, PNG, WebP only

### Data Protection:
- ✅ **No customer image retention** - Process and delete
- ✅ **Analysis results only** - Store structured data, not images
- ✅ **Encrypted transmission** - HTTPS for all API calls
- ✅ **Access controls** - Admin-only access to analysis data

## 📊 Success Metrics

### User Experience:
- ✅ **Response time** < 10 seconds for image analysis
- ✅ **Accuracy rate** > 85% for motor condition assessment
- ✅ **License plate accuracy** > 90%
- ✅ **Color detection accuracy** > 80%

### Business Impact:
- ✅ **Faster quotes** - Automatic damage assessment
- ✅ **Better accuracy** - Visual confirmation of motor condition
- ✅ **Improved documentation** - Before/after comparisons
- ✅ **Customer satisfaction** - Quick, detailed analysis

## 🛠️ Development Priority

### High Priority (Must Have):
1. ✅ **Motor condition analysis** - Core business value
2. ✅ **Damage assessment** - Quote automation
3. ✅ **Color detection** - Repaint service support

### Medium Priority (Should Have):
4. ✅ **License plate reading** - Booking automation
5. ✅ **Motor type detection** - Service customization
6. ✅ **Before/after comparison** - Quality assurance

### Low Priority (Nice to Have):
7. ✅ **Parts identification** - Advanced diagnostics
8. ✅ **Paint quality analysis** - Quality control
9. ✅ **Automated documentation** - Portfolio building

---

## 🚀 Next Steps

1. **Get approval** on technical approach and budget
2. **Start with Phase 1** - Basic vision integration
3. **Test with real customer images** from Bosmat
4. **Iterate based on feedback** from actual usage
5. **Scale up** based on success metrics

**Ready to start implementation? 🚀**
