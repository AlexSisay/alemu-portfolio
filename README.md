# Alemu Sisay Nigru - Academic Portfolio

A professional academic portfolio website with AI agent integration for interactive CV queries.

## Features

- **Professional Portfolio**: Clean, modern design showcasing academic and professional experience
- **AI Agent Integration**: Interactive AI assistant that can answer questions about your experience
- **Blog Section**: Sample blog posts with interactive dashboard
- **Responsive Design**: Works seamlessly on all devices
- **Admin Panel**: Simple content management system
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **AI Integration**: OpenAI API for intelligent responses
- **Database**: JSON-based storage for simplicity
- **Deployment**: GitHub Pages compatible

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm run install-all
   ```

2. **Set up Environment Variables**:
   Create `.env` file in the server directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

```
├── client/                 # React frontend
├── server/                 # Node.js backend
├── public/                 # Static assets
├── data/                   # JSON data files
└── docs/                   # Documentation
```

## Deployment

This project is designed to be easily deployed on GitHub Pages. The build process creates static files that can be served from any static hosting service.

## AI Agent Features

The AI agent can answer questions about:
- Academic background and research
- Professional experience
- Skills and expertise
- Publications and projects
- Contact information

## License

MIT License - feel free to use this template for your own portfolio! 