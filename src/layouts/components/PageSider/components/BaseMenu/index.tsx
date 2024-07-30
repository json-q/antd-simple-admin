import { createElement, memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { useDeepCompareEffect } from "ahooks";
import { isArray } from "lodash-es";
import { type IRouteObject } from "@/routes";
import { useSelector } from "@/stores";
import useRouteMatch from "@/hooks/useRouteMatch";
import useMenuWrapperStyles from "./styles";

type MenusType = MenuItemType & Partial<SubMenuType>;

interface BaseMenuProps {
  hideScroll?: boolean;
}

const BaseMenu: React.FC<BaseMenuProps> = memo(({ hideScroll }) => {
  const { styles } = useMenuWrapperStyles();
  const { matchRoute, treeMatchRoute } = useRouteMatch();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { menuMode, collapsed, authRoutes } = useSelector(["menuMode", "collapsed", "authRoutes"]);

  useDeepCompareEffect(() => {
    setSelectedKeys([matchRoute?.path || ""]);
  }, [matchRoute]);

  useDeepCompareEffect(() => {
    // 若 sider 处于展开状态，则默认需要展开对应的子级菜单
    if (collapsed === false) {
      setOpenKeys(treeMatchRoute?.map((item) => item.path));
    }
  }, [treeMatchRoute, collapsed]);

  const genMenus = useMemo(() => {
    const genBaseMenus = (routes: IRouteObject[]) => {
      return routes
        .filter((item) => {
          const isIndex = item.index !== true; // 去掉首页标识（重定向配置不是菜单路由，不显示到菜单）
          const isFullPage = item.layout !== false; // 去掉全屏显示的页面，不在菜单内
          const isShowMenu = item.meta?.hideMenu !== true; // 配置 hideMenu = true 的不显示到菜单
          return isIndex && isFullPage && isShowMenu;
        })
        .map((item) => {
          const icon = item.icon;
          const label = item.title || item.meta?.title;
          const hasChildren = isArray(item.children) && item.children.length > 0;

          const menuItem: MenusType = {
            label: hasChildren ? label : <Link to={item.path}>{label}</Link>,
            key: item.path,
            icon: icon ? createElement(icon) : null,
          };

          if (hasChildren) menuItem.children = genBaseMenus(item.children!);

          return menuItem;
        });
    };

    return genBaseMenus(authRoutes);
  }, [authRoutes]);

  const menuDom = (
    <Menu
      theme={menuMode}
      className="min-h-full"
      mode="inline"
      inlineIndent={16}
      items={genMenus}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      selectedKeys={selectedKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
    />
  );

  if (hideScroll) return menuDom;
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
