import { memo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useRouteMatch from "@/hooks/useRouteMatch";

const HelmetMeta: React.FC = memo(() => {
  const { matchRoute } = useRouteMatch();

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {matchRoute?.meta?.title ? `${matchRoute.meta.title} - ` : ""}
          {import.meta.env.VITE_APP_TITLE}
        </title>
      </Helmet>
    </HelmetProvider>
  );
});

export default HelmetMeta;
