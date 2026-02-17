"use client";

import React from "react";
import { useContent } from "@/lib/content-provider";
import {
  Section,
  SectionLabel,
  SectionTitle,
  AnimatedDiv,
} from "@/components/ui";
import { IconGrad, IconBriefcase } from "@/components/icons";

export default function AboutPage() {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { about } = content;

  return (
    <div className="pt-16">
      {/* Bio */}
      <Section>
        <AnimatedDiv>
          <SectionLabel>About Me</SectionLabel>
          <SectionTitle>Background & Story</SectionTitle>
        </AnimatedDiv>
        <AnimatedDiv delay={0.1}>
          <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed max-w-3xl mt-6">
            {about.bio}
          </p>
        </AnimatedDiv>

        {about.now && (
          <AnimatedDiv delay={0.2} className="mt-8">
            <div className="card border-l-4 border-l-brand-500 max-w-3xl">
              <h3 className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 font-semibold mb-2">
                What I&apos;m Doing Now
              </h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                {about.now}
              </p>
            </div>
          </AnimatedDiv>
        )}
      </Section>

      {/* Education */}
      <Section className="bg-surface-50 dark:bg-surface-900/30">
        <AnimatedDiv>
          <SectionLabel>Education</SectionLabel>
          <SectionTitle>Academic Foundation</SectionTitle>
        </AnimatedDiv>
        <div className="mt-10 space-y-6">
          {about.education.map((edu, i) => (
            <AnimatedDiv key={i} delay={0.1 * i}>
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 shrink-0">
                    <IconGrad size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-display text-lg text-surface-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono text-surface-400">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                      {edu.school}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="tag tag-brand">GPA: {edu.gpa}</span>
                      {edu.highlight && (
                        <span className="tag bg-accent-gold/10 text-accent-gold">
                          {edu.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section>
        <AnimatedDiv>
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>Professional Journey</SectionTitle>
        </AnimatedDiv>
        <div className="mt-10 space-y-6">
          {about.experience.map((exp, i) => (
            <AnimatedDiv key={i} delay={0.1 * i}>
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 shrink-0">
                    <IconBriefcase size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-display text-lg text-surface-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-surface-400">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mb-3">
                      {exp.company}
                    </p>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-surface-600 dark:text-surface-400 flex gap-2"
                        >
                          <span className="text-brand-500 mt-1.5 shrink-0">
                            &bull;
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section className="bg-surface-50 dark:bg-surface-900/30">
        <AnimatedDiv>
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>Technical Proficiency</SectionTitle>
        </AnimatedDiv>
        <div className="mt-10 grid gap-4 max-w-3xl">
          {about.skills.map((skill, i) => (
            <AnimatedDiv key={skill.name} delay={0.05 * i}>
              <SkillBar name={skill.name} category={skill.category} level={skill.level} />
            </AnimatedDiv>
          ))}
        </div>

        {about.certifications.length > 0 && (
          <AnimatedDiv delay={0.3} className="mt-10">
            <h3 className="text-xs uppercase tracking-wider text-surface-400 font-semibold mb-3">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {about.certifications.map((cert, i) => (
                <span key={i} className="tag tag-brand text-sm px-4 py-2">
                  {cert}
                </span>
              ))}
            </div>
          </AnimatedDiv>
        )}
      </Section>
    </div>
  );
}

function SkillBar({
  name,
  category,
  level,
}: {
  name: string;
  category: string;
  level: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 shrink-0">
        <div className="text-sm font-semibold text-surface-900 dark:text-white">
          {name}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-surface-400">
          {category}
        </div>
      </div>
      <div className="flex-1 h-2 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-emerald skill-bar"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs font-mono text-surface-400 w-8 text-right">
        {level}%
      </span>
    </div>
  );
}
