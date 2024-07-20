import { createElement, memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { has, isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";
import { useSelector } from "@/stores";
import useRouteMatch from "@/hooks/useRouteMatch";
import useMenuWrapperStyles from "./styles";

type MenusType = MenuItemType & Partial<SubMenuType>;

const BaseMenu: React.FC = memo(() => {
  const { styles } = useMenuWrapperStyles();
  const { matchRoute, treeMatchRoute } = useRouteMatch();
  const { menuMode } = useSelector(["menuMode"]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([matchRoute?.path || ""]);
    setOpenKeys(treeMatchRoute?.map((item) => item.path));
  }, [matchRoute]);

  const convertMenu = useCallback((routes: IRouter[]) => {
    return routes
      .filter((item) => !has(item, "redirect") && item.layout !== false) // 过滤掉非菜单项
      .map((item) => {
        const icon = item.icon;
        const label = item.title || item.meta?.title;
        const hasChildren = isArray(item.children) && item.children.length > 0;

        const menuItem: MenusType = {
          label: hasChildren ? label : <Link to={item.path}>{label}</Link>,
          key: item.path,
          icon: icon ? createElement(icon) : null,
        };

        if (hasChildren) menuItem.children = convertMenu(item.children!);

        return menuItem;
      });
  }, []);

  return (
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: "leave", autoHideDelay: 200 } }}
      className={styles.menuWrapper}
    >
      <Menu
        theme={menuMode}
        className="min-h-full"
        mode="inline"
        inlineIndent={16}
        items={convertMenu(routes)}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
      />
    </OverlayScrollbarsComponent>
  );
});

export default BaseMenu;
