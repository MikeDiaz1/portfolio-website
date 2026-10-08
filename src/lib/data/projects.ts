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
  format: 'research' | 'gallery' | 'website' | 'compact' | 'placeholder';
  facts?: { label: string; value: string }[];
  introduction: string;
  results?: { value: string; label: string }[];
  resultNote?: string;
  sections: { title: string; body: string }[];
  gallery?: ProjectImage[];
  related?: string[];
  tags: string[];
  links: { label: string; href: string }[];
}

// Sources and image provenance are documented in docs/project-sources.md.
// Published game dates are approximate, as supplied by Michael.
export const projects: Project[] = [
  {
    "slug": "cms-reference-labels",
    "title": "Cancer subtype reference stability",
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Computational pathology",
    "summary": "Investigating the reliability of CMS labels.",
    "image": "images/projects/cms_classifiers.png",
    "imageAlt": "The same expression data produces CMS2, CMS4 or an unclassified result with three different classifiers.",
    "imageWidth": 852,
    "imageHeight": 448,
    "imageCaption": "Different classifiers can assign different consensus molecular subtypes to the same sample.",
    "format": "research",
    "facts": [
      {
        "label": "Context",
        "value": "Thesis / Part 1 of 3"
      },
      {
        "label": "Focus",
        "value": "Reference-label stability"
      },
      {
        "label": "Cohort",
        "value": "Personalized OncoGenomics"
      }
    ],
    "introduction": "Before training an image model to predict a molecular subtype, I wanted to understand how reliable the target labels were. This part of my thesis compared consensus molecular subtype (CMS) classifiers in colorectal cancer and examined whether their labels matched the expected biology.",
    "sections": [
      {
        "title": "A reference label depends on the protocol",
        "body": "I compared Random Forest, Single Sample Predictor and NanoString FFPE approaches using gene-expression data. The analysis considered classifier agreement, indeterminate calls, and the effects of changing thresholds and preprocessing. Random Forest and Single Sample Predictor had a Cohen’s kappa of 0.56 among jointly classified cases, but agreement fell to 0.28 when indeterminate calls were retained. Changing settings within a classifier also changed the assignments, and literature methods varied. These choices affect what an image model is being asked to learn."
      }
    ],
    "gallery": [
      {
        "src": "images/projects/varied_methods.png",
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
    "slug": "medical-image-ai",
    "title": "Image-based biomarker prediction",
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Medical-image machine learning",
    "summary": "Testing what histology can tell us about colorectal cancer biomarkers.",
    "image": "images/projects/molecular-pipeline.webp",
    "imageAlt": "Cohorts, the histopathology pipeline and the four evaluated tasks: CMS, MSI, mutations and survival.",
    "imageWidth": 3206,
    "imageHeight": 1565,
    "imageCaption": "Whole-slide images become patch embeddings, which are pooled to make slide-level predictions.",
    "format": "research",
    "facts": [
      {
        "label": "Context",
        "value": "Thesis / Part 2 of 3"
      },
      {
        "label": "Approach",
        "value": "Multiple-instance learning"
      },
      {
        "label": "Evaluation",
        "value": "Three cohorts"
      }
    ],
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
        "src": "images/projects/msi-screening-flow.png",
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
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Medical-image machine learning",
    "summary": "Investigating why pooled survival results weakened within individual cohorts.",
    "image": "images/projects/survival-approach.webp",
    "imageAlt": "A learned image representation feeds a discrete-time survival output, conditional hazards, survival probabilities and a risk score.",
    "imageWidth": 1645,
    "imageHeight": 555,
    "imageCaption": "A discrete-time survival model converts image features into conditional hazards and a patient risk score.",
    "format": "research",
    "facts": [
      {
        "label": "Context",
        "value": "Thesis / Part 3 of 3"
      },
      {
        "label": "Focus",
        "value": "Cohort shift"
      },
      {
        "label": "Evaluation",
        "value": "Pooled and stratified"
      }
    ],
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
        "src": "images/projects/survival-risk-groups.png",
        "alt": "Four Kaplan–Meier plots comparing low-risk and high-risk groups, with shaded confidence intervals, hazard ratios and log-rank p-values. The lower two panels show greater separation between groups.",
        "width": 878,
        "height": 778,
        "caption": "Kaplan–Meier curves comparing predicted low-risk and high-risk groups across four encoders, with hazard ratios and log-rank p-values."
      },
      {
        "src": "images/projects/survival-cohort-boxplots.png",
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
    "slug": "endometrial-biopsy-adaptation",
    "title": "Adapting tumor annotation to biopsies",
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Computational pathology",
    "summary": "Improving tumor annotation on endometrial biopsy slides through supervised fine-tuning and threshold selection.",
    "image": "images/projects/endometrial-biopsy-annotations.png",
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
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Computer vision",
    "summary": "Comparing ConvNet architectures for retinal image classification.",
    "image": "images/projects/oct-gradcam.webp",
    "imageAlt": "A retinal OCT scan with a Grad-CAM heatmap highlighting part of the retinal structure.",
    "imageWidth": 1024,
    "imageHeight": 496,
    "imageCaption": "Grad-CAM from the project. Underlying OCT images are from the public Kermany et al. dataset.",
    "format": "research",
    "facts": [
      {
        "label": "Context",
        "value": "Independent project"
      },
      {
        "label": "Task",
        "value": "Four-class classification"
      },
      {
        "label": "Tools",
        "value": "TensorFlow / Keras"
      }
    ],
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
        "caption": "The four image classes. OCT data credited to Kermany et al. in the original presentation."
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
    "group": "Research",
    "filterCategory": "Machine Learning",
    "category": "Research community / Kaggle",
    "summary": "Helping organize an ovarian cancer image-classification competition.",
    "image": "images/projects/ubc-ocean.webp",
    "imageAlt": "UBC-OCEAN competition header from Kaggle.",
    "imageWidth": 560,
    "imageHeight": 279,
    "imageCaption": "UBC Ovarian Cancer Subtype Classification and Outlier Detection on Kaggle.",
    "format": "compact",
    "facts": [
      {
        "label": "Role",
        "value": "Organization and communication"
      },
      {
        "label": "When",
        "value": "2023–2024"
      },
      {
        "label": "Platform",
        "value": "Kaggle"
      }
    ],
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
    "slug": "aim-lab-website",
    "title": "AI in Medicine lab website",
    "group": "Websites & previous work",
    "filterCategory": "Web",
    "category": "Web development / Research",
    "summary": "Built and maintain the AI in Medicine Lab website at UBC.",
    "image": "images/projects/aim-lab.png",
    "imageAlt": "The AI in Medicine Lab website home page.",
    "imageWidth": 1919,
    "imageHeight": 1079,
    "imageCaption": "The AIM Lab website brings together the lab’s research and public information.",
    "format": "website",
    "facts": [
      {
        "label": "Role",
        "value": "Website development and maintenance"
      },
      {
        "label": "Organization",
        "value": "AI in Medicine Lab, UBC"
      },
      {
        "label": "Status",
        "value": "Ongoing"
      }
    ],
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
    "image": "images/projects/stafits.png",
    "imageAlt": "The Stafits website showing employee-wellness articles and a contact banner with a woman surrounded by pink smoke.",
    "imageWidth": 1920,
    "imageHeight": 964,
    "imageCaption": "Archived Stafits website showing its articles and contact section.",
    "format": "gallery",
    "facts": [
      {
        "label": "Role",
        "value": "Software Developer"
      },
      {
        "label": "When",
        "value": "Nov 2017 – Oct 2018"
      },
      {
        "label": "Team",
        "value": "One of two developers"
      }
    ],
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
    "image": "images/projects/plm-coach.png",
    "imageAlt": "The PLM Coach website home page with information about the health coaching program.",
    "imageWidth": 1919,
    "imageHeight": 1079,
    "imageCaption": "PLM Coach connects participants with UBC medical student health coaches.",
    "format": "website",
    "facts": [
      {
        "label": "Role",
        "value": "Volunteer VP Technology Admin"
      },
      {
        "label": "Commitment",
        "value": "About three years"
      },
      {
        "label": "Status",
        "value": "Website management"
      }
    ],
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
    "facts": [
      {
        "label": "Role",
        "value": "Technical co-founder"
      },
      {
        "label": "Platform",
        "value": "Ethereum"
      },
      {
        "label": "Stage",
        "value": "Proof of concept"
      }
    ],
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
  },
  {
    "slug": "presentations",
    "title": "Presentations",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Healthcare simulation",
    "summary": "An emergency-room patient simulation for practising symptom recognition.",
    "image": "images/projects/presentations.png",
    "imageAlt": "Presentations simulation showing an emergency-unit patient form, diagnostic choices and feedback on an incorrect diagnosis in an illustrated consultation room.",
    "imageWidth": 1920,
    "imageHeight": 1080,
    "imageCaption": "The simulation combines patient information, diagnostic choices and explanatory feedback.",
    "format": "gallery",
    "facts": [
      {
        "label": "Context",
        "value": "Independent project"
      },
      {
        "label": "Started",
        "value": "Late 2022"
      },
      {
        "label": "Tools",
        "value": "Unity / C#"
      }
    ],
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
    "image": "images/projects/pixel-td-title.png",
    "imageAlt": "Pixel Tower Defense title screen with a neon turquoise particle background, a Play button and a credit to Michael Diaz-Stewart.",
    "imageWidth": 1920,
    "imageHeight": 1080,
    "imageCaption": "Pixel Tower Defense title screen.",
    "format": "gallery",
    "facts": [
      {
        "label": "Role",
        "value": "Independent developer"
      },
      {
        "label": "Released",
        "value": "Google Play / circa 2017"
      },
      {
        "label": "Tools",
        "value": "Unity / C#"
      }
    ],
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
    "image": "images/projects/expand-land.png",
    "imageAlt": "Expand Land puzzle gameplay with turquoise circles filling a yellow-green playfield and moving star-shaped obstacles.",
    "imageWidth": 2960,
    "imageHeight": 1440,
    "imageCaption": "Growing circles to cover the playfield while avoiding obstacles.",
    "format": "gallery",
    "facts": [
      {
        "label": "Context",
        "value": "My first mobile app"
      },
      {
        "label": "Released",
        "value": "Google Play / circa 2017"
      },
      {
        "label": "Tools",
        "value": "Unity / C#"
      }
    ],
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
        "src": "images/projects/expand-land-play.png",
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
    "imageWidth": 251,
    "imageHeight": 262,
    "imageCaption": "Illustrative OSRS automation image, not a capture of my own scripts.",
    "format": "compact",
    "facts": [
      {
        "label": "Context",
        "value": "Personal scripting projects"
      },
      {
        "label": "Tool",
        "value": "Simba"
      },
      {
        "label": "Game",
        "value": "RuneScape"
      }
    ],
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
    "slug": "nostalgia-desktop",
    "aliases": [
      "nostalgia-simulator"
    ],
    "title": "Nostalgia Desktop",
    "group": "Games & simulation",
    "filterCategory": "Game",
    "category": "Interactive experience / Digital nostalgia",
    "summary": "A desktop experience for exploring digital nostalgia.",
    "image": "images/nostalgia-simulator.png",
    "imageAlt": "A retro teal computer desktop with grey windows and pixel-style icons.",
    "imageWidth": 2172,
    "imageHeight": 724,
    "format": "placeholder",
    "introduction": "A familiar desktop from a simpler time. An exploration of the interfaces, small rituals, and visual details that make old software memorable.",
    "sections": [
      {
        "title": "A desktop to rediscover",
        "body": "Windows, folders, and small desktop objects create a space for exploring digital nostalgia. The experience takes its cues from the visual language of early personal computers."
      },
      {
        "title": "The feeling of using software",
        "body": "Nostalgia Desktop is about more than the appearance of an old screen. It explores how the familiar shapes and interactions of a desktop can carry a sense of place and memory."
      }
    ],
    "tags": [
      "Interface design",
      "Retro computing",
      "Interactive experience"
    ],
    "links": []
  },
  {
    "slug": "emergent-garden",
    "title": "Emergent Garden",
    "group": "More projects",
    "filterCategory": "Game",
    "category": "Creative coding / Simulation",
    "summary": "Interactive particle system exploring emergent behaviour.",
    "image": "images/emergent-garden.png",
    "imageAlt": "Colourful particles gathering into flowing pink, violet and turquoise clusters.",
    "imageWidth": 2172,
    "imageHeight": 724,
    "format": "placeholder",
    "introduction": "A small world of moving particles. Simple interactions give rise to patterns that feel unexpectedly alive.",
    "sections": [
      {
        "title": "Small rules, surprising patterns",
        "body": "Emergent Garden explores how individual particles can form larger structures through their interactions. The interest is in the behaviour of the whole system, and the patterns that emerge without being drawn by hand."
      },
      {
        "title": "An invitation to explore",
        "body": "An interactive simulation makes room for experimentation. Observing the movement, changing conditions, and watching new arrangements unfold are at the heart of the project."
      }
    ],
    "tags": [
      "Generative systems",
      "Interaction",
      "Emergent behaviour"
    ],
    "links": []
  },
  {
    "slug": "further-down-still",
    "title": "Further Down, Still",
    "group": "More projects",
    "filterCategory": "Game",
    "category": "Game development / 2D action",
    "summary": "A 2D action game about descent and persistence.",
    "image": "images/further-down-still.png",
    "imageAlt": "Illustrative pixel-art cavern with a sword-wielding adventurer and red-lit enemy.",
    "imageWidth": 2172,
    "imageHeight": 724,
    "format": "placeholder",
    "introduction": "A journey further into the dark. A 2D action game built around descent, challenge, and the decision to keep going.",
    "sections": [
      {
        "title": "Into the depths",
        "body": "Further Down, Still explores descent through the language of a 2D action game. A dark setting and a sense of forward movement frame the experience."
      },
      {
        "title": "Try, learn, continue",
        "body": "Persistence is the central idea: meeting an obstacle, trying again, and finding a way onward. The project brings that theme into an interactive form."
      }
    ],
    "tags": [
      "2D action",
      "Game design",
      "Atmosphere"
    ],
    "links": []
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug || project.aliases?.includes(slug));
}
