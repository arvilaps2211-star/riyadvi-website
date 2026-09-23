import { blogPosts, getBlogPost } from "@/data/blog";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter(
      (item) =>
        item.slug !== post.slug &&
        (item.category === post.category ||
          item.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        actions={
          <Button href="/blog" variant="outline">
            Back to Blog
          </Button>
        }
      />

      <section className="border-b border-border bg-surface py-10">
        <Container>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>By {post.author}</span>
          </div>
          <div className="mt-6 aspect-[21/9] border border-border bg-[linear-gradient(135deg,rgba(212,175,55,0.1),transparent_50%)]" />
        </Container>
      </section>

      <article className="bg-background py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-5">
            {post.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-semibold text-white">Related Articles</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <article className="flex h-full flex-col border border-border bg-[#0a0a0a] p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-gold">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="mt-4 text-sm font-semibold text-gold"
                    >
                      Read article →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <PageCta
        title="Want these ideas applied to your roadmap?"
        description="Book a consultation with the Riyadvi team."
      />
    </>
  );
}
