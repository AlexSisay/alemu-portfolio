import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { BACKEND_URL } from '../config';
import { usePageMeta } from '../hooks/usePageMeta';
import PageShell from '../components/PageShell';
import { STATIC_PUBLICATIONS } from '../constants/publications';
import { mergePublications } from '../utils/publications';

// Parse abstract into styled sections (Background, Methods, Results, etc.)
const parseAbstractSections = (text) => {
  if (!text || typeof text !== 'string') return [{ label: 'Abstract', content: text }];
  const pattern = /(Background(?:\s+(?:Context|and Objective))?|Purpose|Objective|Aims?|Study Design(?:\s*\/\s*Setting)?|Patient Sample|Participants?|Outcome Measures|Physiologic Measures|Self-report Measures|Design|Setting|Data (?:Collection|Analysis)|Methods?|Results?|Findings|Key Findings|Main Results|Conclusions?|Implications|Clinical Relevance|Summary|Introduction|Discussion):\s*/gi;
  const parts = text.split(pattern);
  const sections = [];
  for (let i = 1; i < parts.length; i += 2) {
    const label = parts[i]?.trim().replace(/:$/, '');
    const content = parts[i + 1]?.trim();
    if (label && content) sections.push({ label, content });
  }
  return sections.length ? sections : [{ label: 'Abstract', content: text }];
};

const boldAuthor = (text) => {
  const variants = [
    'Alemu Sisay Nigru',
    'Alemu S. Nigru',
    'AS Nigru',
    'Alemu Sisay Nigru MSc',
    'Alemu Sisay Nigru,'
  ];
  let result = text;
  variants.forEach((v) => {
    result = result.replace(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), (match) => `<strong>${match}</strong>`);
  });
  return result;
};

const PublicationCard = ({ pub, index }) => {
  const [expanded, setExpanded] = useState(false);
  const authorsFormatted = boldAuthor(pub.authors);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card"
      itemScope
      itemType="https://schema.org/ScholarlyArticle"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
          {pub.year}
          {pub.status === 'Under Review' && ' • Under Review'}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-secondary-800 mb-2">{pub.title}</h3>
      <p
        className="text-secondary-600 text-sm mb-3"
        dangerouslySetInnerHTML={{ __html: authorsFormatted }}
      />
      <p className="text-primary-600 text-sm mb-3">{pub.journal}</p>
      <ul className="space-y-1 mb-4">
        {(pub.highlights || []).map((h, i) => (
          <li key={i} className="text-secondary-700 text-sm flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">•</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Read full article
          </a>
        )}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-secondary-600 hover:text-primary-600 font-medium text-sm"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Read full abstract
            </>
          )}
        </button>
      </div>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-secondary-200">
          <div className="rounded-xl bg-gradient-to-br from-white via-secondary-50/50 to-primary-50/40 border border-primary-100/80 p-6 shadow-md">
            <h5 className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-5">Full Abstract</h5>
            <div className="space-y-7">
              {parseAbstractSections(pub.abstract).map((section, i) => (
                <div key={i} className={section.label && section.label !== 'Abstract' ? 'pl-5 pr-2 py-3 border-l-4 border-primary-400 rounded-r bg-white/60' : 'py-1'}>
                  {section.label && section.label !== 'Abstract' && (
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary-700 block mb-2">
                      {section.label}
                    </span>
                  )}
                  <p className="text-secondary-800 text-[15px] leading-[1.7] font-normal">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
};

const Publications = () => {
  usePageMeta({
    title: 'Publications',
    description: 'Peer-reviewed and preprint research in medical imaging AI, spine MRI analysis, multimodal AI, and clinical decision support.'
  });

  const [items, setItems] = useState(STATIC_PUBLICATIONS);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  const fetchPubs = React.useCallback(async (retryCount = 0) => {
    const maxRetries = 2;
    try {
      // Pre-wake: hit health first so Render backend spins up
      try {
        const wakeCtrl = new AbortController();
        const wakeTimeout = setTimeout(() => wakeCtrl.abort(), 20000);
        await fetch(`${BACKEND_URL}/api/health`, { cache: 'no-store', signal: wakeCtrl.signal });
        clearTimeout(wakeTimeout);
      } catch {
        /* ignore */
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      const res = await fetch(`${BACKEND_URL}/api/publications?t=${Date.now()}`, {
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeout);
      const raw = await res.json().catch(() => ({}));
      const data = Array.isArray(raw) ? raw : (raw?.publications ?? raw?.data ?? []);
      if (res.ok && Array.isArray(data)) {
        setItems(mergePublications(data));
        setUsedFallback(false);
        return;
      }
      // res.ok false (500, etc.) - retry
      if (retryCount < maxRetries) {
        setTimeout(() => fetchPubs(retryCount + 1), 4000);
        return;
      }
      setUsedFallback(true);
    } catch {
      if (retryCount < maxRetries) {
        setTimeout(() => fetchPubs(retryCount + 1), 4000);
        return;
      }
      setUsedFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPubs();
  }, [fetchPubs]);

  const byYear = items.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <PageShell className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Publications</span>
            </h1>
            <p className="text-lg text-secondary-600">
              Peer-reviewed and preprint research in AI, medical imaging, and spine care.
            </p>
          </motion.div>

          {loading && (
            <p className="mb-6 text-secondary-600 animate-pulse">Loading publications…</p>
          )}
          {usedFallback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3"
            >
              <p className="text-amber-800 text-sm">
                Some publications may not be shown. The server may be starting up—try refreshing.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setUsedFallback(false);
                  fetchPubs(0);
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Refresh
              </button>
            </motion.div>
          )}

          <div className="space-y-12">
            {years.map((year) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                  {year}
                </h2>
                <div className="space-y-6">
                  {byYear[year].map((pub, i) => (
                    <PublicationCard key={`${year}-${i}`} pub={pub} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Publications;
