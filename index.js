// Dashboard analytics
app.get('/api/dashboard', (req, res) => {
  const analytics = {
    totalPublications: cvData.publications.length,
    totalProjects: cvData.projects.length,
    yearsOfExperience: 5,
    blogPosts: blogPosts.length,
    skills: cvData.skills.length,
    researchAreas: ["AI", "ML", "Healthcare", "Education"]
  };
  res.json(analytics);
});

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Alemu Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      blog: '/api/blog',
      dashboard: '/api/dashboard',
      aiChat: '/api/ai-chat',
      aiStatus: '/api/ai-status'
    },
    documentation: 'This is the backend API for Alemu\'s portfolio. Frontend is hosted separately.'
  });
});

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AI Provider: ${aiProvider}`);
  console.log(`AI Available: ${!!(gemini || openai)}`);
  console.log(`AI Agent ready for questions about Alemu's experience`);
}); 