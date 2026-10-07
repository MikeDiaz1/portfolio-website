import type { AssetPath } from '$app/types';

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: AssetPath;
  imageAlt: string;
  introduction: string;
  sections: { title: string; body: string }[];
  tags: string[];
  links: { label: string; href: string }[];
}

// The supplied mockup is the source for names and summaries. The longer copy
// is introductory template content; replace it with your own case studies.
export const projects: Project[] = [
  {
    slug: 'medical-image-ai',
    title: 'Medical-image AI',
    category: 'Research · Computational pathology',
    summary: 'Machine learning for computational pathology and external validation.',
    image: 'images/medical-image-ai.png',
    imageAlt: 'Illustrative pink and purple histology tissue with gland-like structures.',
    introduction: 'Exploring the intersection of medical images, machine learning, and the question of how well a model works beyond the data it was trained on.',
    sections: [
      { title: 'Computational pathology', body: 'Digital tissue images bring biological detail into a form that can be explored computationally. This project centres on machine learning for pathology images, connecting biomedical research with software.' },
      { title: 'Beyond the training set', body: 'External validation asks whether a model remains useful when the data changes. It is a central part of this work: looking beyond a single dataset to better understand the limits of a model.' }
    ],
    tags: ['Medical imaging', 'Machine learning', 'External validation'],
    links: []
  },
  {
    slug: 'emergent-garden',
    title: 'Emergent Garden',
    category: 'Creative coding · Simulation',
    summary: 'Interactive particle system exploring emergent behaviour.',
    image: 'images/emergent-garden.png',
    imageAlt: 'Colourful particles gathering into flowing pink, violet and turquoise clusters.',
    introduction: 'A small world of moving particles. Simple interactions give rise to patterns that feel unexpectedly alive.',
    sections: [
      { title: 'Small rules, surprising patterns', body: 'Emergent Garden explores how individual particles can form larger structures through their interactions. The interest is in the behaviour of the whole system, and the patterns that emerge without being drawn by hand.' },
      { title: 'An invitation to explore', body: 'An interactive simulation makes room for experimentation. Observing the movement, changing conditions, and watching new arrangements unfold are at the heart of the project.' }
    ],
    tags: ['Generative systems', 'Interaction', 'Emergent behaviour'],
    links: []
  },
  {
    slug: 'nostalgia-simulator',
    title: 'Nostalgia Simulator',
    category: 'Interactive experience · Digital nostalgia',
    summary: 'A desktop experience for exploring digital nostalgia.',
    image: 'images/nostalgia-simulator.png',
    imageAlt: 'A retro teal computer desktop with grey windows and pixel-style icons.',
    introduction: 'A familiar desktop from a simpler time. An exploration of the interfaces, small rituals, and visual details that make old software memorable.',
    sections: [
      { title: 'A desktop to rediscover', body: 'Windows, folders, and small desktop objects create a space for exploring digital nostalgia. The experience takes its cues from the visual language of early personal computers.' },
      { title: 'The feeling of using software', body: 'Nostalgia Simulator is about more than the appearance of an old screen. It explores how the familiar shapes and interactions of a desktop can carry a sense of place and memory.' }
    ],
    tags: ['Interface design', 'Retro computing', 'Interactive experience'],
    links: []
  },
  {
    slug: 'further-down-still',
    title: 'Further Down, Still',
    category: 'Game development · 2D action',
    summary: 'A 2D action game about descent and persistence.',
    image: 'images/further-down-still.png',
    imageAlt: 'Illustrative pixel-art cavern with a sword-wielding adventurer and red-lit enemy.',
    introduction: 'A journey further into the dark. A 2D action game built around descent, challenge, and the decision to keep going.',
    sections: [
      { title: 'Into the depths', body: 'Further Down, Still explores descent through the language of a 2D action game. A dark setting and a sense of forward movement frame the experience.' },
      { title: 'Try, learn, continue', body: 'Persistence is the central idea: meeting an obstacle, trying again, and finding a way onward. The project brings that theme into an interactive form.' }
    ],
    tags: ['2D action', 'Game design', 'Atmosphere'],
    links: []
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
