import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { useDeepCompareEffect } from "ahooks";
import { isArray } from "lodash-es";
import { useSelector } from "@/stores";
import { IRouteObject } from "@/routes";
import { mergePath } from "@/routes/utils";
import useLang from "@/locales/useLang";
import useMenuWrapperStyles from "./styles";

type MenusType = MenuItemType & Partial<SubMenuType>;

interface BaseMenuProps {
  hideScroll?: boolean;
  mode?: "horizontal" | "inline";
}

const BaseMenu: React.FC<BaseMenuProps> = memo(({ hideScroll, mode = "inline" }) => {
  const { styles } = useMenuWrapperStyles();
  const { lang } = useLang();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { menuMode, collapsed, authRoutes, matchRoute } = useSelector([
    "menuMode",
    "collapsed",
    "authRoutes",
    "matchRoute",
  ]);

  useDeepCompareEffect(() => {
    setSelectedKeys([matchRoute.route?.path || ""]);
  }, [matchRoute]);

  useDeepCompareEffect(() => {
    // top Menu don't need openKeys
    if (mode === "horizontal") return;
    // sider collapsed is false. open menu keys by matchRoute
    if (collapsed === false) {
      setOpenKeys(matchRoute.treeRoute.map((item) => item.path));
    } else {
      setOpenKeys([]);
    }
  }, [matchRoute, collapsed]);

  const genMenus = useMemo(() => {
    function genBaseMenus(routes: IRouteObject[] = [], parentPath: string = "/") {
      return routes
        .filter((item) => item.meta?.hideMenu !== true)
        .map((item) => {
          const path = mergePath(item.path, parentPath);
          const _label = item.title || item.meta?.title;
          const label = _label ? t(_label) : item.path;
          const hasChildren = isArray(item.children) && item.children.length > 0;
          const menuItem: MenusType = {
            label: hasChildren ? label : <Link to={path}>{label}</Link>,
            key: item.path,
            icon: item.icon,
          };

          if (hasChildren) menuItem.children = genBaseMenus(item.children, path);

          return menuItem;
        });
    }

    return genBaseMenus(authRoutes);
  }, [authRoutes, lang]);

  const menuDom = (
    <Menu
      theme={menuMode}
      className="min-h-full w-full"
      mode={mode}
      inlineIndent={16}
      items={genMenus}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      selectedKeys={selectedKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
    />
  );

  if (hideScroll || mode === "horizontal") return menuDom;

  return (
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: "leave", autoHideDelay: 200 } }}
      className={styles.menuWrapper}
    >
      {menuDom}
    </OverlayScrollbarsComponent>
  );
});

export default BaseMenu;
