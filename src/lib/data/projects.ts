import type { AssetPath } from '$app/types';

export type ProjectFilter = 'Machine Learning' | 'Game' | 'Web';

export interface ProjectImage {
  src: AssetPath;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  portrait?: boolean;
}

export interface Project {
  slug: string;
  aliases?: string[];
  title: string;
  group: string;
  filterCategory: ProjectFilter;
  category: string;
  summary: string;
  image: AssetPath;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageCaption?: string;
  format: 'research' | 'gallery' | 'website' | 'compact';
  introduction: string;
  results?: { value: string; label: string }[];
  resultNote?: string;
  sections: { title: string; body: string }[];
  gallery?: ProjectImage[];
  related?: string[];
  tags: string[];
  links: { label: string; href: string }[];
  featuredLink?: { label: string; href: string; description: string };
}

// Sources and image provenance are documented in docs/project-sources.md.
// Published game dates are approximate, as supplied by Michael.
export const projects: Project[] = [
  {
    "slug": "medical-image-ai",
    "title": "Image-based biomarker prediction",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Medical-image machine learning",
    "summary": "Testing what histology can tell us about colorectal cancer.",
    "image": "images/projects/molecular-pipeline.webp",
    "imageAlt": "Cohorts, the histopathology pipeline and the four evaluated tasks: CMS, MSI, mutations and survival.",
    "imageWidth": 3206,
    "imageHeight": 1565,
    "imageCaption": "Whole-slide images become patch embeddings, which are pooled to make slide-level predictions.",
    "format": "research",
    "introduction": "I built and evaluated pathology-image models for CMS, microsatellite instability (MSI), and RAS/BRAF mutations. The central question was whether each prediction could be useful at an operating point chosen for its intended clinical task.",
    "results": [
      {
        "value": "94.4%",
        "label": "MSI sensitivity"
      },
      {
        "value": "98.3%",
        "label": "Negative predictive value"
      },
      {
        "value": "50.1%",
        "label": "Specificity"
      }
    ],
    "resultNote": "Held-out test results for the MSI encoder ensemble at the frozen screening threshold.",
    "sections": [
      {
        "title": "From tissue patches to predictions",
        "body": "The pipeline combines pathology foundation-model embeddings with attention-based multiple-instance learning. For MSI, I evaluated a high-sensitivity approach that could direct patients toward confirmatory testing. RAS and BRAF required different threshold choices because the useful prediction, and the consequences of an error, differed by target. MSI pre-screening was the most promising application. CMS evaluation remained limited by uncertainty in the reference labels, while clinically tuned RAS/BRAF thresholds left too little coverage to support implementation."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/msi-results.webp",
        "alt": "MSI performance chart and confusion matrices for pooled validation and held-out testing.",
        "width": 1800,
        "height": 1382,
        "caption": "MSI results at the selected screening operating point, including the trade-off between sensitivity and specificity."
      },
      {
        "src": "images/projects/msi-screening-flow.webp",
        "alt": "Illustrative MSI screening flow for 1,000 patients: 561 predicted high risk include 129 true positives and 432 false positives; 439 predicted low risk include 8 false negatives and 431 true negatives.",
        "width": 787,
        "height": 721,
        "caption": "Illustrative MSI pre-screening scenario for 1,000 patients. The high-risk group contains 129 of 137 MSI-high cases, while 8 are assigned to the low-risk group."
      }
    ],
    "tags": [
      "PyTorch",
      "Multiple-Instance Learning",
      "Foundation Models"
    ],
    "links": [],
    "related": [
      "cms-reference-labels",
      "survival-modelling"
    ]
  },
  {
    "slug": "survival-modelling",
    "title": "Image-based direct survival prediction",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Medical-image machine learning",
    "summary": "Investigating why pooled survival results weakened within individual cohorts.",
    "image": "images/projects/survival-approach.webp",
    "imageAlt": "A learned image representation feeds a discrete-time survival output, conditional hazards, survival probabilities and a risk score.",
    "imageWidth": 1645,
    "imageHeight": 555,
    "imageCaption": "A discrete-time survival model converts image features into conditional hazards and a patient risk score.",
    "format": "research",
    "introduction": "",
    "sections": [
      {
        "title": "",
        "body": "I used image representations to predict conditional event probabilities across time intervals, then derived survival probabilities and risk scores. Evaluation included the concordance index, hazard ratios and Kaplan–Meier risk-group comparisons."
      },
      {
        "title": "Looking inside the pooled result",
        "body": "UNI and prov-GigaPath reached pooled test C-indices of 0.618 and 0.626. Performance weakened after stratifying by TCGA, MD Anderson and POG, and predicted risk differed substantially by cohort. The stronger pooled result did not establish reliable discrimination within each cohort. I examined the distribution of risk scores and associations with molecular biomarkers. These associations were weak and sensitive to cohort composition. The work illustrates why external evaluation needs to look at cohort effects as well as aggregate performance."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/survival-risk-groups.webp",
        "alt": "Four Kaplan–Meier plots comparing low-risk and high-risk groups, with shaded confidence intervals, hazard ratios and log-rank p-values. The lower two panels show greater separation between groups.",
        "width": 878,
        "height": 778,
        "caption": "Kaplan–Meier curves comparing predicted low-risk and high-risk groups across four encoders, with hazard ratios and log-rank p-values."
      },
      {
        "src": "images/projects/survival-cohort-boxplots.webp",
        "alt": "Boxplots of predicted risk scores for TCGA, MDA and POG, showing the lowest median in MDA and the highest in POG, with annotated pairwise comparisons.",
        "width": 864,
        "height": 614,
        "caption": "Predicted risk scores varied by cohort, with a lower median in MDA and a higher median in POG."
      }
    ],
    "tags": [
      "Multiple-Instance Learning",
      "Domain Shift",
      "Model Evaluation"
    ],
    "links": [],
    "related": [
      "cms-reference-labels",
      "medical-image-ai"
    ]
  },
  {
    "slug": "cms-reference-labels",
    "title": "Cancer subtype reference stability",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Computational pathology",
    "summary": "Investigating the reliability of CMS labels.",
    "image": "images/projects/cms_classifiers.webp",
    "imageAlt": "The same expression data produces CMS2, CMS4 or an unclassified result with three different classifiers.",
    "imageWidth": 852,
    "imageHeight": 448,
    "imageCaption": "Different classifiers can assign different consensus molecular subtypes to the same sample.",
    "format": "research",
    "introduction": "Before training an image model to predict a molecular subtype, I wanted to understand how reliable the target labels were. This part of my thesis compared consensus molecular subtype (CMS) classifiers in colorectal cancer and examined whether their labels matched the expected biology.",
    "sections": [
      {
        "title": "A reference label depends on the protocol",
        "body": "I compared Random Forest, Single Sample Predictor and NanoString FFPE approaches using gene-expression data. The analysis considered classifier agreement, indeterminate calls, and the effects of changing thresholds and preprocessing. Random Forest and Single Sample Predictor had a Cohen’s kappa of 0.56 among jointly classified cases, but agreement fell to 0.28 when indeterminate calls were retained. Changing settings within a classifier also changed the assignments, and literature methods varied. These choices affect what an image model is being asked to learn."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/varied_methods.webp",
        "alt": "Three confusion matrices comparing CMS assignments under different treatments of indeterminate cases.",
        "width": 1653,
        "height": 409,
        "caption": "Agreement changes with the treatment of indeterminate calls. Figure from my thesis analysis."
      }
    ],
    "tags": [
      "Label Quality",
      "Model Evaluation",
      "Gene Expression"
    ],
    "links": [],
    "related": [
      "medical-image-ai",
      "survival-modelling"
    ]
  },
  {
    "slug": "endometrial-biopsy-adaptation",
    "title": "Adapting tumor annotation to biopsies",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Computational pathology",
    "summary": "Improving tumor annotation on endometrial biopsy slides through supervised fine-tuning and threshold selection.",
    "image": "images/projects/endometrial-biopsy-annotations.webp",
    "imageAlt": "Four panels compare model-predicted tumor outlines in blue with a pathologist's tumor annotations in green and other cell-type annotations in red on the same biopsy slide, at threshold settings 4, 5, 6 and 7.",
    "imageWidth": 1262,
    "imageHeight": 869,
    "imageCaption": "Threshold comparison on one biopsy slide. Green marks the pathologist's tumor annotations, red marks another cell type, and blue outlines the model's predicted tumor regions.",
    "format": "research",
    "introduction": "I adapted an existing tumor-annotation model to endometrial biopsy slides using supervised fine-tuning on additional slides annotated by a pathologist. I then refined the prediction threshold to bring the automated tumor regions into closer agreement with those annotations.",
    "sections": [
      {
        "title": "Building on earlier research",
        "body": "Earlier work published in Nature Communications identified a p53abn-like subgroup within endometrial cancers classified as NSMP (no specific molecular profile), associated with poorer outcomes. My follow-on contribution focused on adapting the tumor-annotation stage of the image-analysis pipeline from surgical sections to biopsy slides. The model needed to handle the different tissue presentation in biopsy slides. I used additional biopsy images with pathologist-provided annotations for supervised fine-tuning, improving automated tumor annotation on these specimens."
      },
      {
        "title": "Choosing the prediction threshold",
        "body": "After fine-tuning, I compared predicted tumor regions with the pathologist's annotations across threshold settings. Threshold selection further improved their agreement. The figure illustrates the trade-off: increasing the threshold removes predicted regions outside the annotated tumor, but can also exclude parts of the tumor itself."
      }
    ],
    "tags": [
      "Supervised Fine-Tuning",
      "Domain Adaptation"
    ],
    "links": [
      {
        "label": "Background study · Nature Communications (2024)",
        "href": "https://www.nature.com/articles/s41467-024-49017-2"
      }
    ]
  },
  {
    "slug": "retinal-oct",
    "title": "Retinal disease classifier",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Computer vision",
    "summary": "Comparing ConvNet architectures for retinal image classification.",
    "image": "images/projects/oct-gradcam.webp",
    "imageAlt": "A retinal OCT scan with a Grad-CAM heatmap highlighting part of the retinal structure.",
    "imageWidth": 1024,
    "imageHeight": 496,
    "imageCaption": "Grad-CAM from the project, showing areas of high attention for a convolutional model.",
    "format": "research",
    "introduction": "I built a classifier for retinal optical coherence tomography (OCT) images using the public Kermany dataset. The project grew from a custom convolutional network into experiments with EfficientNet-inspired scaling and squeeze-and-excitation blocks, and a residual architecture inspired by ResNet.",
    "results": [
      {
        "value": ">93%",
        "label": "Custom convolutional model"
      },
      {
        "value": ">96%",
        "label": "EfficientNet-inspired model"
      },
      {
        "value": ">97%",
        "label": "Residual model"
      }
    ],
    "resultNote": "Accuracy reported in the original project presentation on its evaluation data. The lightweight EfficientNet-inspired model used approximately 150,000 parameters.",
    "sections": [
      {
        "title": "Learning from the errors",
        "body": "The classes were choroidal neovascularization (CNV), diabetic macular edema (DME), drusen and normal retina. I addressed class imbalance with weighting and monitored precision, recall and F1 alongside accuracy. Overfitting was a recurring problem. I experimented with batch size and model complexity, used Optuna for hyperparameter tuning, and implemented ideas from EfficientNet and ResNet. The experiments showed that adding depth was not automatically helpful, and that a small network could perform well."
      },
      {
        "title": "Inspecting the model",
        "body": "Grad-CAM visualizations helped me inspect which image regions contributed to predictions. Together with the classification metrics, they provided another way to examine model behaviour."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/retinal-oct.webp",
        "alt": "Example OCT images labelled CNV, DME, drusen and normal.",
        "width": 650,
        "height": 130,
        "caption": "The four image classes. Credit to Kermany et al."
      }
    ],
    "tags": [
      "TensorFlow",
      "Keras",
      "Grad-CAM"
    ],
    "links": [
      {
        "label": "Project presentation",
        "href": "https://docs.google.com/presentation/d/1YGw2yhoKaz131XMtpG0gYeRQHZ6BALhaVfNIWY5X0ys/edit?slide=id.g24b9a3e4d1e_0_2477"
      },
      {
        "label": "Original dataset",
        "href": "https://data.mendeley.com/datasets/rscbjbr9sj/3"
      }
    ]
  },
  {
    "slug": "ubc-ocean",
    "title": "UBC-OCEAN Competition",
    "group": "Machine Learning",
    "filterCategory": "Machine Learning",
    "category": "Research community / Kaggle",
    "summary": "Helping organize an ovarian cancer image-classification competition.",
    "image": "images/projects/ubc-ocean.webp",
    "imageAlt": "UBC-OCEAN competition header from Kaggle.",
    "imageWidth": 560,
    "imageHeight": 279,
    "imageCaption": "UBC Ovarian Cancer Subtype Classification and Outlier Detection on Kaggle.",
    "format": "compact",
    "introduction": "I helped with the UBC-OCEAN competition, organizing information and relaying it to competitors. The challenge brought together participants working on ovarian cancer subtype classification and outlier detection from pathology images.",
    "sections": [
      {
        "title": "Supporting the competition",
        "body": "My contribution focused on coordination and competitor communication: helping information move between the organizing side and the people building models. This was an opportunity to support a research community working with a challenging medical-imaging dataset."
      }
    ],
    "tags": [
      "Kaggle Competitions",
      "Outlier Detection"
    ],
    "links": [
      {
        "label": "Competition on Kaggle",
        "href": "https://www.kaggle.com/competitions/UBC-OCEAN"
      },
      {
        "label": "My Kaggle profile",
        "href": "https://www.kaggle.com/michaeldiazstewart"
      }
    ]
  },
  {
    "slug": "further-down-still",
    "title": "Further Down, Still",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Game development / Incremental dungeon diver",
    "summary": "Descend through gothic arenas, and return stronger.",
    "image": "images/projects/further-down-still-title.webp",
    "imageAlt": "Further Down, Still title screen with a cloaked figure at a campfire overlooking a vast monochrome gothic city, beside the Descend button.",
    "imageWidth": 1919,
    "imageHeight": 1079,
    "imageCaption": "The campfire and title screen, with a monumental gothic city beyond.",
    "format": "gallery",
    "introduction": "I built Further Down, Still in Phaser 4 and TypeScript, leveraging agentic workflows (Codex, Claude Code). It is a dark incremental dungeon diver with 'Vampire Survivors'-like combat. You choose the build and upgrades, watch them come together, and push deeper before returning to the campfire to invest your rewards in the next descent.",
    "sections": [
      {
        "title": "An emerging combat engine",
        "body": "Three classes, layered weapon unlocks, branching upgrades and late-run capstones give each build its direction. Sixteen authored depths place it against overlapping enemy waves and bosses in fixed-camera arenas. The decisions are about how the weapons work together and how much further the build can carry you."
      },
      {
        "title": "",
        "body": "Earned Ash pays for permanent upgrades at the campfire. A descent-themed progression tree unlocks Prayers and other lasting advantages, while 2× and 4× Turbo modes speed up familiar parts of repeat runs. Each return is an opportunity to invest, adjust the build and try another descent."
      },
      {
        "title": "Data after each run",
        "body": "Run records show weapon contributions, incoming damage and boss health remaining, alongside the last eight settled builds. These breakdowns make it easier to see what carried a run and what to change next. Persistent saves keep progression between browser sessions."
      },
      {
        "title": "Gustave Doré-inspired atmosphere",
        "body": "The art reflects my appreciation of biblical/gothic engravings, with detailed monochrome characters, monumental environments and restrained flashes of color. Music supports the descent, with the soundtrack available in the linked public Suno playlist."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/further-down-still-progression.webp",
        "alt": "A descending progression tree beside permanent upgrades for Fury, Fortitude and Madness, with Prayers and Turbo unlocks.",
        "width": 1122,
        "height": 652,
        "caption": "Spend Ash on permanent upgrades and unlock new options through the progression tree."
      },
      {
        "src": "images/projects/further-down-still-combat.webp",
        "alt": "Automatic combat in a stone arena surrounded by flooded gothic ruins and towering statues, with projectiles radiating around the player.",
        "width": 1919,
        "height": 1079,
        "caption": "A build in action within one of the game's fixed-camera arenas."
      },
      {
        "src": "images/projects/further-down-still-upgrades.webp",
        "alt": "A Censer Host upgrade choice between Stronger Bolts and Greater Reach over a dark arena.",
        "width": 1919,
        "height": 1079,
        "caption": "Branching weapon upgrades shape the build during a descent."
      },
      {
        "src": "images/projects/further-down-still-records.webp",
        "alt": "The Back to the Embers run summary showing depths cleared, Ash earned, descent time and damage contributions from two weapons.",
        "width": 1919,
        "height": 1079,
        "caption": "The end-of-run breakdown shows rewards, weapon contributions and the choices made along the way."
      }
    ],
    "tags": [
      "Phaser 2D",
      "Game Design",
      "Agentic Development"
    ],
    "links": [],
    "featuredLink": {
      "label": "Listen to the soundtrack",
      "href": "https://suno.com/playlist/fdcfd632-e15a-418e-b713-d1585b5f406c",
      "description": "Explore the game's music in the public Suno playlist."
    }
  },
  {
    "slug": "nostalgia-desktop",
    "aliases": [
      "nostalgia-simulator"
    ],
    "title": "Nostalgic desktop",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Interactive experience / Digital nostalgia",
    "summary": "An XP-era desktop playground with games, apps, music and nostalgic sound effects.",
    "image": "images/projects/nostalgia-desktop.webp",
    "imageAlt": "Nostalgia Desktop showing an XP-inspired blue taskbar, rolling green hills, app icons, a desktop dog and a fictional system update notice.",
    "imageWidth": 1680,
    "imageHeight": 945,
    "imageCaption": "HomeCentral 98, the fictional desktop at the heart of Nostalgia Desktop.",
    "format": "gallery",
    "introduction": "I built Nostalgia Desktop with Phaser and TypeScript, and leveraging Codex and Claude Code for agentic workflows. It recreates the feeling of a family computer in the late 1990s and early 2000s: an XP-inspired desktop full of apps, games, music and sound effects. Everything is available from the start, so you can explore at your own pace.",
    "sections": [
      {
        "title": "Games and random tools",
        "body": "The fictional HomeCentral 98 desktop has draggable windows, a Start menu, customizable cursors, fake system notices and a replayable BIOS startup. Apps include the HomeAmp music player, fictional instant messaging, a CD wallet and Drive Care, alongside a desktop destruction kit."
      },
      {
        "title": "",
        "body": "Play Snake, the asteroid-style Debris Field, the Minesweeper-inspired Parcel Check, a memory game or pinball with multiball. HomePaint lets you draw, turn your artwork into wallpaper, or print it into a scrapbook, complete with simulated paper jams. A desktop dog can be petted, taught tricks and sent to fetch or discover buried collectibles."
      },
      {
        "title": "Atmosphere and personalization",
        "body": "Music, nostalgic sound effects, changing weather, snow on window frames, day and night themes, and animated screensavers give the desktop its atmosphere. Settings, artwork, conversations and collections persist locally, with manual Save and Load options."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/nostalgia-drive-care.webp",
        "alt": "The Drive Care app displaying a colorful disk organization grid in an XP-style window, with rain falling across the desktop behind it.",
        "width": 1681,
        "height": 946,
        "caption": "Drive Care's disk organization activity, with rainy weather on the desktop."
      },
      {
        "src": "images/projects/nostalgia-apps.webp",
        "alt": "The HomeAmp music player, Calculator and Minesweeper-inspired Parcel Check game open together on the desktop at night.",
        "width": 1680,
        "height": 947,
        "caption": "HomeAmp, Calculator and Parcel Check running together in the desktop's night theme."
      }
    ],
    "tags": [
      "Phaser 2D",
      "TypeScript",
      "Agentic Development"
    ],
    "links": []
  },
  {
    "slug": "emergent-sandbox",
    "aliases": ["emergent-garden", "emergence-playground"],
    "title": "Emergent Sandbox",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Creative coding / Simulation",
    "summary": "A particle sandbox where simple attraction and repulsion rules create clusters, chasing loops and moving swarms.",
    "image": "images/projects/emergence-playground.webp",
    "imageAlt": "Emergent Sandbox showing clusters of amber, mint, lilac and pink particles alongside starting presets and a directed interaction matrix.",
    "imageWidth": 1627,
    "imageHeight": 949,
    "imageCaption": "The Color islands preset: particles gather into clusters according to their attraction and repulsion rules.",
    "format": "gallery",
    "introduction": "I built Emergent Sandbox with Codex as an open-ended simulation for emergent behavior. Simple attraction and repulsion rules produce clusters, chasing loops, orbiting pairs and moving swarms. The program runs locally in the browser.",
    "sections": [
      {
        "title": "Changing the rules",
        "body": "An interaction matrix controls how two to eight particle colors respond to each other. The rules can be asymmetric: one color can chase another without being chased back. Live controls adjust force strength, interaction range, damping, gravity and optional Fibonacci distance bands, making it easy to explore how small changes affect the larger pattern."
      },
      {
        "title": "Interacting with the scene",
        "body": "Grab, spawn or erase particles, paint solid obstacles, and explore the world with pan and zoom. Selecting a particle reveals the forces acting on it, while live measurements track clustering, color segregation, heading diversity and organized activity. These tools connect the visible patterns to the local interactions that produce them."
      },
      {
        "title": "Repeatable experiments and automated exploration",
        "body": "Pause the simulation, advance one step or replay a seeded scene to examine how it develops. Background searches explore rule combinations for interesting patterns, and configurations can be saved, loaded or shared through JSON. This makes it possible to return to a setup and compare the effects of different choices."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/emergence-playground-rules.webp",
        "alt": "Four particle colors forming a compact arrangement beside an asymmetric interaction matrix and live controls for range, force strength and damping.",
        "width": 1635,
        "height": 943,
        "caption": "Asymmetric rules and live physics controls produce different collective patterns."
      },
      {
        "src": "images/projects/emergence-playground-forces.webp",
        "alt": "A selected particle with a circular neighborhood and force arrows to nearby particles, beside force falloff, gravity and attraction controls.",
        "width": 1668,
        "height": 941,
        "caption": "Inspect an individual particle to see the forces acting on it."
      }
    ],
    "tags": [
      "TypeScript",
      "Particle Simulation",
      "Agentic Development"
    ],
    "links": []
  },
  {
    "slug": "presentations",
    "title": "Presentations",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Healthcare simulation",
    "summary": "An emergency-room patient simulation for practising symptom recognition.",
    "image": "images/projects/presentations.webp",
    "imageAlt": "Presentations simulation showing an emergency-unit patient form, diagnostic choices and feedback on an incorrect diagnosis in an illustrated consultation room.",
    "imageWidth": 1920,
    "imageHeight": 1080,
    "imageCaption": "The simulation combines patient information, diagnostic choices and explanatory feedback.",
    "format": "gallery",
    "introduction": "Presentations is a Unity simulation of patient presentations in an emergency-room setting. I built it to model diseases with software, and to practise recognizing disease patterns from a patient’s demographics, symptoms and vital signs.",
    "sections": [
      {
        "title": "Generating a patient",
        "body": "The game covers 18 disease presentations. It generates demographic and risk-factor information such as age, weight, activity, smoking and family history, uses those factors to weight disease likelihood, and then generates a symptom profile. Players choose a diagnosis and receive feedback. Hover text explains physiological ranges and terminology, giving the case more context as the player works through it."
      },
      {
        "title": "",
        "body": "Hand-written rules made it difficult to represent the interplay between many risk factors and symptoms. Working on those relationships became part of my motivation to explore machine learning."
      }
    ],
    "tags": [
      "Unity",
      "C#",
      "Simulation",
      "Medical Education"
    ],
    "links": [
      {
        "label": "Screenshots and project context",
        "href": "https://imgur.com/a/presentations-Q7Iau9Y"
      }
    ]
  },
  {
    "slug": "pixel-tower-defense",
    "title": "Pixel Tower Defense",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "3D mobile game",
    "summary": "A simple tower defense game published on Google Play around 2017.",
    "image": "images/projects/pixel-td-title.webp",
    "imageAlt": "Pixel Tower Defense title screen with a neon turquoise particle background, a Play button and a credit to Michael Diaz-Stewart.",
    "imageWidth": 1920,
    "imageHeight": 1080,
    "imageCaption": "Pixel Tower Defense title screen.",
    "format": "gallery",
    "introduction": "I built Pixel Tower Defense in Unity and C#, taking a 3D tower defense game with simple graphics through to a Google Play release around 2017. Players defend against endless waves of enemies by placing and upgrading towers.",
    "sections": [
      {
        "title": "Developing the game",
        "body": "The project combined a 3D playfield with tower selection, upgrade controls and wave progression. The visual style uses simple geometric forms, bright outlines and strong colour contrasts."
      },
      {
        "title": "",
        "body": "The progress images show the game moving from an early prototype to a more developed interface, a dedicated upgrades menu and baked lighting. One screenshot was annotated for an in-game instructional diagram."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/pixel-td-prototype.webp",
        "alt": "An earlier Pixel Tower Defense interface with handwritten labels explaining the controls.",
        "width": 1165,
        "height": 657,
        "caption": "An earlier interface, annotated for an instructional diagram."
      },
      {
        "src": "images/projects/pixel-td-upgrades.webp",
        "alt": "Tower Upgrades panel showing damage, attack rate and range with an upgrade button.",
        "width": 1800,
        "height": 1013,
        "caption": "Tower upgrades menu."
      }
    ],
    "tags": [
      "Unity",
      "C#",
      "3D",
      "Android"
    ],
    "links": [
      {
        "label": "Development screenshots",
        "href": "https://imgur.com/a/pixel-td-progress-Ye8kb"
      }
    ]
  },
  {
    "slug": "expand-land",
    "title": "Expand Land",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "2D mobile puzzle game",
    "summary": "Fill the playfield while avoiding obstacles. Published on Google Play around 2017.",
    "image": "images/projects/expand-land.webp",
    "imageAlt": "Expand Land puzzle gameplay with turquoise circles filling a yellow-green playfield and moving star-shaped obstacles.",
    "imageWidth": 2960,
    "imageHeight": 1440,
    "imageCaption": "Growing circles to cover the playfield while avoiding obstacles.",
    "format": "gallery",
    "introduction": "Expand Land was my first mobile app: a simple 2D puzzle game built with Unity and C#. The goal is to fill as much space as possible while avoiding obstacles. I published it on Google Play around 2017.",
    "sections": [
      {
        "title": "A simple spatial puzzle",
        "body": "Players grow circles within the playfield, balancing coverage against the moving obstacles. The interface tracks the level, circles used, lives and percentage filled."
      },
      {
        "title": "Taking it to mobile",
        "body": "The project brought together the puzzle mechanics, level flow and mobile interface. The screenshots also show restart and rewarded-ad retry options from the game."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/expand-land-play.webp",
        "alt": "Expand Land level 2 with blue circles covering 65 percent of a white playfield, black star-shaped obstacles and three lives remaining.",
        "width": 2960,
        "height": 1440,
        "caption": "Level 2 with 65% of the playfield covered."
      },
      {
        "src": "images/projects/expand-land-retry.webp",
        "alt": "Expand Land out-of-lives menu offering Restart and Watch Ad to Retry Level.",
        "width": 447,
        "height": 251,
        "caption": "The retry screen."
      }
    ],
    "tags": [
      "Unity",
      "C#",
      "2D puzzles",
      "Android"
    ],
    "links": [
      {
        "label": "Game screenshots",
        "href": "https://imgur.com/a/expand-land-6LUE2BU"
      }
    ]
  },
  {
    "slug": "simba-runescape",
    "title": "RuneScape automation",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Scripting / Game automation",
    "summary": "Writing Simba scripts to automate tasks in RuneScape.",
    "image": "images/projects/simba-runescape.webp",
    "imageAlt": "Illustrative Old School RuneScape automation image with green boxes around trees and inventory slots.",
    "imageWidth": 511,
    "imageHeight": 528,
    "imageCaption": "Illustrative OSRS automation image, not a capture of my own scripts.",
    "format": "compact",
    "introduction": "I wrote Simba scripts for botting in RuneScape. These were small automation projects built around observing the game state and carrying out repeated actions, such as gathering resources and managing inventory.",
    "sections": [
      {
        "title": "Scripting a repeatable task",
        "body": "The work was an early exercise in turning a game activity into a sequence of decisions and actions. It gave me practical experience with automation and debugging behaviour in an interactive environment. I no longer have a script or demo to share."
      }
    ],
    "tags": [
      "Simba",
      "Scripting",
      "Automation"
    ],
    "links": []
  },
  {
    "slug": "aim-lab-website",
    "title": "AI in Medicine lab website",
    "group": "Websites & previous work",
    "filterCategory": "Web",
    "category": "Web development / Research",
    "summary": "Built and maintain the AI in Medicine Lab website at UBC.",
    "image": "images/projects/aim-lab.webp",
    "imageAlt": "The AI in Medicine Lab website home page.",
    "imageWidth": 1919,
    "imageHeight": 1079,
    "imageCaption": "The AIM Lab website brings together the lab’s research and public information.",
    "format": "website",
    "introduction": "I built and maintain the website for UBC’s AI in Medicine Lab. It gives the lab a place to share its research, publications, news and opportunities with researchers and other visitors.",
    "sections": [
      {
        "title": "A home for the lab’s work",
        "body": "The site brings research highlights and publications together with information about the lab, a gallery, news and careers. My work covers the site itself and its ongoing maintenance as the lab’s public presence evolves."
      }
    ],
    "tags": [
      "Web Development",
      "Research Communication"
    ],
    "links": [
      {
        "label": "Visit AIM Lab",
        "href": "https://aimlab.ca/"
      }
    ]
  },
  {
    "slug": "stafits",
    "title": "Stafits website and app",
    "group": "Websites & previous work",
    "filterCategory": "Web",
    "category": "Software development / Startup",
    "summary": "Website, user portal, browser extensions and a mobile travel app.",
    "image": "images/projects/stafits.webp",
    "imageAlt": "The Stafits website showing employee-wellness articles and a contact banner with a woman surrounded by pink smoke.",
    "imageWidth": 1920,
    "imageHeight": 964,
    "imageCaption": "Archived Stafits website showing its articles and contact section.",
    "format": "gallery",
    "introduction": "I worked as one of two software developers at Stafits, a Toronto startup. My work spanned the website and user portal, browser extensions, and a mobile app that integrated the Google Places API.",
    "sections": [
      {
        "title": "Building across surfaces",
        "body": "The work connected a public website with tools people could use in their browser and on their phone. The mobile screenshots show the benefits dashboard and a trip planner with nearby activities, shopping and tourism options."
      },
      {
        "title": "Developing as a team",
        "body": "Stafits was an early opportunity to work on software as part of a small development team, building across several parts of a product and learning how to coordinate that work."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/stafits-mobile.webp",
        "alt": "Stafits mobile dashboard with benefits, reimbursements, time off and trip planner options.",
        "width": 875,
        "height": 1800,
        "caption": "Mobile app dashboard.",
        "portrait": true
      },
      {
        "src": "images/projects/stafits-travel.webp",
        "alt": "Stafits trip planner for Boston showing activities, shopping and tourism categories.",
        "width": 875,
        "height": 1800,
        "caption": "Travel planning with Google Places.",
        "portrait": true
      }
    ],
    "tags": [
      "Web Development",
      "Mobile Apps",
      "Browser Extensions",
      "Google Places API"
    ],
    "links": [
      {
        "label": "Website screenshots",
        "href": "https://imgur.com/a/stafits-landing-page-iw99UJw"
      },
      {
        "label": "Travel app screenshots",
        "href": "https://imgur.com/a/stafits-travel-app-uVylnpl"
      },
      {
        "label": "Archived website (2018)",
        "href": "https://web.archive.org/web/20181215100555/https://www.stafits.com/"
      }
    ]
  },
  {
    "slug": "plm-coach",
    "title": "PLM Coach website",
    "group": "Websites & previous work",
    "filterCategory": "Web",
    "category": "Web administration / Volunteer work",
    "summary": "Website administration for a UBC health-coaching program.",
    "image": "images/projects/plm-coach.webp",
    "imageAlt": "The PLM Coach website home page with information about the health coaching program.",
    "imageWidth": 1919,
    "imageHeight": 1079,
    "imageCaption": "PLM Coach connects participants with UBC medical student health coaches.",
    "format": "website",
    "introduction": "I served as volunteer VP Technology Admin for PLM Coach for about three years, with responsibility for its website. PLM stands for Prevention and Lifestyle Medicine, and the program offers free health coaching with UBC medical students.",
    "sections": [
      {
        "title": "Keeping the program accessible",
        "body": "The website explains the program, introduces the team, and helps prospective participants find eligibility information and sign-up options. My work focused on website administration and upkeep, and I still look after the website."
      }
    ],
    "tags": [
      "Website Development",
      "Healthcare"
    ],
    "links": [
      {
        "label": "Visit PLM Coach",
        "href": "https://www.plmcoach.ca/"
      }
    ]
  },
  {
    "slug": "upropos",
    "title": "Upropos (ethereum)",
    "group": "Websites & previous work",
    "filterCategory": "Web",
    "category": "Web development / Entrepreneurship",
    "summary": "An Ethereum crowdfunding platform and proof of concept.",
    "image": "images/projects/upropos.webp",
    "imageAlt": "The Upropos prototype website with a green geometric background and the heading We Are Upropos.",
    "imageWidth": 1800,
    "imageHeight": 1012,
    "imageCaption": "The Upropos landing-page prototype.",
    "format": "gallery",
    "introduction": "Upropos was a cryptocurrency crowdfunding project built on Ethereum. As technical co-founder, I partnered with a business-focused co-founder to develop the concept and demonstrate a working proof of concept to potential investors.",
    "sections": [
      {
        "title": "Building the prototype",
        "body": "The project involved blockchain programming with Solidity and web3, alongside the web interface for the crowdfunding concept."
      },
      {
        "title": "Explaining the idea",
        "body": "Developing and presenting the proof of concept also gave me practice communicating technical work to a non-technical audience and connecting implementation choices to the proposed product."
      }
    ],
    "tags": [
      "Ethereum",
      "Solidity",
      "web3"
    ],
    "links": [
      {
        "label": "Prototype video",
        "href": "https://www.youtube.com/watch?v=hCCjlpMD9Lw"
      },
      {
        "label": "Project screenshots",
        "href": "https://imgur.com/a/XUpQi46"
      }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug || project.aliases?.includes(slug));
}
