"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/lib/content-provider";
import {
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  AnimatedDiv,
} from "@/components/ui";
import { IconSearch, IconArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const { content, isLoading } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(content.projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [content.projects]);

  const filtered = useMemo(() => {
    return content.projects.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.tools.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [content.projects, category, search]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Section>
        <AnimatedDiv>
          <SectionLabel>Projects</SectionLabel>
          <SectionTitle>All Projects</SectionTitle>
          <SectionDescription>
            Explore my work across financial modeling, data visualization, and AI.
          </SectionDescription>
        </AnimatedDiv>

        {/* Search & Filter */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <IconSearch
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg font-medium transition-all",
                  category === cat
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                    : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <AnimatedDiv key={project.id} delay={0.05 * i}>
              <Link href={`/projects/${project.id}`}>
                <div className="card card-hover h-full group cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="tag tag-brand">{project.category}</span>
                    <span className="text-xs text-surface-400">{project.year}</span>
                    {project.featured && (
                      <span className="tag bg-accent-gold/10 text-accent-gold text-[10px]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg text-surface-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.map((t) => (
                      <span key={t} className="tag text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.metrics.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="text-[10px] text-surface-500 dark:text-surface-400 font-mono"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-brand-600 dark:text-brand-400 font-medium gap-1 group-hover:gap-2 transition-all">
                    View Case Study <IconArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimatedDiv>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-surface-500 dark:text-surface-400">
            No projects found matching your criteria.
          </div>
        )}
      </Section>
    </div>
  );
}
