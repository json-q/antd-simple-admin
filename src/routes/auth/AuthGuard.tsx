import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { isArray } from "lodash-es";
import GlobalHelmet from "@/components/GlobalHelmet";
import Loading from "@/components/Loading";
import useRouteMatch from "@/hooks/useRouteMatch";
import { useSelector } from "@/stores";
import { LOGIN_PAGE, TOKEN_CACHE } from "@/constants";
import localCacha from "@/utils/cache/localCache";
import { unAuthRoutes, type IRouteObject } from "..";

const PageLayout = lazy(() => import("@/layouts"));

/**
 * 用户访问网站时的自动认证
 */
const AuthGuard: React.FC = memo(() => {
  useRouteMatch(); // 自动同步当前路由
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, getCurrentUserInfo } = useSelector(["currentUser", "getCurrentUserInfo"]);
  const [loading, setLoading] = useState(true);

  // 约定目录下的白名单路由
  const whiteRoutePaths = useMemo(() => {
    const paths: string[] = [];
    function genWhitePaths(routes: IRouteObject[]) {
      routes.forEach((item) => {
        if (isArray(item.children) && item.children.length > 0) {
          genWhitePaths(item.children);
        } else {
          paths.push(item.path);
        }
      });
    }
    genWhitePaths(unAuthRoutes);
    return paths;
  }, [unAuthRoutes]);

  useEffect(() => {
    //  访问开放页面无需认证
    const noNeedAuth = whiteRoutePaths.includes(pathname);
    if (noNeedAuth) return setLoading(false);

    if (!localCacha.get(TOKEN_CACHE)) {
      return navigate(LOGIN_PAGE, { replace: true });
    } else if (!currentUser) {
      // 根路由访问，网速够快情况下，可能出现连续请求两次的情况
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [pathname, whiteRoutePaths]);

  async function getCurrentUser() {
    try {
      await getCurrentUserInfo();
      setLoading(false);
    } catch (e) {
      navigate(LOGIN_PAGE, { replace: true });
    }
  }

  // 认证期间，一直处于 loading 状态，不渲染页面路由，防止闪屏
  if (loading) return <Loading tip="认证中" indicator={<LoadingOutlined />} />;

  return (
    <Suspense fallback={<Loading tip="加载中" />}>
      <GlobalHelmet />
      <PageLayout />
    </Suspense>
  );
});

export default AuthGuard;
