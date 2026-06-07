/**
 * Post-build SEO: dynamic sitemap + static blog HTML shells for crawlers.
 * Run after `react-scripts build` (see package.json).
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_ORIGIN = 'https://alexsisay.github.io/alemu-portfolio';
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://alemu-portfolio-backend.onrender.com';
const BUILD_DIR = path.join(__dirname, '..', 'build');

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.9' },
  { loc: '/publications', changefreq: 'weekly', priority: '0.95' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.85' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' }
];

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSitemap(routes) {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${r.loc}`)}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function blogShellHtml(post) {
  const id = post.id || post._id;
  const title = escapeHtml(post.title);
  const description = escapeHtml(
    post.excerpt || (post.content || '').slice(0, 160) || 'Research blog post'
  );
  const canonical = `${SITE_ORIGIN}/blog/${id}`;
  const spaPath = `/alemu-portfolio/blog/${id}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || (post.content || '').slice(0, 160),
    url: canonical,
    datePublished: post.date || post.createdAt,
    author: {
      '@type': 'Person',
      name: 'Alemu Sisay Nigru',
      url: SITE_ORIGIN
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title} | Alemu Sisay Nigru</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>
  <meta http-equiv="refresh" content="0;url=${spaPath}" />
</head>
<body>
  <article>
    <h1>${title}</h1>
    <p>${description}</p>
    <p><a href="${spaPath}">Read full article</a></p>
  </article>
  <script>window.location.replace('${spaPath}');</script>
</body>
</html>`;
}

function fetchBlogPosts() {
  const url = `${BACKEND_URL}/api/blog`;
  const lib = url.startsWith('https') ? https : require('http');

  return new Promise((resolve) => {
    const req = lib.get(url, { timeout: 30000 }, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve([]);
          return;
        }
        try {
          const data = JSON.parse(body);
          resolve(Array.isArray(data) ? data : []);
        } catch {
          resolve([]);
        }
      });
    });
    req.on('error', (err) => {
      console.warn('generate-seo: could not fetch blog posts:', err.message);
      resolve([]);
    });
    req.on('timeout', () => {
      req.destroy();
      console.warn('generate-seo: blog fetch timed out');
      resolve([]);
    });
  });
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('generate-seo: build/ not found — run react-scripts build first');
    process.exit(1);
  }

  const posts = await fetchBlogPosts();
  const routes = [...STATIC_ROUTES];

  for (const post of posts) {
    const id = post.id || post._id;
    if (!id) continue;

    routes.push({
      loc: `/blog/${id}`,
      changefreq: 'monthly',
      priority: '0.7'
    });

    const dir = path.join(BUILD_DIR, 'blog', String(id));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), blogShellHtml(post), 'utf8');
  }

  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), buildSitemap(routes), 'utf8');
  console.log(`generate-seo: sitemap with ${routes.length} URLs, ${posts.length} blog shells`);
}

main();
