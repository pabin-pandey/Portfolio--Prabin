"use client";

import React, { useState } from "react";
import { useContent } from "@/lib/content-provider";
import { Section, SectionLabel, SectionTitle, AnimatedDiv } from "@/components/ui";
import { IconMail, IconPhone, IconMapPin, IconLinkedin, IconGithub, IconArrowRight } from "@/components/icons";

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 shrink-0">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wider text-surface-400 mb-0.5">{label}</div>
        <div className="text-surface-900 dark:text-white font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : <div>{inner}</div>;
}

export default function ContactPage() {
  const { content, isLoading } = useContent();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-16"><div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const { contact } = content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="pt-16">
      <Section>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <AnimatedDiv>
              <SectionLabel>Contact</SectionLabel>
              <SectionTitle>Get In Touch</SectionTitle>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed mt-4 mb-10">{contact.formMessage}</p>
            </AnimatedDiv>
            <AnimatedDiv delay={0.1}>
              <div className="space-y-6">
                <ContactItem icon={<IconMail size={20} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <ContactItem icon={<IconPhone size={20} />} label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
                <ContactItem icon={<IconMapPin size={20} />} label="Location" value={contact.location} />
              </div>
            </AnimatedDiv>
            <AnimatedDiv delay={0.2} className="mt-10">
              <h3 className="text-xs uppercase tracking-wider text-surface-400 font-semibold mb-4">Social</h3>
              <div className="flex gap-3">
                {contact.social.linkedin && (
                  <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 card card-hover" aria-label="LinkedIn"><IconLinkedin size={22} /></a>
                )}
                {contact.social.github && (
                  <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="p-3 card card-hover" aria-label="GitHub"><IconGithub size={22} /></a>
                )}
              </div>
            </AnimatedDiv>
          </div>

          <AnimatedDiv delay={0.2}>
            <div className="card">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">&#10003;</div>
                  <h3 className="font-display text-xl text-surface-900 dark:text-white mb-2">Message Ready!</h3>
                  <p className="text-sm text-surface-500">Your email client should have opened. If not, email me directly at {contact.email}</p>
                  <button onClick={() => setSent(false)} className="btn-ghost mt-4">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-2">Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-2">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-2">Message</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="Your message..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message <IconArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </AnimatedDiv>
        </div>
      </Section>
    </div>
  );
}
