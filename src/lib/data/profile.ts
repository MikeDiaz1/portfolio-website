export interface ProfileLink {
  label: string;
  href: string;
  icon?: 'github' | 'linkedin' | 'kaggle';
}

export const profile = {
  name: 'Michael Diaz-Stewart',
  tagline: 'Machine learning / Healthcare / Full-stack software',
  statement: 'Building, evaluating, and improving practical AI systems for healthcare.',
  // Paths are relative to static/. Leave empty to use the silhouette.
  avatar: 'images/selfie.jpg',
  // Add your real destinations. Empty destinations render as unavailable labels.
  links: [
    { label: 'GitHub', href: 'https://github.com/MikeDiaz1', icon: 'github' },
    { label: 'Kaggle', href: 'https://www.kaggle.com/michaeldiazstewart', icon: 'kaggle' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-diaz-stewart-7547ab271/', icon: 'linkedin' },
    { label: 'Resume', href: '' }
  ] satisfies ProfileLink[]
};

export interface Experience {
  date: string;
  title: string;
  organisation: string;
  // Leave empty to show the company name without a link.
  organisationUrl?: string;
  employment: string;
  location: string;
  arrangement: string;
  initials: string;
  // Optional image path relative to static/, e.g. 'images/companies/ubc.svg'.
  logo: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    date: 'Aug 2023 – Present',
    title: 'Graduate Research Assistant',
    organisation: 'AI in Medicine Lab',
    organisationUrl: 'https://aimlab.ca/',
    employment: 'Permanent full-time',
    location: 'Vancouver, BC, Canada',
    arrangement: 'Hybird',
    initials: 'UBC',
    logo: 'images/AIM_logo.jpg',
    bullets: [
      'Developed end-to-end PyTorch multiple-instance learning pipelines for pathology slide images with focuses on cohort shift, label stability, and task calibration',
      'MSI screening strategy with 94% sensitivity and 98% NPV in multi-institutional external validation',
      'Containerization, GPU-cluster workflows, multi-terabyte scale training and downstream analysis'
    ]
  },
  {
    date: 'Jan 2024 – Aug 2024',
    title: 'Machine Learning Research Intern',
    organisation: "Providence Health Care (St. Paul's Hospital)",
    organisationUrl: 'https://www.providencehealthcare.org',
    employment: 'Co-op',
    location: 'Vancouver, BC, Canada',
    arrangement: 'Hybrid',
    initials: 'PHC',
    logo: 'images/providencehealthcare_logo.jpg',
    bullets: [
      'Proposed an AI screening framework for pacemaker lead extractions using clinical CT images',
      'Coordinated work with cardiac surgeons and presented at the UBC Biomedical Engineering Symposium'
    ]
  },
  {
    date: 'Jun 2022 – Dec 2023',
    title: 'MCAT Instructor',
    organisation: 'Kyo Standard',
    organisationUrl: 'https://kyostandard.com/',
    employment: 'Contract part-time',
    location: 'San Diego, CA, USA',
    arrangement: 'Remote',
    initials: 'KS',
    logo: 'images/kyo_logo.jpg',
    bullets: [
      'Lesson planning and teaching complex concepts in an easy-to-understand way'
    ]
  },
  {
    date: 'Apr 2023 – Jul 2023',
    title: 'Pharmacy Assistant',
    organisation: 'CareRx Corporation',
    organisationUrl: 'https://www.carerx.ca/',
    employment: 'Permanent full-time',
    location: 'Burnaby, BC, Canada',
    arrangement: 'On-site',
    initials: 'CRx',
    logo: 'images/carerxcorp_logo.jpg',
    bullets: [
      'Compounding, aliquoting, and packaging various medications'
    ]
  },
  {
    date: 'Nov 2017 – Oct 2018',
    title: 'Software Developer',
    organisation: 'Stafits',
    organisationUrl: 'https://www.linkedin.com/company/stafits/',
    employment: 'Permanent full-time',
    location: 'Toronto, ON, Canada',
    arrangement: 'On-site',
    initials: 'S',
    logo: 'images/stafits_logo.jpg',
    bullets: [
      'Full-stack web and mobile applications development in a startup environment'
    ]
  }
];

export interface Education {
  degree: string;
  institution: string;
  date: string;
  initials: string;
  // Image path relative to static/. Leave empty to show initials.
  logo: string;
  // Each item is a bullet. Use \n within an item for an explicit line break.
  bullets: string[];
}

export const education: Education[] = [
  {
    degree: 'Master of Applied Science, Biomedical Engineering',
    institution: 'University of British Columbia',
    date: 'Oct 2026',
    initials: 'UBC',
    logo: 'images/universityofbc_logo.jpg',
    bullets: [
      'Multi-Scale Multi-Modal Image and Omics Computing for Health Scholarship ($18,000)',
      'CANTRAIN Clinical Trails Training Program Studentship ($17,500)'
    ]
  },
  {
    degree: 'Bachelor of Science (Hons), Biology',
    institution: 'York University',
    date: 'May 2022',
    initials: 'YU',
    logo: 'images/york_logo.jpg',
    bullets: []
  }
];

export const publications = [
  {
    authors: 'Hadjifaradji A, Diaz-Stewart M, Chu J, et al.',
    title: 'A Deep Learning Framework for Classification of Neuroendocrine Neoplasm Whole Slide Images.',
    journal: 'Cancers. 2025;17(18):2991.',
    doi: '10.3390/cancers17182991'
  },
  {
    authors: 'Paul A, Mendis S, Diaz-Stewart M, et al.',
    title: 'Comparison of Lanreotide and Octreotide LAR Use and Outcomes for Gastrointestinal Neuroendocrine Tumors in British Columbia, Canada.',
    journal: 'Cancer Control. 2026.',
    doi: '10.1177/10732748261417423'
  }
];

export interface PosterPresentation {
  title: string;
  authors?: string;
  event: string;
  date: string;
  location?: string;
  // Optional full URL or file path relative to static/, e.g. 'posters/my-poster.pdf'.
  href?: string;
}

// Add entries here to display Poster presentations beneath the publications.
export const posterPresentations: PosterPresentation[] = [
  // {
  //   title: 'Your poster title',
  //   authors: 'Your author list',
  //   event: 'Conference or symposium name',
  //   date: 'Month Year',
  //   location: 'City, Country',
  //   href: ''
  // }
];
