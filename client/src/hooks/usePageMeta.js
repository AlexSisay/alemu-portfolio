import { useEffect } from 'react';

const SITE_ORIGIN = 'https://alexsisay.github.io/alemu-portfolio';
const SITE_NAME = 'Alemu Sisay Nigru';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Syncs document title, meta description, canonical, Open Graph, and Twitter tags.
 */
export function usePageMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI Research Scientist`;
    const desc =
      description ||
      'AI Research Scientist and PhD in AI in Medicine. Medical imaging AI, spine MRI analysis, multimodal AI, and clinical decision support.';
    const pageUrl = url || `${SITE_ORIGIN}${window.location.pathname}`;
    const ogImage = image || `${SITE_ORIGIN}/alemu.jpg`;

    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertLink('canonical', pageUrl);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    let robots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots && robots.getAttribute('data-seo-managed') === 'true') {
      robots.remove();
    }
  }, [title, description, image, url, type, noindex]);
}
