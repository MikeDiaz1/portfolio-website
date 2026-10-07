export interface ProfileLink {
  label: string;
  href: string;
  icon?: 'github' | 'linkedin';
}

export const profile = {
  name: 'Michael Diaz-Stewart',
  tagline: 'Medical-image ML & software',
  // Paths are relative to static/. Leave empty to use the silhouette.
  avatar: '',
  // Add your real destinations. Empty destinations render as unavailable labels.
  links: [
    { label: 'GitHub', href: 'https://github.com/MikeDiaz1', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-diaz-stewart-7547ab271/', icon: 'linkedin' },
    { label: 'Resume', href: '' },
    { label: 'Contact', href: '' }
  ] satisfies ProfileLink[]
};

export interface Experience {
  date: string;
  title: string;
  organisation: string;
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
    organisation: 'University of British Columbia',
    employment: 'Permanent full-time',
    location: 'Vancouver, BC, Canada',
    arrangement: 'Hybrid',
    initials: 'UBC',
    logo: '',
    bullets: ['Graduate research in computational pathology and external model validation.']
  },
  {
    date: 'Jan 2024 – Aug 2024',
    title: 'Clinical Machine Learning Research Intern',
    organisation: 'Providence Health Care',
    employment: 'Co-op',
    location: 'Vancouver, BC, Canada',
    arrangement: 'Hybrid',
    initials: 'PHC',
    logo: '',
    bullets: []
  },
  {
    date: 'Jun 2022 – Dec 2023',
    title: 'MCAT Instructor',
    organisation: 'Kyo Standard',
    employment: 'Contract part-time',
    location: 'San Diego, CA, United States',
    arrangement: 'Remote',
    initials: 'KS',
    logo: '',
    bullets: []
  },
  {
    date: 'Apr 2023 – Jul 2023',
    title: 'Pharmacy Assistant',
    organisation: 'CareRx Corporation',
    employment: 'Permanent full-time',
    location: 'Burnaby, BC, Canada',
    arrangement: 'On-site',
    initials: 'CRx',
    logo: '',
    bullets: ['Prepared, packaged and labelled medications.']
  },
  {
    date: 'Nov 2017 – Oct 2018',
    title: 'Software Developer',
    organisation: 'Stafits',
    employment: 'Permanent full-time',
    location: 'Toronto, ON, Canada',
    arrangement: 'On-site',
    initials: 'S',
    logo: '',
    bullets: ['Web and mobile application development.']
  }
];

export const education = [
  {
    degree: 'Master of Applied Science, Biomedical Engineering',
    institution: 'University of British Columbia',
    date: 'Expected Oct 2026',
    distinction: 'Coursework average: 93.7%',
    awards: 'NSERC MUSIC Scholarship ($18,000); CANTRAIN Master’s Studentship ($17,500).'
  },
  {
    degree: 'Honours BSc, Biology (Biomedical Sciences stream)',
    institution: 'York University',
    date: '2022',
    distinction: 'First Class Standing; Dean’s Honour Roll',
    awards: ''
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
