export type JobPosting = {
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
};

export function getJobBySlug(slug: string, catalog: JobPosting[]) {
  return catalog.find((job) => job.slug === slug);
}
