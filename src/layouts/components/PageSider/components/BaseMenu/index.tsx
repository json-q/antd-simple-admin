import { createElement, memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { has, isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";
import useMenuWrapperStyles from "./styles";
import useRouteMatch from "@/hooks/useRouteMatch";

const BaseMenu: React.FC = memo(() => {
  const { styles } = useMenuWrapperStyles();
  const { matchRoute, treeMatchRoute } = useRouteMatch();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([matchRoute?.path || ""]);
    setOpenKeys(treeMatchRoute?.map((item) => item.path));
  }, [matchRoute]);

  const convertMenu = useCallback(
    (routes: IRouter[]) => {
      return routes
        .filter((item) => !has(item, "redirect") && item.layout !== false) // 过滤掉非菜单项
        .map((item) => {
          const icon = item.icon;
          const label = item.title || item.meta?.title;

          const menuItem: MenuItemType & Partial<SubMenuType> = {
            label: item.children ? label : <Link to={item.path}>{label}</Link>,
            key: item.path,
            icon: icon ? createElement(icon) : null,
          };

          if (isArray(item.children) && item.children.length > 0) {
            menuItem.children = convertMenu(item.children);
          }

          return menuItem;
        });
    },
    [routes],
  );

  return (
    <div className={styles.menuWrapper}>
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        onOpenChange={setOpenKeys}
        theme="light"
        className="min-h-full"
        mode="inline"
        items={convertMenu(routes)}
      />
    </div>
  );
});

export default BaseMenu;
