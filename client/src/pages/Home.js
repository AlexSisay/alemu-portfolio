import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Brain,
  Code,
  Database,
  TrendingUp,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';
import { BACKEND_URL } from '../config';
import { useSiteProfile } from '../hooks/useSiteProfile';
import { usePageMeta } from '../hooks/usePageMeta';
import PageShell, { PageSkeleton } from '../components/PageShell';
import ProfileImage from '../components/ProfileImage';
import SocialLinks from '../components/SocialLinks';
import { resolveAssetUrl, cvDownloadFilename } from '../utils/assets';
import { DEFAULT_SITE_PROFILE } from '../constants/defaultSiteProfile';
import { STATIC_PUBLICATIONS } from '../constants/publications';
import { fetchMergedPublications } from '../utils/publications';
import { formatYearsAiExperience, RESEARCH_AREAS } from '../utils/homeStats';

const Home = () => {
  const { profile, loading: profileLoading } = useSiteProfile();
  const [cvData, setCvData] = useState(null);
  const [publicationCount, setPublicationCount] = useState(STATIC_PUBLICATIONS.length);

  const site = profile || DEFAULT_SITE_PROFILE;
  const cvHref = resolveAssetUrl(site.cvFileUrl, DEFAULT_SITE_PROFILE.cvFileUrl);
  const profileImg = resolveAssetUrl(site.profileImageUrl, DEFAULT_SITE_PROFILE.profileImageUrl);

  usePageMeta({
    title: site.seoTitle?.replace(/Alemu Sisay Nigru\s*[-|]?\s*/i, '').trim() || 'Home',
    description: site.seoDescription,
    image: resolveAssetUrl(site.ogImageUrl, DEFAULT_SITE_PROFILE.ogImageUrl)
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/profile`)
      .then((r) => r.json())
      .then(setCvData)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchMergedPublications().then((pubs) => setPublicationCount(pubs.length));
  }, []);

  const skills = site.skills?.length ? site.skills : DEFAULT_SITE_PROFILE.skills;
  const stats = [
    { icon: Brain, label: 'Publications', value: String(publicationCount) },
    { icon: Code, label: 'Key Projects', value: String(cvData?.projects?.length ?? '—') },
    { icon: Database, label: 'Research Areas', value: String(RESEARCH_AREAS.length) },
    { icon: TrendingUp, label: 'Years AI Experience', value: formatYearsAiExperience() }
  ];
  const heroTitle = site.heroTitle || DEFAULT_SITE_PROFILE.heroTitle;
  const heroParts = heroTitle.includes('Alemu') ? heroTitle.split('Alemu Sisay Nigru') : [heroTitle, ''];

  return (
    <PageShell className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <section className="pt-20 pb-16" aria-labelledby="hero-heading">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[420px]">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {profileLoading ? (
                <PageSkeleton lines={5} />
              ) : (
                <>
                  <p className="text-lg font-medium text-primary-600 mb-6">{site.heroSubtitle}</p>
                  <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
                    {heroParts[0]}
                    <span className="gradient-text">Alemu Sisay Nigru</span>
                    {heroParts[1] || ''}
                  </h1>
                  <p className="text-xl text-secondary-600 mb-8 leading-relaxed">{site.heroBody}</p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                      to="/about"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                    <a
                      href={cvHref}
                      download={cvDownloadFilename(cvHref)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                      Download CV
                    </a>
                  </div>
                  <SocialLinks />
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-80 h-80">
                {profileLoading ? (
                  <div className="w-full h-full rounded-full bg-secondary-200 animate-pulse" aria-hidden="true" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 p-2">
                    <div className="w-full h-full rounded-full bg-white p-4 flex items-center justify-center overflow-hidden">
                      <ProfileImage
                        src={profileImg}
                        fallbackSrc={DEFAULT_SITE_PROFILE.profileImageUrl}
                        alt="Alemu Sisay Nigru, AI Research Scientist specializing in medical imaging"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-label="Research highlights">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {cvData?.personal && (
        <section className="py-16" aria-label="Current position">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <div className="text-sm opacity-90">Current Location</div>
                    <div className="font-semibold">{cvData.personal.location || ''}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <div className="text-sm opacity-90">Contact</div>
                    <div className="font-semibold">{cvData.personal.email || ''}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <div className="text-sm opacity-90">Position</div>
                    <div className="font-semibold">{cvData.personal.title || ''}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white" aria-labelledby="skills-heading">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {site.skillsSubtitle || DEFAULT_SITE_PROFILE.skillsSubtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
            {profileLoading ? (
              <PageSkeleton lines={9} />
            ) : (
              skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-secondary-900">{skill.name}</span>
                    <span className="text-sm text-secondary-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="cta-heading">
        <div className="container-max section-padding text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Connect?
          </h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss research opportunities, collaborations, or AI in medicine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-agent" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
              <Brain className="w-4 h-4 mr-2" aria-hidden="true" />
              Chat with AI Agent
            </Link>
            <Link to="/about" className="inline-flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 font-medium">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Home;
