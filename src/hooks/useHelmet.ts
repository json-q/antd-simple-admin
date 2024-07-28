import { useTitle } from "ahooks";
import useRouteMatch from "./useRouteMatch";

export default function useHelmet() {
  const { matchRoute } = useRouteMatch();

  const title = matchRoute?.meta?.title || matchRoute?.title;
  const appTitle = (title ? `${title} - ` : "") + import.meta.env.VITE_APP_TITLE;

  useTitle(appTitle);
}
