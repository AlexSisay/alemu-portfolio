import { BACKEND_URL } from '../config';
import { STATIC_PUBLICATIONS } from '../constants/publications';

export function mergePublications(apiPubs, staticPubs = STATIC_PUBLICATIONS) {
  const api = Array.isArray(apiPubs) ? apiPubs.map((p) => ({ ...p, id: p.id || p._id })) : [];
  const apiTitles = new Set(api.map((p) => (p.title || '').toLowerCase()));
  const extraFromStatic = staticPubs.filter((p) => !apiTitles.has((p.title || '').toLowerCase()));
  return [...api, ...extraFromStatic];
}

export async function fetchMergedPublications() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/publications?t=${Date.now()}`, { cache: 'no-store' });
    const raw = await res.json().catch(() => ({}));
    const data = Array.isArray(raw) ? raw : (raw?.publications ?? raw?.data ?? []);
    if (res.ok && Array.isArray(data)) {
      return mergePublications(data);
    }
  } catch {
    /* fall through to static list */
  }
  return STATIC_PUBLICATIONS;
}
