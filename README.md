# Alemu Portfolio Backend

Backend server for Alemu Sisay Nigru's academic portfolio with AI integration.

## Features

- RESTful API endpoints for portfolio data
- AI Agent integration (Google Gemini / OpenAI)
- Blog posts management
- Dashboard analytics
- Health check endpoint

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/profile` - Portfolio data
- `POST /api/ai-chat` - AI Agent chat
- `GET /api/ai-status` - AI provider status
- `GET /api/blog` - Blog posts list
- `GET /api/blog/:id` - Individual blog post
- `GET /api/dashboard` - Dashboard analytics

## Environment Variables

Copy `env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=production
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=https://alexsisay.github.io
```

## Deployment on Railway

1. Push this repository to GitHub
2. Connect to Railway
3. Set environment variables in Railway dashboard
4. Deploy automatically

## Local Development

```bash
npm install
npm run dev
```

Server will run on http://localhost:5000 