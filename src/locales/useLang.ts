import { useTranslation } from "react-i18next";
import { LangEnum } from "@/enums";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

export type Lang = keyof typeof LangEnum;

export const LocalLanguage = {
  [LangEnum.zh_CN]: {
    lang: LangEnum.zh_CN,
    label: "简体中文",
    antdLocal: zhCN,
  },
  [LangEnum.en_US]: {
    lang: LangEnum.en_US,
    label: "English",
    antdLocal: enUS,
  },
};

export default function useLang() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || LangEnum.zh_CN;
  const langConfig = LocalLanguage[lang as Lang];

  const setLangConfig = (lang: Lang) => {
    i18n.changeLanguage(lang);
  };

  return {
    lang,
    langConfig,
    setLangConfig,
  };
}
