import { useMemo } from "react";
import { translations } from "../i18n";
export function useTranslation(language = "en") {
    const t = useMemo(() => {
        const translate = (key) => {
            const keys = key.split(".");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let value = translations[language];
            for (const k of keys) {
                if (value?.[k] === undefined) {
                    console.warn(`Translation key not found: ${key}`);
                    return key;
                }
                value = value[k];
            }
            return value;
        };
        return translate;
    }, [language]);
    return { t };
}
