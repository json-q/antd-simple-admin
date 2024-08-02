import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { useDeepCompareEffect } from "ahooks";
import { isArray } from "lodash-es";
import { useSelector } from "@/stores";
import { IRouteObject } from "@/routes";
import { mergePath } from "@/routes/utils";
import useMenuWrapperStyles from "./styles";

type MenusType = MenuItemType & Partial<SubMenuType>;

interface BaseMenuProps {
  hideScroll?: boolean;
}

const BaseMenu: React.FC<BaseMenuProps> = memo(({ hideScroll }) => {
  const { styles } = useMenuWrapperStyles();
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
    // 若 sider 处于展开状态，则默认需要展开对应的子级菜单
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

          const label = item.title || item.meta?.title || item.path;
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
