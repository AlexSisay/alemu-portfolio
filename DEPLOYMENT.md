# Deployment Guide

This guide covers deploying your portfolio to various hosting platforms with support for multiple AI providers.

## AI Provider Setup

### Option 1: Google Gemini (Recommended - Free Tier Available)

1. **Get Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

2. **Configure Environment**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   AI_PROVIDER=gemini
   ```

### Option 2: OpenAI (Paid)

1. **Get OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account and add payment method
   - Generate an API key

2. **Configure Environment**
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   AI_PROVIDER=openai
   ```

### Option 3: Hugging Face (Free Models Available)

1. **Get Hugging Face API Key**
   - Go to [Hugging Face](https://huggingface.co/settings/tokens)
   - Create an account
   - Generate an access token

2. **Configure Environment**
   ```env
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   AI_PROVIDER=huggingface
   ```

### Option 4: Fallback Mode (No API Key Required)

If no API key is configured, the system will use intelligent fallback responses based on your CV data.

## GitHub Pages Deployment (Recommended)

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial portfolio setup"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/your-portfolio-repo.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on push

### 3. Environment Variables for Production

For the AI agent to work in production, you'll need to set up environment variables:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `GEMINI_API_KEY` (if using Gemini)
   - `OPENAI_API_KEY` (if using OpenAI)
   - `HUGGINGFACE_API_KEY` (if using Hugging Face)

### 4. Update Workflow for Environment Variables

Update `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install Dependencies
      run: |
        npm run install-all
        
    - name: Build Frontend
      run: |
        cd client
        npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./client/build
```

## Alternative Deployment Options

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add your AI provider API key (e.g., `GEMINI_API_KEY`)

### Netlify Deployment

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `client/build`

3. **Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add your AI provider API key

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-portfolio-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key_here
   heroku config:set AI_PROVIDER=gemini
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## Custom Domain Setup

### GitHub Pages with Custom Domain

1. **Add Custom Domain**
   - Go to repository **Settings** → **Pages**
   - Enter your custom domain (e.g., `portfolio.yourname.com`)
   - Save

2. **DNS Configuration**
   - Add CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub Pages IPs

3. **SSL Certificate**
   - GitHub automatically provides SSL certificates
   - Check "Enforce HTTPS" in Pages settings

### Vercel with Custom Domain

1. **Add Domain**
   - Go to Vercel dashboard → **Settings** → **Domains**
   - Add your custom domain

2. **DNS Configuration**
   - Follow Vercel's DNS instructions
   - Usually involves adding CNAME or A records

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes (for Gemini) | `AIza...` |
| `OPENAI_API_KEY` | OpenAI API key | Yes (for OpenAI) | `sk-...` |
| `HUGGINGFACE_API_KEY` | Hugging Face API key | Yes (for HF) | `hf_...` |
| `AI_PROVIDER` | AI provider selection | No | `gemini`, `openai`, `huggingface` |
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment mode | No | `production` |

## AI Provider Comparison

| Provider | Free Tier | Cost | Model Quality | Setup Difficulty |
|----------|-----------|------|---------------|------------------|
| **Google Gemini** | ✅ Yes | Free up to 15 requests/min | Excellent | Easy |
| **OpenAI GPT-3.5** | ❌ No | $0.002/1K tokens | Excellent | Easy |
| **Hugging Face** | ✅ Yes | Free for many models | Good | Medium |
| **Fallback Mode** | ✅ Yes | Free | Basic | None |

## Troubleshooting Deployment

### Common Issues

1. **Build Failures**
   ```bash
   # Check build locally first
   npm run build
   
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment Variables Not Working**
   - Verify variable names match exactly
   - Check for typos in API keys
   - Ensure variables are set in the correct environment

3. **AI Agent Not Responding**
   - Check API key is valid
   - Verify API key has sufficient credits/quota
   - Check network connectivity
   - Try fallback mode if no API key

4. **Images Not Loading**
   - Ensure images are in `client/public/`
   - Check file paths are correct
   - Verify file permissions

### AI Provider Specific Issues

#### Gemini Issues
- **Rate limiting**: Gemini has a 15 requests/minute limit on free tier
- **API key format**: Should start with `AIza`
- **Region restrictions**: Some regions may have access limitations

#### OpenAI Issues
- **Billing**: Requires valid payment method
- **Rate limits**: Check your plan's rate limits
- **Model availability**: Ensure GPT-3.5 is available in your region

#### Hugging Face Issues
- **Model loading**: Some models may take time to load
- **Token limits**: Free models have lower token limits
- **API stability**: Free tier may have occasional downtime

### Performance Optimization

1. **Image Optimization**
   ```bash
   # Install image optimization tools
   npm install -g imagemin-cli
   
   # Optimize images
   imagemin client/public/*.{jpg,png} --out-dir=client/public/optimized
   ```

2. **Bundle Size Optimization**
   - Use dynamic imports for large components
   - Implement code splitting
   - Optimize third-party dependencies

3. **Caching Strategy**
   - Implement service worker for offline support
   - Use browser caching for static assets
   - Enable CDN caching

## Monitoring and Analytics

### Google Analytics

1. **Add Google Analytics**
   ```html
   <!-- Add to client/public/index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Track Important Events**
   - AI agent interactions
   - Blog post views
   - CV downloads
   - Contact form submissions

### Performance Monitoring

1. **Lighthouse Audits**
   - Run regular Lighthouse audits
   - Monitor Core Web Vitals
   - Optimize based on recommendations

2. **Error Tracking**
   - Implement error boundary in React
   - Use services like Sentry for error tracking
   - Monitor API response times

## Security Considerations

1. **API Key Security**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly
   - Monitor API usage

2. **Content Security Policy**
   - Implement CSP headers
   - Restrict external resources
   - Monitor for security vulnerabilities

3. **Dependency Updates**
   ```bash
   # Regular security updates
   npm audit
   npm audit fix
   npm update
   ```

## Backup and Recovery

1. **Regular Backups**
   - Backup your code repository
   - Export important data
   - Document configuration changes

2. **Disaster Recovery**
   - Keep deployment scripts versioned
   - Document rollback procedures
   - Test recovery processes

## Support and Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Check for security updates
   - Monitor performance metrics
   - Review error logs
   - Check API usage/quota

2. **Monthly**
   - Update dependencies
   - Review analytics data
   - Backup important data
   - Test AI provider functionality

3. **Quarterly**
   - Full security audit
   - Performance optimization
   - Content updates
   - Evaluate AI provider costs

### Getting Help

- Check the troubleshooting section
- Review GitHub Issues
- Contact support for your hosting platform
- Consult the project documentation
- Check AI provider documentation for specific issues 