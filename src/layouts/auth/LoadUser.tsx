import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import localCacha from "@/utils/cache/localCache";
import { LOGIN_PAGE, TOKEN_CACHE } from "@/constants";
import { useSelector } from "@/stores";
import LazyLoading from "../common/LazyLoading";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadUserProps {
  children: React.ReactNode;
}

/**
 * 用户访问网站时的自动认证
 */
const LoadUser: React.FC<LoadUserProps> = memo(({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, getCurrentUserInfo } = useSelector(["currentUser", "getCurrentUserInfo"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  访问开放页面无需认证
    const noNeedAuth = [LOGIN_PAGE].includes(pathname);
    if (noNeedAuth) return setLoading(false);

    if (!localCacha.get(TOKEN_CACHE)) {
      return navigate(LOGIN_PAGE, { replace: true });
    } else if (!currentUser) {
      // 网速够快情况下，可能出现连续请求两次的情况，原因： / 请求一次，重定向地址请求一次
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  async function getCurrentUser() {
    try {
      setLoading(true);
      await getCurrentUserInfo();
      setLoading(false);
    } catch (e) {
      navigate("/login", { replace: true });
    }
  }

  // 认证期间，一直处于 loading 状态，不渲染页面路由，防止闪屏
  if (loading) return <LazyLoading tip="认证中" indicator={<LoadingOutlined />} />;

  return children;
});

export default LoadUser;
