export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  featured?: boolean;
  content: string[];
};

export function getBlogBySlug(slug: string, catalog: BlogPost[]) {
  return catalog.find((post) => post.slug === slug);
}
