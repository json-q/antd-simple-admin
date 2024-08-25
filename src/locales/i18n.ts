import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LangEnum, StorageEnum } from "@/enums";
import en_US from "./en_US";
import zh_CN from "./zh_CN";

const lng = localStorage.getItem(StorageEnum.I18N) || LangEnum.zh_CN;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: lng,
    debug: true,
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN },
    },
    fallbackLng: lng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
export const { t } = i18n;
