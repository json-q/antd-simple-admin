import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { SiderContext } from "../BaseSider";
import useLogoStyles from "./styles";
import useStore from "@/stores";

const title = import.meta.env.VITE_APP_TITLE;
const baseRouterName = import.meta.env.VITE_BASE_ROUTER_NAME;

const BaseLogo: React.FC = memo(() => {
  const menuMode = useStore((state) => state.menuMode);
  const { styles } = useLogoStyles(menuMode);
  const store = useContext(SiderContext);

  return (
    <div className={styles.logo}>
      <Link to={baseRouterName}>
        <img
          width="auto"
          height="22"
          src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
          alt="logo"
        />
        {!store?.collapsed && <h1>{title}</h1>}
      </Link>
    </div>
  );
});

export default BaseLogo;
