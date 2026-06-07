import React from 'react';
import PageShell from '../components/PageShell';
import { usePageMeta } from '../hooks/usePageMeta';

const Privacy = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description: 'Privacy policy for Alemu Sisay Nigru academic portfolio website.'
  });

  return (
    <PageShell className="pt-20 min-h-screen">
      <section className="container-max section-padding max-w-3xl">
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Privacy Policy</h1>
        <p className="text-secondary-700 leading-relaxed mb-4">
          This site uses Google Analytics (GA4) to understand aggregate traffic and improve content.
          Analytics data is processed according to Google&apos;s policies. No personal data is sold.
        </p>
        <p className="text-secondary-700 leading-relaxed">
          Contact: <a className="text-primary-600" href="mailto:alemu.nigru@unibs.it">alemu.nigru@unibs.it</a>
        </p>
      </section>
    </PageShell>
  );
};

export default Privacy;
