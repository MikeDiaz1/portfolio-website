import { error } from '@sveltejs/kit';
import { getProject, projects } from '#lib/data/projects.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  const project = getProject(params.slug);
  if (!project) error(404, { message: 'This project could not be found.' });
  const index = projects.findIndex((item) => item.slug === project.slug);
  return { project, nextProject: projects[(index + 1) % projects.length] };
};
