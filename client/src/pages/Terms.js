import React from 'react';
import PageShell from '../components/PageShell';
import { usePageMeta } from '../hooks/usePageMeta';

const Terms = () => {
  usePageMeta({
    title: 'Terms of Service',
    description: 'Terms of service for Alemu Sisay Nigru academic portfolio website.'
  });

  return (
    <PageShell className="pt-20 min-h-screen">
      <section className="container-max section-padding max-w-3xl">
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Terms of Service</h1>
        <p className="text-secondary-700 leading-relaxed">
          Content on this website is provided for academic and professional information purposes.
          Publications and research summaries remain subject to their original licenses and venues.
        </p>
      </section>
    </PageShell>
  );
};

export default Terms;
