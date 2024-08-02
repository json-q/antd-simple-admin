import { useSelector } from "@/stores";
import { memo } from "react";
import { Helmet } from "react-helmet-async";

const GlobalHelmet: React.FC = memo(() => {
  const { matchRoute } = useSelector(["matchRoute"]);

  const title = matchRoute.route?.meta?.title || matchRoute.route?.title;
  const appTitle = (title ? `${title} - ` : "") + import.meta.env.VITE_APP_TITLE;

  return (
    <Helmet>
      <title>{appTitle}</title>
    </Helmet>
  );
});

export default GlobalHelmet;
