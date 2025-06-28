# Gemini API Setup Guide

This guide will help you set up Google's Gemini API for your portfolio's AI agent.

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key" button
   - Copy the generated API key (starts with `AIza...`)

### 2. Configure Your Environment

```bash
# Navigate to server directory
cd server

# Copy environment template
cp env.example .env

# Edit the .env file
nano .env  # or use any text editor
```

Add your Gemini API key to `.env`:
```env
GEMINI_API_KEY=AIzaSyC_your_actual_api_key_here
AI_PROVIDER=gemini
PORT=5000
```

### 3. Test the Setup

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:3000/ai-agent` to test the AI agent.

## 🔧 Advanced Configuration

### Rate Limits
- **Free Tier**: 15 requests per minute
- **Paid Tier**: Higher limits available

### Model Options
The system uses `gemini-pro` by default, which is:
- ✅ Free to use
- ✅ High quality responses
- ✅ Good for conversational AI
- ✅ Supports multiple languages

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Gemini API key | Yes | - |
| `AI_PROVIDER` | Set to 'gemini' | No | gemini |
| `PORT` | Server port | No | 5000 |

## 🌐 Production Deployment

### GitHub Pages
1. Add `GEMINI_API_KEY` to repository secrets
2. The workflow will automatically use it

### Vercel/Netlify
1. Add `GEMINI_API_KEY` to environment variables
2. Set `AI_PROVIDER=gemini`

### Local Testing
```bash
# Test API key validity
curl -X POST http://localhost:5000/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Alemu\'s research focus?"}'
```

## 🛠️ Troubleshooting

### Common Issues

1. **"API key not found"**
   - Check `.env` file exists in server directory
   - Verify API key starts with `AIza`
   - Restart the server after adding key

2. **"Rate limit exceeded"**
   - Wait 1 minute between requests
   - Consider upgrading to paid tier
   - Implement request caching

3. **"Model not available"**
   - Ensure you're using `gemini-pro`
   - Check your region has access
   - Try fallback mode temporarily

### Fallback Mode
If Gemini is not working, the system automatically falls back to:
- Pre-programmed responses based on your CV
- No API key required
- Always available

## 💡 Tips for Best Results

1. **API Key Security**
   - Never commit `.env` to version control
   - Use environment variables in production
   - Rotate keys regularly

2. **Optimize Responses**
   - Keep questions specific
   - Use the suggested questions as examples
   - The AI learns from your CV data

3. **Monitor Usage**
   - Check Google AI Studio dashboard
   - Monitor rate limits
   - Track response quality

## 🔄 Switching AI Providers

To switch between different AI providers:

```env
# For Gemini (Free tier available)
GEMINI_API_KEY=your_key_here
AI_PROVIDER=gemini

# For OpenAI (Paid)
OPENAI_API_KEY=your_key_here
AI_PROVIDER=openai

# For Hugging Face (Free models)
HUGGINGFACE_API_KEY=your_key_here
AI_PROVIDER=huggingface

# For fallback mode (No API key needed)
AI_PROVIDER=fallback
```

## 📊 Cost Comparison

| Provider | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Gemini** | ✅ 15 req/min | $0.00025/1K chars | Most users |
| **OpenAI** | ❌ None | $0.002/1K tokens | High volume |
| **Hugging Face** | ✅ Limited | Varies | Developers |
| **Fallback** | ✅ Unlimited | Free | No API needed |

## 🎯 Next Steps

1. ✅ Get Gemini API key
2. ✅ Configure environment
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Monitor usage
6. ✅ Customize responses

## 📞 Support

- **Gemini Documentation**: https://ai.google.dev/docs
- **Google AI Studio**: https://makersuite.google.com
- **Project Issues**: Create an issue in the repository

---

**Ready to go!** Your AI agent will now use Google's powerful Gemini model to answer questions about your portfolio. 🚀 