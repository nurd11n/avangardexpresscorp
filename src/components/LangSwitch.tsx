'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/lang-context';
import { LANG_COOKIE, type Lang } from '@/lib/i18n';

/** Text toggle `EN · RU`. Sets the cookie, then refreshes so SSR re-renders. */
export function LangSwitch() {
  const lang = useLang();
  const router = useRouter();

  function setLang(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  const item = (code: Lang) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`font-mono text-sm uppercase transition-colors duration-150 ${
        lang === code ? 'text-paper' : 'text-haze hover:text-blue'
      }`}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <span className="flex items-center gap-2">
      {item('en')}
      <span className="text-haze" aria-hidden="true">
        ·
      </span>
      {item('ru')}
    </span>
  );
}
