import { BACKEND_URL } from '../config';

const PUBLIC_BASE = process.env.PUBLIC_URL || '';

/**
 * Resolves CMS asset URLs (absolute, backend file API, or GitHub Pages relative paths).
 */
export function resolveAssetUrl(url, fallback = '') {
  const value = url || fallback;
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/api/site-profile/files/')) {
    return `${BACKEND_URL}${value}`;
  }
  if (value.startsWith('/')) {
    return `${PUBLIC_BASE}${value}`.replace(/\/{2,}/g, '/').replace(':/', '://');
  }
  return value;
}

export function publicAsset(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${PUBLIC_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
