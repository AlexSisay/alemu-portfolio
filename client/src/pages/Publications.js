import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { BACKEND_URL } from '../config';

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

const publications = [
  // 2026 - Under Review
  {
    year: 2026,
    status: 'Under Review',
    title: 'Unsupervised Clustering of Psychosocial Profiles for Patient Stratification in Spinal Pain Management',
    authors: 'Alemu Sisay Nigru, Federico Maffezzoni, Sergio Benini, Serena Miglio, Matteo Bonetti, Michele Frigerio, Graziella Bragaglio, Chiara D\'Adda, Riccardo Leonardi',
    journal: 'Under Review',
    highlights: [
      'Identified two distinct biopsychosocial phenotypes: Adaptive (60%) and Maladaptive (40%)—independent of structural pathology.',
      'Maladaptive phenotype marked by severe pain, high disability, reduced quality of life, and predominant avoidance coping.',
      'Four-variable screening tool accurately discriminates Maladaptive phenotype (AUC = 0.950) for mechanism-informed, stratified spine care.',
    ],
    abstract: 'Background Context: Chronic spinal pain is highly heterogeneous, and traditional anatomy-driven classifications fundamentally fail to capture the biopsychosocial factors that drive pain-related disability. Data-driven phenotyping is needed to facilitate stratified, mechanism-informed care. Purpose: To identify distinct biopsychosocial phenotypes in patients with chronic spinal pain and to develop and validate a brief, clinically feasible screening tool for phenotype identification. Study Design/Setting: Cross-sectional study conducted in an outpatient rehabilitation clinic, in Brescia, Italy. Patient Sample: The study sample comprised 129 patients with spinal pain. Outcome Measures: Self-report Measures: Pain intensity (PainNRS), functional disability (RMDS), quality of life (WHOQoL), and coping behaviors (COPENVI) were assessed. Physiologic Measures: Structural pathology was evaluated using MRI/CT findings, analyzed at the disc-level across 230 variables. Methods: K-means clustering was applied to twelve clinical and psychosocial variables to identify phenotypes. Cluster validity and stability were assessed using multiple internal validation techniques. Structural MRI/CT findings were used for external validation. Supervised predictive modeling was subsequently employed to derive a simplified screening tool for phenotype assignment. Results: Unsupervised clustering identified two stable, clinically distinct phenotypes: an Adaptive phenotype (60%) characterized by lower pain intensity, lower functional disability, adaptive coping, and higher quality of life; and a Maladaptive phenotype (40%) marked by severe pain intensity, high functional disability, reduced quality of life, and predominant avoidance coping. Network analysis demonstrated a densely interconnected psychosocial structure in the Maladaptive phenotype. No significant associations were observed between phenotype membership and structural pathology. A four-variable screening tool (Pain Intensity, Functional Disability, Psychological Quality of Life, Avoidance Coping) accurately discriminated the Maladaptive phenotype (AUC = 0.950). Conclusions: Two distinct biopsychosocial phenotypes of spinal pain were identified that are independent of structural pathology. Critically, these phenotypes differ not only in severity but in underlying psychosocial structure. The derived screening tool enables the translation of this phenotyping into clinical practice, supporting a move toward mechanism-informed, stratified spine care.',
    link: null,
  },
  {
    year: 2026,
    status: 'Under Review',
    title: 'Organization of Coping Strategies and Their Proximal Associations with Pain Intensity in Spinal Pain Patients',
    authors: 'Alemu Sisay Nigru, Federico Maffezzoni, Sergio Benini, Serena Miglio, Matteo Bonetti, Michele Frigerio, Graziella Bragaglio, Chiara D\'Adda, Riccardo Leonardi',
    journal: 'Under Review',
    highlights: [
      'Avoidance and Positive Attitude are the only coping dimensions independently associated with pain intensity, explaining 41.4% of variance.',
      'Other strategies (Social Support, Problem Orientation) relate to pain via indirect pathways through these proximal dimensions.',
      'Three coping profiles identified: Adaptive Copers (lowest pain), Moderate Copers, and Maladaptive Copers (highest pain).',
    ],
    abstract: 'Background: Although coping strategies are well-established psychological determinants of chronic pain, their relative importance and combined organization in relation to pain intensity remain unclear. Clarifying whether coping strategies act as independent correlates or as an organized system is essential for refining psychosocial assessment and intervention. Methods: In this cross-sectional study, 142 adults with spine-related pain completed the Cope-NVI assessing five coping dimensions. A multi-method analytical framework was applied: multiple regression identified independent associations with pain intensity, mediation analyses examined indirect pathways among coping strategies, and k-means clustering identified person-centered coping profiles. Results: Multiple regression identified Avoidance and Positive Attitude as the only coping dimensions independently associated with pain intensity, jointly explaining 41.4% of its variance. Mediation analyses demonstrated that other strategies, including Social Support and Problem Orientation, were related to pain primarily through indirect pathways via these proximal dimensions. Cluster analysis further validated this hierarchical structure, identifying three distinct coping profiles: Adaptive Copers (low Avoidance, high Positive Attitude; lowest pain), Moderate Copers, and Maladaptive Copers (high Avoidance, low Positive Attitude; highest pain). Conclusions: Coping strategies in spine-related pain are hierarchically organized in relation to pain intensity, with Avoidance and Positive Attitude functioning as central, proximal mechanisms. This framework helps explain inconsistent findings in prior coping research and supports psychosocial assessment and intervention strategies that prioritize these core dimensions within a person-centered approach.',
    link: null,
  },
  // 2025
  {
    year: 2025,
    status: 'Published',
    title: 'Rewiring Development in Brain Segmentation: Leveraging Adult Brain Priors for Enhancing Infant MRI Segmentation',
    authors: 'Alemu Sisay Nigru, Michele Svanera, Austin Dibble, Connor Dalby, Mattia Savardi, Sergio Benini',
    journal: 'arXiv preprint arXiv:2510.09306',
    highlights: [
      'LODi framework transfers anatomical knowledge from adult brain MRI to infant scans via transfer learning and domain adaptation.',
      'Pre-trained on 27k adult scans; adapted to 0–2 year-old population using weakly supervised learning with Infant FreeSurfer labels.',
      'Outperforms traditional supervised and domain-specific models on internal and external datasets; robust to motion artifacts.',
    ],
    abstract: 'Accurate segmentation of infant brain MRI is critical for studying early neurodevelopment and diagnosing neurological disorders. Yet, it remains a fundamental challenge due to continuously evolving anatomy of the subjects, motion artifacts, and the scarcity of high-quality labeled data. In this work, we present LODi, a novel framework that utilizes prior knowledge from an adult brain MRI segmentation model to enhance the segmentation performance of infant scans. Given the abundance of publicly available adult brain MRI data, we pre-train a segmentation model on a large adult dataset as a starting point. Through transfer learning and domain adaptation strategies, we progressively adapt the model to the 0-2 year-old population, enabling it to account for the anatomical and imaging variability typical of infant scans. The adaptation of the adult model is carried out using weakly supervised learning on infant brain scans, leveraging silver-standard ground truth labels obtained with FreeSurfer. By introducing a novel training strategy that integrates hierarchical feature refinement and multi-level consistency constraints, our method enables fast, accurate, age-adaptive segmentation, while mitigating scanner and site-specific biases. Extensive experiments on both internal and external datasets demonstrate the superiority of our approach over traditional supervised learning and domain-specific models. Our findings highlight the advantage of leveraging adult brain priors as a foundation for age-flexible neuroimaging analysis, paving the way for more reliable and generalizable brain MRI segmentation across the lifespan.',
    link: 'https://arxiv.org/pdf/2510.09306',
  },
  {
    year: 2025,
    status: 'Published',
    title: 'Toward a Clinically Integrated AI Framework for Personalized Spine Care',
    authors: 'Alemu Sisay Nigru, Sergio Benini, Yao Wang, Federico Maffezzoni, Matteo Bonetti, Michele Frigerio, Graziella Bragaglio, Serena Miglio, R Leonardi',
    journal: 'Available at SSRN 5860785',
    highlights: [
      'Modular AI framework unifies imaging analysis, patient-reported outcomes, and clinical reasoning in a single ecosystem.',
      'Three modules: automated imaging grading with radiologist-in-the-loop, multimodal PROM assessment, and LLM-based report generation.',
      'Proof-of-concept shows combining AI imaging findings with PROMs can shift treatment recommendations beyond imaging alone.',
    ],
    abstract: 'Background and Objective: Low back pain remains the leading global cause of disability and is driven by a multifactorial interplay of structural, clinical, behavioral, and psychosocial factors. Although artificial intelligence has demonstrated strong potential in spine imaging and outcome prediction, existing solutions are typically single-purpose and do not reflect this complexity. This work proposes a modular artificial intelligence framework designed to unify imaging analysis, patient-reported outcomes, and clinical reasoning within a single, clinically deployable ecosystem. Methods: We developed a conceptual architecture comprising three integrated modules:(1) an automated imaging analysis and severity grading system with radiologist-in-the-loop validation through a dedicated user interface;(2) a multimodal assessment engine incorporating patient-reported outcomes such as pain intensity, disability score, quality-of-life scores, coping strategies, as well as demographic and clinical factors; and (3) a language-generation module based on large language models for synthesizing imaging findings and patient-reported data into editable radiology reports and personalized clinical considerations. The design emphasizes security, interpretability, human-centered interfaces, and interoperability with existing hospital systems. Results: To explore the feasibility of integrating patient-reported outcome measures (PROMs) with AI-assisted imaging assessment for personalized treatment planning, a small proof-of-concept analysis was conducted using real-world patient data. Three representative patients with distinct psychosocial profiles were examined to demonstrate how combining AI-generated imaging findings with structured PROMs can shift treatment recommendations beyond what imaging alone would suggest. These illustrative cases showcase the practical potential of augmenting automated radiology reports with patient-reported contextual data to better guide individualized clinical management. This analysis is provided as supplementary material to demonstrate feasibility rather than to draw quantitative conclusions. Conclusions: The proposed framework outlines a clear pathway toward a comprehensive, multimodal AI decision-support ecosystem for spine care. By unifying imaging analysis, patient-reported measures, and AI-assisted reporting, it highlights how modular architectures can better reflect the biopsychosocial nature of LBP and support future clinical translation. The proof-of-concept findings provide initial evidence of feasibility and motivate subsequent large-scale validation.',
    link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5860785',
  },
  // 2024
  {
    year: 2024,
    status: 'Published',
    title: 'External validation of SpineNetV2 on a comprehensive set of radiological features for grading lumbosacral disc pathologies',
    authors: 'Alemu Sisay Nigru MSc, Sergio Benini PhD, Matteo Bonetti MD, Graziella Bragaglio MSc, Michele Frigerio MD, Federico Maffezzoni MSc, Riccardo Leonardi PhD',
    journal: 'North American Spine Society Journal (NASSJ)',
    highlights: [
      'Retrospective analysis of 1747 lumbosacral IVDs from 353 patients; SpineNetV2 graded 11 distinct disc pathologies.',
      'Strong performance with high agreement (Cohen\'s Kappa, Lin\'s Concordance, MCC > 0.7) for most pathologies.',
      'Lower agreement for foraminal stenosis and disc herniation—underscores limitations of sagittal MR images for these conditions.',
    ],
    abstract: 'Background: In recent years, the integration of Artificial Intelligence (AI) models has revolutionized the diagnosis of Low Back Pain (LBP) and associated disc pathologies. Among these, SpineNetV2 stands out as a state-of-the-art, open-access model for detecting and grading various intervertebral disc pathologies. However, ensuring the reliability and applicability of AI models like SpineNetV2 is paramount. Rigorous validation is essential to guarantee their robustness and generalizability across diverse patient cohorts and imaging protocols. Methods: We conducted a retrospective analysis of MRI images of 1747 lumbosacral intervertebral discs (IVDs) from 353 patients (mean age, 54 ± 15.4 years, 44.5% female) with various spinal disorders, collected between September 2021 and February 2023 at X-Ray Service s.r.l. The SpineNetV2 system was used to grade 11 distinct lumbosacral disc pathologies, including Pfirrmann grading, disc narrowing, central canal stenosis, spondylolisthesis, (upper and lower) endplate defects, (upper and lower) marrow changes, (right and left) foraminal stenosis, and disc herniation, using T2-weighted sagittal MR images. Performance metrics included accuracy, balanced accuracy, precision, F1 score, Matthew\'s Correlation Coefficient, Brier Score Loss, Lin\'s concordance correlation coefficients, and Cohen\'s kappa coefficients. Two expert radiologists provide annotations for these discs. The evaluation of SpineNetV2\'s grading is compared against expert radiologists\' assessments. Results: SpineNetV2 demonstrated strong performance across various metrics, with high agreement scores (Cohen\'s Kappa, Lin\'s Concordance, and Matthew\'s Correlation Coefficient exceeding 0.7) for most pathologies. However, lower agreement was found for foraminal stenosis and disc herniation, underscoring the limitations of sagittal MR images for evaluating these conditions. Conclusions: This study highlights the importance of external validation, emphasizing the need for comprehensive assessments of deep learning models. SpineNetV2 exhibits promising results in predicting disc pathologies, with findings guiding further improvements. The open-source release of SpineNetV2 enables researchers to independently validate and extend the model\'s capabilities. This collaborative approach promotes innovation and accelerates the development of more reliable and comprehensive deep learning tools for the assessment of spine pathology.',
    link: 'https://www.sciencedirect.com/science/article/pii/S2666548424002579',
  },
];

const PublicationCard = ({ pub, index }) => {
  const [expanded, setExpanded] = useState(false);
  const authorsFormatted = boldAuthor(pub.authors);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
          {pub.year}
          {pub.status === 'Under Review' && ' • Under Review'}
        </span>
      </div>
      <h4 className="text-lg font-semibold text-secondary-800 mb-2">{pub.title}</h4>
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
    </motion.div>
  );
};

const Publications = () => {
  const [items, setItems] = useState(publications);
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
        const apiPubs = data.map((p) => ({ ...p, id: p.id || p._id }));
        const apiTitles = new Set(apiPubs.map((p) => (p.title || '').toLowerCase()));
        const extraFromStatic = publications.filter((p) => !apiTitles.has((p.title || '').toLowerCase()));
        setItems([...apiPubs, ...extraFromStatic]);
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
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
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
    </div>
  );
};

export default Publications;
