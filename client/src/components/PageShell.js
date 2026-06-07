import React from 'react';

export const PageSkeleton = ({ lines = 4 }) => (
  <div className="animate-pulse space-y-4" aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-secondary-200 rounded w-full" style={{ width: `${90 - i * 10}%` }} />
    ))}
  </div>
);

const PageShell = ({ children, className = 'min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-20' }) => (
  <main id="main-content" className={className}>
    {children}
  </main>
);

export default PageShell;
