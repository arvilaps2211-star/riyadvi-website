import { blogPosts, featuredBlogPost } from "@/data/blog";
import { BlogListing } from "@/components/blog/BlogListing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on digital transformation, software, design, and technology from Riyadvi Software Technologies.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas for Digital Growth"
        description="Practical perspectives on software, design, strategy, and immersive technology for growing businesses."
      />

      <section className="border-b border-border bg-surface py-12 sm:py-14">
        <Container>
          <article className="grid gap-6 border border-border-gold/30 bg-[#0a0a0a] p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Featured
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                {featuredBlogPost.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {featuredBlogPost.excerpt}
              </p>
              <div className="mt-6">
                <Button href={`/blog/${featuredBlogPost.slug}`} variant="primary">
                  Read Featured Article
                </Button>
              </div>
            </div>
            <div className="aspect-[16/10] border border-border bg-[linear-gradient(145deg,rgba(212,175,55,0.12),transparent_55%)] lg:aspect-auto lg:min-h-[220px]" />
          </article>
        </Container>
      </section>

      <section className="bg-background py-14 sm:py-16">
        <Container>
          <BlogListing />
          <p className="mt-8 text-xs text-muted">
            Showing insights from {blogPosts.length} published articles.{" "}
            <Link href="/contact" className="text-gold hover:text-[#e0bc4a]">
              Suggest a topic
            </Link>
          </p>
        </Container>
      </section>

      <PageCta
        title="Ready to apply these ideas to your business?"
        description="Talk with Riyadvi about your next digital initiative."
      />
    </>
  );
}
