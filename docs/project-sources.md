# Project content and image sources

Content was adapted from Michael's supplied materials and descriptions in October 2026. Images in `static/images/projects/` are optimized WebP copies. They are project screenshots, analysis figures, or identified reference images; they were not generated for this update. The source slide decks themselves are not included in the public site.

## Thesis research

Source: Michael's supplied `Defence_slides.pptx`, titled *Computational Pathology for Biomarker Prediction and Survival Modelling in Colorectal Cancer*. Its three research parts became three connected portfolio entries.

| Entry | Source slides | Local images |
| --- | --- | --- |
| CMS reference labels | 6–12; classifier comparison and agreement figures on 7–8 | `cms-classifiers.webp`, `cms-agreement.webp` |
| Histology-based biomarker prediction | 13–21; pipeline on 14 and MSI results on 17 | `molecular-pipeline.webp`, `msi-results.webp` |
| Survival modelling across cohorts | 22–28; approach on 23 and cohort risk distributions on 26 | `survival-approach.webp`, `survival-cohorts.webp` |

The MSI metrics are the held-out test encoder-ensemble results at the selected threshold. They describe retrospective evaluation; the illustrated clinical pathways in the source are hypothetical. Survival results preserve the distinction between pooled and cohort-stratified performance. The portfolio does not imply clinical deployment.

The pipeline image was subsequently replaced with Michael's supplied `overview.png`: a white-background overview containing the cohorts, histopathology pipeline, and evaluated tasks. The local filename remains `molecular-pipeline.webp`.

Michael also supplied the Sankey diagram saved as `msi-screening-flow.png`, added after the MSI results figure. It illustrates screening outcomes for a hypothetical group of 1,000 patients and is preserved as the original PNG.

The additional survival figure, `survival-cohort-boxplots.png`, is Michael's supplied comparison of predicted risk scores across TCGA, MDA and POG, preserved as the original PNG.

The original risk-distribution gallery image was replaced with Michael's supplied `survival-risk-groups.png`, a four-panel Kaplan–Meier comparison of predicted risk groups, preserved as the original PNG.

## Endometrial biopsy adaptation

Michael supplied the project description and `endometrial-biopsy-annotations.png`. His contribution was supervised fine-tuning of an existing tumor-annotation model on additional pathologist-annotated biopsy slides, followed by threshold selection to improve agreement with the annotations. The image compares four threshold settings on one slide; green marks pathologist-annotated tumor, red marks another cell type, and blue outlines model-predicted tumor. No numerical performance gain, final threshold, or specific biopsy collection method was supplied.

The linked background study is Darbandsari et al., [AI-based histopathology image analysis reveals a distinct subset of endometrial cancers](https://www.nature.com/articles/s41467-024-49017-2), *Nature Communications* 15, 4973 (2024). It provides context for the p53abn-like NSMP subgroup; the portfolio describes Michael's contribution as follow-on biopsy adaptation and does not attribute the original discovery or paper authorship to him.

## Earlier software and OCT work

The primary source for the project descriptions and most screenshots is Michael's [Software Skills presentation](https://docs.google.com/presentation/d/1YGw2yhoKaz131XMtpG0gYeRQHZ6BALhaVfNIWY5X0ys/edit). Its later slides describe the retinal OCT classification experiments, model comparisons, evaluation, and Grad-CAM visualizations.

| Entry | Images used | Additional supplied references |
| --- | --- | --- |
| Presentations | `presentations.png`, replacement gameplay screenshot supplied by Michael | [Project album](https://imgur.com/a/presentations-Q7Iau9Y) |
| Pixel Tower Defense | `pixel-td-title.png`, title-screen screenshot supplied by Michael; `pixel-td-prototype.webp` and `pixel-td-upgrades.webp` from the presentation | [Development album](https://imgur.com/a/pixel-td-progress-Ye8kb) |
| Expand Land | `expand-land.png` and `expand-land-play.png`, replacement gameplay screenshots supplied by Michael; `expand-land-retry.webp` from the presentation | [Game album](https://imgur.com/a/expand-land-6LUE2BU) |
| Stafits | `stafits.png` supplied by Michael from the archived website; `stafits-mobile.webp` and `stafits-travel.webp` from the presentation | [Website album](https://imgur.com/a/stafits-landing-page-iw99UJw), [travel app album](https://imgur.com/a/stafits-travel-app-uVylnpl), [2018 website archive](https://web.archive.org/web/20181215100555/https://www.stafits.com/) |
| Upropos | `upropos.webp` from Michael's attached landing-page screenshot | [Project album](https://imgur.com/a/XUpQi46), [prototype video](https://www.youtube.com/watch?v=hCCjlpMD9Lw) |
| RuneScape automation | `simba-runescape.webp` from Michael's attached OSRS image | The presentation identifies the automation image as illustrative, not an example of Michael's own scripts. |
| Retinal OCT classification | `retinal-oct.webp`, `oct-gradcam.webp` from the presentation | [Kermany et al. dataset](https://data.mendeley.com/datasets/rscbjbr9sj/3), credited in the source presentation |

Game release dates are approximate (Google Play, circa 2017), as supplied by Michael. OCT accuracies are reported as results from the original project evaluation, without asserting clinical validation. The archive and video are retained as reader resources; their contents were not used to add unsupported claims.

## Websites and research community

| Entry | Role source | Image source |
| --- | --- | --- |
| AIM Lab website | Michael stated that he built and maintains the site. | `aim-lab.png`: Michael's replacement screenshot of [aimlab.ca](https://aimlab.ca/), supplied October 2026. |
| PLM Coach | Michael served as volunteer VP Technology Admin for about three years. He clarified that he is less active in the program but still manages its website. | `plm-coach.png`: Michael's replacement screenshot of [plmcoach.ca](https://www.plmcoach.ca/), supplied October 2026. |
| UBC-OCEAN | Michael described helping organize and relay information to competitors. | `ubc-ocean.webp`: header image from the [Kaggle competition](https://www.kaggle.com/competitions/UBC-OCEAN). |

Website descriptions use the public pages for context and Michael's account for his responsibilities. The competition entry describes coordination and communication, without attributing competitors' models to Michael.

## Placeholders

Nostalgia Desktop, Emergent Garden, and Further Down, Still retain placeholder descriptions and illustrative banners, explicitly identified on their pages. See [artwork notes](artwork.md) for provenance and the original generation prompts.
