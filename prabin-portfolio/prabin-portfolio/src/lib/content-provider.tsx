"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { SiteContent } from "@/types/content";
import { DEFAULT_CONTENT } from "@/lib/default-content";

const STORAGE_KEY = "prabin_portfolio_draft";

interface ContentContextType {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  saveDraft: (content: SiteContent) => void;
  resetToDefault: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: DEFAULT_CONTENT,
  setContent: () => {},
  saveDraft: () => {},
  resetToDefault: () => {},
  isLoading: true,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      // 1. Try localStorage draft
      try {
        const draft = localStorage.getItem(STORAGE_KEY);
        if (draft) {
          const parsed = JSON.parse(draft) as SiteContent;
          if (parsed && parsed.siteSettings && parsed.hero) {
            setContentState(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch {}

      // 2. Try fetching from public/content/content.json
      try {
        const res = await fetch("/content/content.json");
        if (res.ok) {
          const data = (await res.json()) as SiteContent;
          if (data && data.siteSettings && data.hero) {
            setContentState(data);
            setIsLoading(false);
            return;
          }
        }
      } catch {}

      // 3. Fallback to DEFAULT_CONTENT
      setContentState(DEFAULT_CONTENT);
      setIsLoading(false);
    }

    loadContent();
  }, []);

  const setContent = useCallback((newContent: SiteContent) => {
    setContentState(newContent);
  }, []);

  const saveDraft = useCallback((newContent: SiteContent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      setContentState(newContent);
    } catch (e) {
      console.error("Failed to save draft:", e);
    }
  }, []);

  const resetToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setContentState(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, setContent, saveDraft, resetToDefault, isLoading }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
