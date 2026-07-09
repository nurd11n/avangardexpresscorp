'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

const LangContext = createContext<Lang>('en');

/** Server layout resolves the language from the cookie and provides it here. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}
