const PUBLIC_BASE = process.env.PUBLIC_URL || '';

export const DEFAULT_SITE_PROFILE = {
  heroTitle: "Hi, I'm Alemu Sisay Nigru",
  heroSubtitle:
    'AI Research Scientist | PhD in AI in Medicine | Medical Imaging & Clinical Decision Support',
  heroBody:
    'AI Research Scientist with a PhD in Artificial Intelligence in Medicine. My work focuses on medical imaging, multimodal AI, large language models, and trustworthy healthcare systems, bridging cutting-edge research and real-world clinical deployment.',
  aboutText:
    'I am a passionate AI researcher and academic with expertise in machine learning, computer vision, and healthcare applications.',
  profileImageUrl: 'https://alexsisay.github.io/alemu-portfolio/alemu.jpg',
  aboutImageUrl: 'https://alexsisay.github.io/alemu-portfolio/professnal_photo_2022.jpg',
  cvFileUrl: `${PUBLIC_BASE}/CV_03_26.pdf`,
  skills: [
    { name: 'Machine Learning & Deep Learning', level: 95 },
    { name: 'Python', level: 95 },
    { name: 'Medical Imaging AI', level: 90 },
    { name: 'PyTorch / TensorFlow', level: 90 },
    { name: 'Computer Vision (CNNs, Transformers)', level: 88 },
    { name: 'Clinical Decision Support', level: 85 }
  ],
  seoTitle: 'Alemu Sisay Nigru - AI Research Scientist',
  seoDescription:
    'Medical imaging AI, spine MRI analysis, multimodal AI, and clinical decision support research.',
  ogImageUrl: 'https://alexsisay.github.io/alemu-portfolio/alemu.jpg'
};
