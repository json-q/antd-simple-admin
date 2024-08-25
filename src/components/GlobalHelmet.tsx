import useLang from "@/locales/useLang";
import { useSelector } from "@/stores";
import { memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const GlobalHelmet: React.FC = memo(() => {
  const { lang } = useLang();
  const { t } = useTranslation();
  const { matchRoute } = useSelector(["matchRoute"]);

  const appTitle = useMemo(() => {
    const title = matchRoute.route?.meta?.title || matchRoute.route?.title;
    return (title ? `${t(title)} - ` : "") + import.meta.env.VITE_APP_TITLE;
  }, [lang, matchRoute]);

  return (
    <Helmet>
      <title>{appTitle}</title>
    </Helmet>
  );
});

export default GlobalHelmet;
