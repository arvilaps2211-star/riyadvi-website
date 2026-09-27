"use client";

import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { useMemo, useState } from "react";

export function BlogListing() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="block w-full max-w-md">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, tags…"
            className="w-full border border-border bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                category === item
                  ? "border-border-gold bg-gold/10 text-gold"
                  : "border-border text-muted hover:border-border-gold hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No articles match your filters.</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {filtered.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-gold">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-gold">
                  <span>{post.category}</span>
                  <span className="text-border">·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-2 py-0.5 text-[0.65rem] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-gold hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
