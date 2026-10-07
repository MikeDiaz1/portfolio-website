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

export const experience = [
  {
    date: '2024–2026',
    title: 'MASc Biomedical Engineering',
    organisation: 'University of British Columbia',
    description: 'Graduate research in computational pathology and external model validation.'
  },
  {
    date: '2023',
    title: 'Pharmacy Assistant',
    organisation: 'CareRx',
    description: 'Prepared, packaged and labelled medications.'
  },
  {
    date: '2022',
    title: 'Honours BSc Biology',
    organisation: 'York University',
    description: 'Biomedical Sciences stream.'
  },
  {
    date: '2017–2018',
    title: 'Full-stack Developer',
    organisation: '',
    description: 'Web and mobile application development.'
  }
];
