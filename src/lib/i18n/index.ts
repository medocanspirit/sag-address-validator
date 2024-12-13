import { en } from "./languages/en";
import { fr } from "./languages/fr";
import { es } from "./languages/es";

export const translations = {
  en,
  fr,
  es,
} as const;

export type Language = keyof typeof translations;
