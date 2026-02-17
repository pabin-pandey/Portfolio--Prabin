"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/lib/content-provider";
import {
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  AnimatedDiv,
} from "@/components/ui";
import { IconArrowUpRight } from "@/components/icons";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const posts = content.blog.filter((p) => p.published);

  return (
    <div className="pt-16">
      <Section>
        <AnimatedDiv>
          <SectionLabel>Blog</SectionLabel>
          <SectionTitle>Thoughts & Insights</SectionTitle>
          <SectionDescription>
            Writing about finance, data, and technology.
          </SectionDescription>
        </AnimatedDiv>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-surface-500 dark:text-surface-400">
            No blog posts yet. Check back soon!
          </div>
        ) : (
          <div className="mt-10 grid gap-6 max-w-3xl">
            {posts.map((post, i) => (
              <AnimatedDiv key={post.id} delay={0.1 * i}>
                <Link href={`/blog/${post.id}`}>
                  <div className="card card-hover group cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-surface-400">
                        {formatDate(post.date)}
                      </span>
                      {post.tags.map((t) => (
                        <span key={t} className="tag text-[10px]">{t}</span>
                      ))}
                    </div>
                    <h3 className="font-display text-xl text-surface-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-brand-600 dark:text-brand-400 font-medium gap-1 group-hover:gap-2 transition-all">
                      Read More <IconArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </AnimatedDiv>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
