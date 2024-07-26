import { createElement, memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { useResponsive } from "antd-style";
import { useDeepCompareEffect } from "ahooks";
import { isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";
import { useSelector } from "@/stores";
import useRouteMatch from "@/hooks/useRouteMatch";
import useMenuWrapperStyles from "./styles";

type MenusType = MenuItemType & Partial<SubMenuType>;

interface BaseMenuProps {
  hideScroll?: boolean;
}

const BaseMenu: React.FC<BaseMenuProps> = memo(({ hideScroll }) => {
  const { styles } = useMenuWrapperStyles();
  const { lg, md } = useResponsive();
  const { matchRoute, treeMatchRoute } = useRouteMatch();
  const { menuMode, collapsed } = useSelector(["menuMode", "collapsed"]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useDeepCompareEffect(() => {
    setSelectedKeys([matchRoute?.path || ""]);
  }, [matchRoute]);

  useDeepCompareEffect(() => {
    // 子菜单展开的前提条件是 sider 处于展开状态，否则子菜单一律不展开（便于理解这么写，if 逻辑可合并）
    if (collapsed === true) return;
    // 1. 处在中屏 lg 及以上时，默认菜单是展开的，此时展开子菜单
    // 2. 处于小屏状态 md 及以下时，Menu 在  Drawer 中，Sider 一直展开，Menu 子菜单一直展开
    if (lg === true || md === false) {
      setOpenKeys(treeMatchRoute?.map((item) => item.path));
    }
  }, [treeMatchRoute, lg, collapsed]);

  const genMenus = useMemo(() => {
    const genBaseMenus = (routes: IRouter[]) => {
      return (
        routes
          // 由于菜单页兼容重定向，index 区分菜单和首页重定向。过滤掉非菜单项和首页重定向
          .filter((item) => !item.index && item.layout !== false)
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
          })
      );
    };

    return genBaseMenus(routes);
  }, [routes]);

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
