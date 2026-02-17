"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useContent } from "@/lib/content-provider";
import { Section, AnimatedDiv } from "@/components/ui";
import { IconArrowRight } from "@/components/icons";

const CASE_STUDY_SECTIONS = [
  { key: "problem", label: "Problem", icon: "?" },
  { key: "approach", label: "Approach", icon: ">" },
  { key: "data", label: "Data Sources", icon: "D" },
  { key: "methods", label: "Methods & Tools", icon: "M" },
  { key: "results", label: "Results", icon: "R" },
  { key: "learnings", label: "Key Learnings", icon: "L" },
] as const;

export default function ProjectDetailPage() {
  const params = useParams();
  const { content, isLoading } = useContent();
  const projectId = params?.id as string;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const project = content.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
        <h1 className="font-display text-2xl text-surface-900 dark:text-white">
          Project Not Found
        </h1>
        <Link href="/projects" className="btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <div className="pt-16">
      <Section>
        {/* Breadcrumb */}
        <AnimatedDiv>
          <div className="flex items-center gap-2 text-sm text-surface-400 mb-8">
            <Link href="/projects" className="hover:text-brand-500 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-surface-600 dark:text-surface-300">
              {project.title}
            </span>
          </div>
        </AnimatedDiv>

        {/* Header */}
        <AnimatedDiv delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="tag tag-brand">{project.category}</span>
            <span className="text-sm text-surface-400 font-mono">{project.year}</span>
            {project.featured && (
              <span className="tag bg-accent-gold/10 text-accent-gold">Featured</span>
            )}
            {project.isGenAI && (
              <span className="tag bg-purple-100 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400">
                GenAI
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-surface-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl leading-relaxed mb-6">
            {project.summary}
          </p>
        </AnimatedDiv>

        {/* Tags & Tools */}
        <AnimatedDiv delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <span className="text-xs uppercase tracking-wider text-surface-400 font-semibold">
              Tools:
            </span>
            {project.tools.map((t) => (
              <span key={t} className="tag tag-brand">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-wider text-surface-400 font-semibold">
              Metrics:
            </span>
            {project.metrics.map((m) => (
              <span key={m} className="text-sm font-mono text-brand-600 dark:text-brand-400">
                {m}
              </span>
            ))}
          </div>
        </AnimatedDiv>

        {/* Embed */}
        {project.embed && project.embed.url && (
          <AnimatedDiv delay={0.25} className="mt-10">
            <div className="card p-0 overflow-hidden">
              <iframe
                src={project.embed.url}
                className="w-full h-[500px] md:h-[600px]"
                frameBorder="0"
                allowFullScreen
                title={project.title}
              />
            </div>
          </AnimatedDiv>
        )}

        {project.embed && !project.embed.url && (
          <AnimatedDiv delay={0.25} className="mt-10">
            <div className="card text-center py-12 text-surface-500 dark:text-surface-400">
              <p className="text-sm">{project.embed.fallbackText}</p>
            </div>
          </AnimatedDiv>
        )}

        {/* Case Study */}
        <div className="mt-16">
          <AnimatedDiv>
            <h2 className="font-display text-2xl text-surface-900 dark:text-white mb-8">
              Case Study
            </h2>
          </AnimatedDiv>
          <div className="grid gap-6">
            {CASE_STUDY_SECTIONS.map(({ key, label, icon }, i) => (
              <AnimatedDiv key={key} delay={0.1 * i}>
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-400/10 flex items-center justify-center text-brand-600 dark:text-brand-400 font-mono text-sm font-bold shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 font-semibold mb-2">
                        {label}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {cs[key]}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        {/* External Links */}
        {Object.keys(project.links).length > 0 && (
          <AnimatedDiv delay={0.5} className="mt-10">
            <h3 className="text-xs uppercase tracking-wider text-surface-400 font-semibold mb-3">
              Links
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(project.links).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  {label} <IconArrowRight size={14} />
                </a>
              ))}
            </div>
          </AnimatedDiv>
        )}

        {/* Nav */}
        <AnimatedDiv delay={0.6} className="mt-16 pt-8 border-t border-surface-200 dark:border-surface-800">
          <Link href="/projects" className="btn-ghost">
            &larr; Back to Projects
          </Link>
        </AnimatedDiv>
      </Section>
    </div>
  );
}
