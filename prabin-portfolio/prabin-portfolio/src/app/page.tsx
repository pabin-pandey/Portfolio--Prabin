"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/lib/content-provider";
import {
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  AnimatedDiv,
  Counter,
} from "@/components/ui";
import {
  IconArrowRight,
  IconDownload,
  IconArrowUpRight,
  IconQuote,
} from "@/components/icons";
import { cn } from "@/lib/utils";

function RoleTypewriter({ roles }: { roles: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    const speed = deleting ? 30 : 60;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIdx((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, idx, roles]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HomePage() {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { hero, projects, testimonials, about } = content;
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <AnimatedDiv>
            <span className="inline-block text-sm font-mono text-surface-500 dark:text-surface-400 mb-6">
              {hero.greeting}
            </span>
          </AnimatedDiv>

          <AnimatedDiv delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-surface-900 dark:text-white mb-4 leading-[1.1]">
              {hero.name}
            </h1>
          </AnimatedDiv>

          <AnimatedDiv delay={0.2}>
            <div className="text-2xl sm:text-3xl font-display mb-8 h-12">
              <RoleTypewriter roles={hero.roles} />
            </div>
          </AnimatedDiv>

          <AnimatedDiv delay={0.3}>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mb-10 leading-relaxed">
              {hero.description}
            </p>
          </AnimatedDiv>

          <AnimatedDiv delay={0.4}>
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/projects" className="btn-primary">
                {hero.ctaPrimary} <IconArrowRight size={16} />
              </Link>
              <a href={content.resume.filePath} className="btn-secondary" download>
                <IconDownload size={16} /> {hero.ctaSecondary}
              </a>
            </div>
          </AnimatedDiv>

          <AnimatedDiv delay={0.5}>
            <div className="flex flex-wrap gap-8 md:gap-12">
              {hero.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-display text-surface-900 dark:text-white">
                    <Counter target={stat.value} />
                    {stat.value.includes("+") && <span>+</span>}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* Featured Projects */}
      <Section className="bg-surface-50 dark:bg-surface-900/30">
        <AnimatedDiv>
          <SectionLabel>Featured Work</SectionLabel>
          <SectionTitle>Selected Projects</SectionTitle>
          <SectionDescription>
            From financial modeling to AI prototypes — here&apos;s what I&apos;ve been building.
          </SectionDescription>
        </AnimatedDiv>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {featured.map((project, i) => (
            <AnimatedDiv key={project.id} delay={0.1 * i}>
              <Link href={`/projects/${project.id}`}>
                <div className="card card-hover h-full group cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="tag tag-brand">{project.category}</span>
                    <span className="text-xs text-surface-400">{project.year}</span>
                  </div>
                  <h3 className="font-display text-lg text-surface-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.map((t) => (
                      <span key={t} className="tag text-[10px]">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-brand-600 dark:text-brand-400 font-medium group-hover:gap-2 transition-all">
                    View Case Study <IconArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimatedDiv>
          ))}
        </div>

        <AnimatedDiv delay={0.4} className="mt-8 text-center">
          <Link href="/projects" className="btn-ghost">
            All Projects <IconArrowRight size={16} />
          </Link>
        </AnimatedDiv>
      </Section>

      {/* Skills snapshot */}
      <Section>
        <AnimatedDiv>
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>Technical Toolkit</SectionTitle>
        </AnimatedDiv>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
          {about.skills.map((skill, i) => (
            <AnimatedDiv key={skill.name} delay={0.05 * i}>
              <SkillCard name={skill.name} category={skill.category} level={skill.level} />
            </AnimatedDiv>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section className="bg-surface-50 dark:bg-surface-900/30">
          <AnimatedDiv>
            <SectionLabel>Testimonials</SectionLabel>
            <SectionTitle>What People Say</SectionTitle>
          </AnimatedDiv>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {testimonials.map((t, i) => (
              <AnimatedDiv key={i} delay={0.1 * i}>
                <div className="card relative">
                  <div className="absolute top-4 right-4">
                    <IconQuote size={40} />
                  </div>
                  <p className="text-surface-700 dark:text-surface-300 italic mb-6 text-lg leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-surface-900 dark:text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-surface-500">{t.role}</div>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <AnimatedDiv className="text-center">
          <SectionTitle className="text-center">
            Let&apos;s Build Something Together
          </SectionTitle>
          <p className="text-surface-600 dark:text-surface-400 max-w-lg mx-auto mb-8">
            {content.contact.formMessage}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get In Touch <IconArrowRight size={16} />
            </Link>
            <a href={content.resume.filePath} className="btn-secondary" download>
              <IconDownload size={16} /> Resume
            </a>
          </div>
        </AnimatedDiv>
      </Section>
    </>
  );
}

function SkillCard({
  name,
  category,
  level,
}: {
  name: string;
  category: string;
  level: number;
}) {
  const [ref, visible] = React.useMemo(() => [null, true], []);

  return (
    <div className="card p-4 text-center group hover:border-brand-300 dark:hover:border-brand-600/40 transition-all duration-300">
      <div className="text-sm font-semibold text-surface-900 dark:text-white mb-1">
        {name}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-surface-400 mb-3">
        {category}
      </div>
      <div className="w-full h-1.5 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-emerald skill-bar"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
