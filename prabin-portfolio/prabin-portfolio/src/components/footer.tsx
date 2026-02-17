"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content-provider";
import { IconLinkedin, IconGithub, IconMail } from "@/components/icons";

export default function Footer() {
  const pathname = usePathname();
  const { content } = useContent();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-xl text-surface-900 dark:text-white">
              {content.siteSettings.name.split(" ")[0]}
              <span className="text-brand-600 dark:text-brand-400">.</span>
            </Link>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
              {content.siteSettings.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {content.contact.social.linkedin && (
                <a
                  href={content.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <IconLinkedin size={18} />
                </a>
              )}
              {content.contact.social.github && (
                <a
                  href={content.contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  aria-label="GitHub"
                >
                  <IconGithub size={18} />
                </a>
              )}
              <a
                href={`mailto:${content.contact.email}`}
                className="p-2 rounded-lg text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                aria-label="Email"
              >
                <IconMail size={18} />
              </a>
            </div>
            <p className="mt-3 text-sm text-surface-500 dark:text-surface-400">
              {content.contact.email}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-200 dark:border-surface-800 text-center text-xs text-surface-400 dark:text-surface-500">
          &copy; {new Date().getFullYear()} {content.siteSettings.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
