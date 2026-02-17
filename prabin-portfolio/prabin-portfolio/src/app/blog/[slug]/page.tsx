"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useContent } from "@/lib/content-provider";
import { Section, AnimatedDiv } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage() {
  const params = useParams();
  const { content, isLoading } = useContent();
  const slug = params?.slug as string;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const post = content.blog.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
        <h1 className="font-display text-2xl text-surface-900 dark:text-white">
          Post Not Found
        </h1>
        <Link href="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Section>
        <AnimatedDiv>
          <div className="flex items-center gap-2 text-sm text-surface-400 mb-8">
            <Link href="/blog" className="hover:text-brand-500 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-surface-600 dark:text-surface-300 truncate">
              {post.title}
            </span>
          </div>
        </AnimatedDiv>

        <article className="max-w-3xl">
          <AnimatedDiv delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-mono text-surface-400">
                {formatDate(post.date)}
              </span>
              {post.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-surface-900 dark:text-white mb-8">
              {post.title}
            </h1>
          </AnimatedDiv>

          <AnimatedDiv delay={0.2}>
            <div className="prose dark:prose-invert prose-lg max-w-none text-surface-700 dark:text-surface-300 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </AnimatedDiv>

          <AnimatedDiv delay={0.3} className="mt-16 pt-8 border-t border-surface-200 dark:border-surface-800">
            <Link href="/blog" className="btn-ghost">
              &larr; Back to Blog
            </Link>
          </AnimatedDiv>
        </article>
      </Section>
    </div>
  );
}
