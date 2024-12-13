import { useMemo } from "react";
import { translations, Language } from "../i18n";

export function useTranslation(language: Language = "en") {
  const t = useMemo(() => {
    const translate = (key: string): string => {
      const keys = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[language];

      for (const k of keys) {
        if (value?.[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k];
      }

      return value as string;
    };

    return translate;
  }, [language]);

  return { t };
}
