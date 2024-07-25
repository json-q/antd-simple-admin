import { memo } from "react";
import { Link } from "react-router-dom";
import { useResponsive } from "antd-style";
import { useSelector } from "@/stores";
import useLogoStyles from "./styles";

const title = import.meta.env.VITE_APP_TITLE;
const baseRouterName = import.meta.env.VITE_BASE_ROUTER_NAME;

const BaseLogo: React.FC = memo(() => {
  const { md = true } = useResponsive();
  const { menuMode, collapsed } = useSelector(["menuMode", "collapsed"]);
  const { styles } = useLogoStyles({ menuMode, md });

  return (
    <div className={styles.logo}>
      <Link to={baseRouterName}>
        <img
          width="auto"
          height="22"
          src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
          alt="logo"
        />
        {!collapsed && md && <h1>{title}</h1>}
      </Link>
    </div>
  );
});

export default BaseLogo;
