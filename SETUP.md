# Portfolio Setup Guide

This guide will help you set up and deploy your personal academic portfolio with AI agent integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (for AI agent functionality)
- GitHub account (for deployment)

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for the entire project
npm run install-all
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```env
PORT=5000
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Start Development Server

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static assets
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   ├── .env              # Environment variables
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## Features

### ✅ Implemented Features

1. **Professional Portfolio**
   - Clean, modern design
   - Responsive layout
   - Professional color scheme
   - Smooth animations

2. **AI Agent Integration**
   - Interactive chat interface
   - OpenAI GPT-3.5 integration
   - Context-aware responses about your experience
   - Suggested questions

3. **Blog System**
   - Sample blog posts
   - Search and filter functionality
   - Tag-based categorization
   - Responsive design

4. **Interactive Dashboard**
   - Analytics overview
   - Progress tracking
   - Research area visualization
   - Activity timeline

5. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop optimized
   - Touch-friendly interface

### 🔧 Customization Options

1. **Update Personal Information**
   - Edit `server/index.js` to update CV data
   - Replace profile images in `client/public/`
   - Update contact information

2. **Modify AI Agent Responses**
   - Update the system prompt in `server/index.js`
   - Add more CV data for better responses
   - Customize suggested questions

3. **Add Blog Posts**
   - Edit the `blogPosts` array in `server/index.js`
   - Add new posts with proper metadata
   - Include tags for categorization

4. **Customize Styling**
   - Modify `client/tailwind.config.js` for colors
   - Update `client/src/index.css` for custom styles
   - Change fonts and spacing as needed

## Deployment

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "GitHub Actions" as source
   - The workflow will automatically deploy on push

3. **Custom Domain (Optional)**
   - Add your custom domain in repository settings
   - Update DNS records accordingly

### Alternative Deployment Options

1. **Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `client/build`

3. **Heroku**
   ```bash
   heroku create your-portfolio-name
   git push heroku main
   ```

## API Endpoints

### Backend API Routes

- `GET /api/profile` - Get profile information
- `POST /api/ai-chat` - AI agent chat endpoint
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get specific blog post
- `GET /api/dashboard` - Get dashboard analytics

### Environment Variables

- `PORT` - Server port (default: 5000)
- `OPENAI_API_KEY` - OpenAI API key for AI agent

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **OpenAI API errors**
   - Verify your API key is correct
   - Check your OpenAI account balance
   - Ensure the API key has proper permissions

3. **Build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Image not loading**
   - Ensure images are in `client/public/`
   - Check file paths in components
   - Verify file permissions

### Performance Optimization

1. **Image Optimization**
   - Compress images before adding to public folder
   - Use WebP format when possible
   - Implement lazy loading for images

2. **Code Splitting**
   - React Router already implements code splitting
   - Consider lazy loading for heavy components

3. **Caching**
   - Implement service worker for offline support
   - Use browser caching for static assets

## Maintenance

### Regular Updates

1. **Dependencies**
   ```bash
   npm update
   npm audit fix
   ```

2. **Content Updates**
   - Update CV information in server
   - Add new blog posts
   - Refresh portfolio images

3. **Security**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Rotate API keys regularly

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Create an issue in the repository

## License

This project is licensed under the MIT License - see the LICENSE file for details. 