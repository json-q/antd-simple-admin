import { memo, Suspense } from "react";
import { useOutlet } from "react-router-dom";
import Loading from "@/components/Loading";
import { useSelector } from "@/stores";
import PageResponsive from "./components/PageResponsive";

const PageLayout: React.FC = memo(() => {
  const { matchRoute } = useSelector(["matchRoute"]);
  const outlet = useOutlet(); // route animation don't use <Outlet/>

  // all router add suspense
  const lazyOutlet = <Suspense fallback={<Loading />}>{outlet}</Suspense>;

  if (matchRoute.route?.layout === false) {
    return lazyOutlet;
  }

  return <PageResponsive>{lazyOutlet}</PageResponsive>;
});

export default PageLayout;
