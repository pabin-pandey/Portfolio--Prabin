"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useContent } from "@/lib/content-provider";
import { SiteContent, Project, BlogPost, Testimonial, Education, Experience, Skill } from "@/types/content";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import { IconSave, IconDownload, IconUpload, IconRefresh, IconPlus, IconTrash, IconEdit, IconChevronUp, IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

const TABS = [
  "Site Settings", "SEO", "Hero", "About", "Education", "Experience",
  "Skills", "Projects", "Blog", "Testimonials", "Contact", "Resume"
] as const;

type TabName = (typeof TABS)[number];

export default function AdminPage() {
  const { content, saveDraft, resetToDefault } = useContent();
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<TabName>("Site Settings");
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setDraft(content); }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "prabin2026";
    if (passcode === expected) { setAuthed(true); setError(""); }
    else setError("Invalid passcode");
  };

  const save = useCallback(() => {
    saveDraft(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [draft, saveDraft]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "content.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as SiteContent;
        if (data.siteSettings && data.hero) { setDraft(data); saveDraft(data); alert("Content imported!"); }
        else alert("Invalid content.json format");
      } catch { alert("Failed to parse JSON"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) { resetToDefault(); setDraft(DEFAULT_CONTENT); }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
        <form onSubmit={handleLogin} className="card max-w-sm w-full p-8">
          <h1 className="font-display text-2xl text-surface-900 dark:text-white mb-2 text-center">Admin Panel</h1>
          <p className="text-sm text-surface-500 text-center mb-6">Enter passcode to continue</p>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="input-field mb-4" placeholder="Passcode" autoFocus />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="btn-primary w-full justify-center">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <h1 className="font-display text-lg text-surface-900 dark:text-white">Admin Panel</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={save} className={cn("btn-primary text-xs px-4 py-2", saved && "bg-green-600 hover:bg-green-700")}>
              <IconSave size={14} /> {saved ? "Saved!" : "Save Draft"}
            </button>
            <button onClick={exportJSON} className="btn-secondary text-xs px-4 py-2"><IconDownload size={14} /> Export</button>
            <label className="btn-secondary text-xs px-4 py-2 cursor-pointer"><IconUpload size={14} /> Import<input type="file" accept=".json" onChange={importJSON} className="hidden" /></label>
            <button onClick={handleReset} className="btn-ghost text-xs text-red-500 hover:text-red-600"><IconRefresh size={14} /> Reset</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-0 md:gap-6 p-4">
        {/* Sidebar tabs */}
        <div className="hidden md:block w-48 shrink-0">
          <div className="sticky top-20 space-y-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-all", tab === t ? "bg-brand-600 text-white font-medium" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")}>{t}</button>
            ))}
          </div>
        </div>
        {/* Mobile tabs */}
        <div className="md:hidden mb-4 w-full overflow-x-auto">
          <div className="flex gap-1 pb-2">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("px-3 py-1.5 text-xs rounded-lg whitespace-nowrap", tab === t ? "bg-brand-600 text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-500")}>{t}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="card">
            {tab === "Site Settings" && <SiteSettingsEditor draft={draft} setDraft={setDraft} />}
            {tab === "SEO" && <SEOEditor draft={draft} setDraft={setDraft} />}
            {tab === "Hero" && <HeroEditor draft={draft} setDraft={setDraft} />}
            {tab === "About" && <AboutEditor draft={draft} setDraft={setDraft} />}
            {tab === "Education" && <EducationEditor draft={draft} setDraft={setDraft} />}
            {tab === "Experience" && <ExperienceEditor draft={draft} setDraft={setDraft} />}
            {tab === "Skills" && <SkillsEditor draft={draft} setDraft={setDraft} />}
            {tab === "Projects" && <ProjectsEditor draft={draft} setDraft={setDraft} />}
            {tab === "Blog" && <BlogEditor draft={draft} setDraft={setDraft} />}
            {tab === "Testimonials" && <TestimonialsEditor draft={draft} setDraft={setDraft} />}
            {tab === "Contact" && <ContactEditor draft={draft} setDraft={setDraft} />}
            {tab === "Resume" && <ResumeEditor draft={draft} setDraft={setDraft} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Shared ---
interface EditorProps { draft: SiteContent; setDraft: React.Dispatch<React.SetStateAction<SiteContent>>; }

function Field({ label, value, onChange, type = "text", rows, placeholder, help }: { label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number; placeholder?: string; help?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-1.5">{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="input-field resize-y" placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-field" placeholder={placeholder} />
      )}
      {help && <p className="text-xs text-surface-400 mt-1">{help}</p>}
    </div>
  );
}

function FieldNumber({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="mb-4">
      <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-1.5">{label}</label>
      <input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} className="input-field" />
    </div>
  );
}

function FieldCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 mb-4 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
      <span className="text-sm text-surface-700 dark:text-surface-300">{label}</span>
    </label>
  );
}

function ArrayEditor<T>({ items, renderItem, onAdd, onRemove, onMove, addLabel }: { items: T[]; renderItem: (item: T, index: number, update: (val: T) => void) => React.ReactNode; onAdd: () => void; onRemove: (index: number) => void; onMove: (from: number, to: number) => void; addLabel: string }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            {i > 0 && <button onClick={() => onMove(i, i - 1)} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronUp size={14} /></button>}
            {i < items.length - 1 && <button onClick={() => onMove(i, i + 1)} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronDown size={14} /></button>}
            <button onClick={() => { if (confirm("Delete this item?")) onRemove(i); }} className="p-1 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
          </div>
          {renderItem(item, i, (val) => {
            const copy = [...items];
            copy[i] = val;
            // This is handled by the parent
          })}
        </div>
      ))}
      <button onClick={onAdd} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3"><IconPlus size={14} /> {addLabel}</button>
    </div>
  );
}

// Helper for updating nested items in arrays
function updateArr<T>(arr: T[], idx: number, val: T): T[] {
  const copy = [...arr]; copy[idx] = val; return copy;
}
function removeArr<T>(arr: T[], idx: number): T[] {
  return arr.filter((_, i) => i !== idx);
}
function moveArr<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr]; const [item] = copy.splice(from, 1); copy.splice(to, 0, item); return copy;
}

// --- Tab Editors ---

function SiteSettingsEditor({ draft, setDraft }: EditorProps) {
  const s = draft.siteSettings;
  const u = (key: keyof typeof s, val: string) => setDraft({ ...draft, siteSettings: { ...s, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Site Settings</h2>
      <Field label="Name" value={s.name} onChange={(v) => u("name", v)} />
      <Field label="Domain" value={s.domain} onChange={(v) => u("domain", v)} />
      <Field label="Tagline" value={s.tagline} onChange={(v) => u("tagline", v)} />
    </div>
  );
}

function SEOEditor({ draft, setDraft }: EditorProps) {
  const s = draft.seo;
  const u = (key: keyof typeof s, val: string) => setDraft({ ...draft, seo: { ...s, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">SEO</h2>
      <Field label="Meta Title" value={s.metaTitle} onChange={(v) => u("metaTitle", v)} />
      <Field label="Meta Description" value={s.metaDescription} onChange={(v) => u("metaDescription", v)} rows={3} />
      <Field label="Keywords" value={s.keywords} onChange={(v) => u("keywords", v)} help="Comma-separated" />
    </div>
  );
}

function HeroEditor({ draft, setDraft }: EditorProps) {
  const h = draft.hero;
  const u = (key: string, val: any) => setDraft({ ...draft, hero: { ...h, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Hero Section</h2>
      <Field label="Greeting" value={h.greeting} onChange={(v) => u("greeting", v)} />
      <Field label="Name" value={h.name} onChange={(v) => u("name", v)} />
      <Field label="Roles (comma-separated)" value={h.roles.join(", ")} onChange={(v) => u("roles", v.split(",").map(s => s.trim()).filter(Boolean))} />
      <Field label="Description" value={h.description} onChange={(v) => u("description", v)} rows={3} />
      <Field label="Primary CTA" value={h.ctaPrimary} onChange={(v) => u("ctaPrimary", v)} />
      <Field label="Secondary CTA" value={h.ctaSecondary} onChange={(v) => u("ctaSecondary", v)} />
      <h3 className="text-sm font-semibold text-surface-600 dark:text-surface-300 mt-6 mb-3">Stats</h3>
      {h.stats.map((stat, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <input value={stat.label} onChange={(e) => { const stats = [...h.stats]; stats[i] = { ...stat, label: e.target.value }; u("stats", stats); }} className="input-field flex-1" placeholder="Label" />
          <input value={stat.value} onChange={(e) => { const stats = [...h.stats]; stats[i] = { ...stat, value: e.target.value }; u("stats", stats); }} className="input-field w-24" placeholder="Value" />
          <button onClick={() => u("stats", removeArr(h.stats, i))} className="p-2 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
        </div>
      ))}
      <button onClick={() => u("stats", [...h.stats, { label: "", value: "" }])} className="btn-ghost text-xs"><IconPlus size={14} /> Add Stat</button>
    </div>
  );
}

function AboutEditor({ draft, setDraft }: EditorProps) {
  const a = draft.about;
  const u = (key: string, val: any) => setDraft({ ...draft, about: { ...a, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">About</h2>
      <Field label="Bio" value={a.bio} onChange={(v) => u("bio", v)} rows={5} />
      <Field label="What I'm Doing Now" value={a.now} onChange={(v) => u("now", v)} rows={3} />
      <Field label="Certifications (comma-separated)" value={a.certifications.join(", ")} onChange={(v) => u("certifications", v.split(",").map(s => s.trim()).filter(Boolean))} />
    </div>
  );
}

function EducationEditor({ draft, setDraft }: EditorProps) {
  const items = draft.about.education;
  const setItems = (edu: Education[]) => setDraft({ ...draft, about: { ...draft.about, education: edu } });
  const blank: Education = { school: "", degree: "", period: "", gpa: "", details: "", highlight: "" };
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Education</h2>
      {items.map((edu, i) => (
        <div key={i} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4 mb-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronUp size={14} /></button>}
            {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronDown size={14} /></button>}
            <button onClick={() => { if (confirm("Delete?")) setItems(removeArr(items, i)); }} className="p-1 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
          </div>
          <Field label="School" value={edu.school} onChange={(v) => setItems(updateArr(items, i, { ...edu, school: v }))} />
          <Field label="Degree" value={edu.degree} onChange={(v) => setItems(updateArr(items, i, { ...edu, degree: v }))} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Period" value={edu.period} onChange={(v) => setItems(updateArr(items, i, { ...edu, period: v }))} />
            <Field label="GPA" value={edu.gpa} onChange={(v) => setItems(updateArr(items, i, { ...edu, gpa: v }))} />
          </div>
          <Field label="Details" value={edu.details} onChange={(v) => setItems(updateArr(items, i, { ...edu, details: v }))} rows={2} />
          <Field label="Highlight" value={edu.highlight} onChange={(v) => setItems(updateArr(items, i, { ...edu, highlight: v }))} />
        </div>
      ))}
      <button onClick={() => setItems([...items, blank])} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3"><IconPlus size={14} /> Add Education</button>
    </div>
  );
}

function ExperienceEditor({ draft, setDraft }: EditorProps) {
  const items = draft.about.experience;
  const setItems = (exp: Experience[]) => setDraft({ ...draft, about: { ...draft.about, experience: exp } });
  const blank: Experience = { company: "", role: "", period: "", bullets: [""] };
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Experience</h2>
      {items.map((exp, i) => (
        <div key={i} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4 mb-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronUp size={14} /></button>}
            {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronDown size={14} /></button>}
            <button onClick={() => { if (confirm("Delete?")) setItems(removeArr(items, i)); }} className="p-1 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
          </div>
          <Field label="Company" value={exp.company} onChange={(v) => setItems(updateArr(items, i, { ...exp, company: v }))} />
          <Field label="Role" value={exp.role} onChange={(v) => setItems(updateArr(items, i, { ...exp, role: v }))} />
          <Field label="Period" value={exp.period} onChange={(v) => setItems(updateArr(items, i, { ...exp, period: v }))} />
          <div className="mb-2">
            <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-1.5">Bullet Points</label>
            {exp.bullets.map((b, j) => (
              <div key={j} className="flex gap-2 mb-2">
                <input value={b} onChange={(e) => { const bullets = [...exp.bullets]; bullets[j] = e.target.value; setItems(updateArr(items, i, { ...exp, bullets })); }} className="input-field flex-1" />
                <button onClick={() => { const bullets = exp.bullets.filter((_, k) => k !== j); setItems(updateArr(items, i, { ...exp, bullets })); }} className="p-2 text-red-400 hover:text-red-600"><IconTrash size={12} /></button>
              </div>
            ))}
            <button onClick={() => setItems(updateArr(items, i, { ...exp, bullets: [...exp.bullets, ""] }))} className="btn-ghost text-xs"><IconPlus size={12} /> Add Bullet</button>
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, blank])} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3"><IconPlus size={14} /> Add Experience</button>
    </div>
  );
}

function SkillsEditor({ draft, setDraft }: EditorProps) {
  const items = draft.about.skills;
  const setItems = (skills: Skill[]) => setDraft({ ...draft, about: { ...draft.about, skills } });
  const blank: Skill = { name: "", category: "", level: 50 };
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Skills</h2>
      {items.map((skill, i) => (
        <div key={i} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4 mb-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronUp size={14} /></button>}
            {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronDown size={14} /></button>}
            <button onClick={() => { if (confirm("Delete?")) setItems(removeArr(items, i)); }} className="p-1 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Name" value={skill.name} onChange={(v) => setItems(updateArr(items, i, { ...skill, name: v }))} />
            <Field label="Category" value={skill.category} onChange={(v) => setItems(updateArr(items, i, { ...skill, category: v }))} />
            <FieldNumber label="Level (0-100)" value={skill.level} min={0} max={100} onChange={(v) => setItems(updateArr(items, i, { ...skill, level: v }))} />
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, blank])} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3"><IconPlus size={14} /> Add Skill</button>
    </div>
  );
}

function ProjectsEditor({ draft, setDraft }: EditorProps) {
  const items = draft.projects;
  const setItems = (projects: Project[]) => setDraft({ ...draft, projects });
  const [editing, setEditing] = useState<number | null>(null);

  const blank: Project = {
    id: `project-${Date.now()}`, title: "", category: "", year: new Date().getFullYear().toString(),
    summary: "", tags: [], tools: [], metrics: [], featured: false,
    caseStudy: { problem: "", approach: "", data: "", methods: "", results: "", learnings: "" },
    links: {}, embed: null,
  };

  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Projects</h2>
      {editing !== null ? (
        <ProjectForm
          project={items[editing]}
          onSave={(p) => { setItems(updateArr(items, editing, p)); setEditing(null); }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <>
          {items.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 border border-surface-200 dark:border-surface-700 rounded-xl p-3 mb-2">
              <div className="flex flex-col gap-0.5">
                {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="text-surface-400 hover:text-surface-600"><IconChevronUp size={12} /></button>}
                {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="text-surface-400 hover:text-surface-600"><IconChevronDown size={12} /></button>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{p.title || "Untitled"}</div>
                <div className="text-xs text-surface-400">{p.category} &middot; {p.year} {p.featured ? " ★" : ""}</div>
              </div>
              <button onClick={() => setEditing(i)} className="p-2 text-surface-400 hover:text-brand-500"><IconEdit size={14} /></button>
              <button onClick={() => { if (confirm("Delete project?")) setItems(removeArr(items, i)); }} className="p-2 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
            </div>
          ))}
          <button onClick={() => { setItems([...items, blank]); setEditing(items.length); }} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3 mt-4"><IconPlus size={14} /> Add Project</button>
        </>
      )}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: { project: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [p, setP] = useState<Project>(project);
  const cs = p.caseStudy;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-surface-900 dark:text-white">Edit Project</h3>
        <div className="flex gap-2">
          <button onClick={onCancel} className="btn-ghost text-xs">Cancel</button>
          <button onClick={() => onSave(p)} className="btn-primary text-xs px-4 py-2"><IconSave size={14} /> Save Project</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="ID (slug)" value={p.id} onChange={(v) => setP({ ...p, id: v })} />
        <Field label="Year" value={p.year} onChange={(v) => setP({ ...p, year: v })} />
      </div>
      <Field label="Title" value={p.title} onChange={(v) => setP({ ...p, title: v })} />
      <Field label="Category" value={p.category} onChange={(v) => setP({ ...p, category: v })} />
      <Field label="Summary" value={p.summary} onChange={(v) => setP({ ...p, summary: v })} rows={3} />
      <Field label="Tags (comma-separated)" value={p.tags.join(", ")} onChange={(v) => setP({ ...p, tags: v.split(",").map(s => s.trim()).filter(Boolean) })} />
      <Field label="Tools (comma-separated)" value={p.tools.join(", ")} onChange={(v) => setP({ ...p, tools: v.split(",").map(s => s.trim()).filter(Boolean) })} />
      <Field label="Metrics (comma-separated)" value={p.metrics.join(", ")} onChange={(v) => setP({ ...p, metrics: v.split(",").map(s => s.trim()).filter(Boolean) })} />
      <FieldCheckbox label="Featured" checked={p.featured} onChange={(v) => setP({ ...p, featured: v })} />
      <FieldCheckbox label="GenAI Project" checked={!!p.isGenAI} onChange={(v) => setP({ ...p, isGenAI: v })} />

      {/* Embed */}
      <div className="border border-surface-200 dark:border-surface-700 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">Embed (Power BI / Tableau)</h4>
        <FieldCheckbox label="Has embed" checked={!!p.embed} onChange={(v) => setP({ ...p, embed: v ? { type: "powerbi", url: "", fallbackText: "Embed not configured" } : null })} />
        {p.embed && (
          <>
            <div className="mb-3">
              <label className="block text-xs uppercase tracking-wider text-surface-400 font-semibold mb-1.5">Type</label>
              <select value={p.embed.type} onChange={(e) => setP({ ...p, embed: { ...p.embed!, type: e.target.value as "powerbi" | "tableau" } })} className="input-field">
                <option value="powerbi">Power BI</option>
                <option value="tableau">Tableau</option>
              </select>
            </div>
            <Field label="Embed URL" value={p.embed.url} onChange={(v) => setP({ ...p, embed: { ...p.embed!, url: v } })} placeholder="https://..." />
            <Field label="Fallback Text" value={p.embed.fallbackText} onChange={(v) => setP({ ...p, embed: { ...p.embed!, fallbackText: v } })} />
            <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-3 text-xs text-surface-500 space-y-2 mt-2">
              {p.embed.type === "powerbi" ? (
                <>
                  <p className="font-semibold">How to get Power BI embed URL:</p>
                  <p>1. Open your report in Power BI Service</p>
                  <p>2. File &gt; Embed report &gt; Publish to web</p>
                  <p>3. Copy the iframe src URL (starts with https://app.powerbi.com/view?r=)</p>
                </>
              ) : (
                <>
                  <p className="font-semibold">How to get Tableau embed URL:</p>
                  <p>1. Publish your workbook to Tableau Public</p>
                  <p>2. Click Share on your viz</p>
                  <p>3. Copy the embed code and extract the URL from the src attribute</p>
                  <p>4. URL format: https://public.tableau.com/views/...</p>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Case Study */}
      <div className="border border-surface-200 dark:border-surface-700 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">Case Study</h4>
        <Field label="Problem" value={cs.problem} onChange={(v) => setP({ ...p, caseStudy: { ...cs, problem: v } })} rows={2} />
        <Field label="Approach" value={cs.approach} onChange={(v) => setP({ ...p, caseStudy: { ...cs, approach: v } })} rows={2} />
        <Field label="Data Sources" value={cs.data} onChange={(v) => setP({ ...p, caseStudy: { ...cs, data: v } })} rows={2} />
        <Field label="Methods" value={cs.methods} onChange={(v) => setP({ ...p, caseStudy: { ...cs, methods: v } })} rows={2} />
        <Field label="Results" value={cs.results} onChange={(v) => setP({ ...p, caseStudy: { ...cs, results: v } })} rows={2} />
        <Field label="Key Learnings" value={cs.learnings} onChange={(v) => setP({ ...p, caseStudy: { ...cs, learnings: v } })} rows={2} />
      </div>
    </div>
  );
}

function BlogEditor({ draft, setDraft }: EditorProps) {
  const items = draft.blog;
  const setItems = (blog: BlogPost[]) => setDraft({ ...draft, blog });
  const [editing, setEditing] = useState<number | null>(null);

  const blank: BlogPost = { id: `blog-${Date.now()}`, title: "", date: new Date().toISOString().split("T")[0], excerpt: "", content: "", published: false, tags: [] };

  if (editing !== null) {
    const post = items[editing];
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-surface-900 dark:text-white">Edit Post</h3>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="btn-ghost text-xs">Cancel</button>
            <button onClick={() => setEditing(null)} className="btn-primary text-xs px-4 py-2"><IconSave size={14} /> Done</button>
          </div>
        </div>
        <Field label="ID" value={post.id} onChange={(v) => setItems(updateArr(items, editing, { ...post, id: v }))} />
        <Field label="Title" value={post.title} onChange={(v) => setItems(updateArr(items, editing, { ...post, title: v }))} />
        <Field label="Date" value={post.date} onChange={(v) => setItems(updateArr(items, editing, { ...post, date: v }))} type="date" />
        <Field label="Excerpt" value={post.excerpt} onChange={(v) => setItems(updateArr(items, editing, { ...post, excerpt: v }))} rows={2} />
        <Field label="Content" value={post.content} onChange={(v) => setItems(updateArr(items, editing, { ...post, content: v }))} rows={10} />
        <Field label="Tags (comma-separated)" value={post.tags.join(", ")} onChange={(v) => setItems(updateArr(items, editing, { ...post, tags: v.split(",").map(s => s.trim()).filter(Boolean) }))} />
        <FieldCheckbox label="Published" checked={post.published} onChange={(v) => setItems(updateArr(items, editing, { ...post, published: v }))} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Blog Posts</h2>
      {items.map((p, i) => (
        <div key={p.id} className="flex items-center gap-3 border border-surface-200 dark:border-surface-700 rounded-xl p-3 mb-2">
          <div className="flex flex-col gap-0.5">
            {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="text-surface-400 hover:text-surface-600"><IconChevronUp size={12} /></button>}
            {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="text-surface-400 hover:text-surface-600"><IconChevronDown size={12} /></button>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{p.title || "Untitled"}</div>
            <div className="text-xs text-surface-400">{p.date} {p.published ? "✓ Published" : "Draft"}</div>
          </div>
          <button onClick={() => setEditing(i)} className="p-2 text-surface-400 hover:text-brand-500"><IconEdit size={14} /></button>
          <button onClick={() => { if (confirm("Delete post?")) setItems(removeArr(items, i)); }} className="p-2 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
        </div>
      ))}
      <button onClick={() => { setItems([...items, blank]); setEditing(items.length); }} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3 mt-4"><IconPlus size={14} /> Add Post</button>
    </div>
  );
}

function TestimonialsEditor({ draft, setDraft }: EditorProps) {
  const items = draft.testimonials;
  const setItems = (testimonials: Testimonial[]) => setDraft({ ...draft, testimonials });
  const blank: Testimonial = { name: "", role: "", quote: "" };
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Testimonials</h2>
      {items.map((t, i) => (
        <div key={i} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4 mb-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            {i > 0 && <button onClick={() => setItems(moveArr(items, i, i - 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronUp size={14} /></button>}
            {i < items.length - 1 && <button onClick={() => setItems(moveArr(items, i, i + 1))} className="p-1 text-surface-400 hover:text-surface-600"><IconChevronDown size={14} /></button>}
            <button onClick={() => { if (confirm("Delete?")) setItems(removeArr(items, i)); }} className="p-1 text-red-400 hover:text-red-600"><IconTrash size={14} /></button>
          </div>
          <Field label="Name" value={t.name} onChange={(v) => setItems(updateArr(items, i, { ...t, name: v }))} />
          <Field label="Role" value={t.role} onChange={(v) => setItems(updateArr(items, i, { ...t, role: v }))} />
          <Field label="Quote" value={t.quote} onChange={(v) => setItems(updateArr(items, i, { ...t, quote: v }))} rows={3} />
        </div>
      ))}
      <button onClick={() => setItems([...items, blank])} className="btn-ghost text-sm w-full justify-center border border-dashed border-surface-300 dark:border-surface-600 rounded-xl py-3"><IconPlus size={14} /> Add Testimonial</button>
    </div>
  );
}

function ContactEditor({ draft, setDraft }: EditorProps) {
  const c = draft.contact;
  const u = (key: string, val: any) => setDraft({ ...draft, contact: { ...c, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Contact</h2>
      <Field label="Email" value={c.email} onChange={(v) => u("email", v)} />
      <Field label="Phone" value={c.phone} onChange={(v) => u("phone", v)} />
      <Field label="Location" value={c.location} onChange={(v) => u("location", v)} />
      <Field label="Form Message" value={c.formMessage} onChange={(v) => u("formMessage", v)} rows={2} />
      <h3 className="text-sm font-semibold text-surface-600 dark:text-surface-300 mt-6 mb-3">Social Links</h3>
      <Field label="LinkedIn URL" value={c.social.linkedin || ""} onChange={(v) => u("social", { ...c.social, linkedin: v })} />
      <Field label="GitHub URL" value={c.social.github || ""} onChange={(v) => u("social", { ...c.social, github: v })} />
    </div>
  );
}

function ResumeEditor({ draft, setDraft }: EditorProps) {
  const r = draft.resume;
  const u = (key: string, val: string) => setDraft({ ...draft, resume: { ...r, [key]: val } });
  return (
    <div>
      <h2 className="font-display text-xl text-surface-900 dark:text-white mb-6">Resume</h2>
      <Field label="Button Label" value={r.buttonLabel} onChange={(v) => u("buttonLabel", v)} />
      <Field label="File Path" value={r.filePath} onChange={(v) => u("filePath", v)} help="Place your resume PDF in public/resume/ and enter the path like /resume/Prabin_Pandey_Resume.pdf" />
    </div>
  );
}
