import { memo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useRouteMatch from "@/hooks/useRouteMatch";

const HelmetMeta: React.FC = memo(() => {
  const { matchRoute } = useRouteMatch();
  const title = matchRoute?.title || matchRoute?.meta?.title;

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {title ? `${title} - ` : ""}
          {import.meta.env.VITE_APP_TITLE}
        </title>
      </Helmet>
    </HelmetProvider>
  );
});

export default HelmetMeta;
