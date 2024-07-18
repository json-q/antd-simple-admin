import { createElement, memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { has, isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";
import useStore from "@/stores";
import useRouteMatch from "@/hooks/useRouteMatch";
import useMenuWrapperStyles from "./styles";
import SimpleBar from "simplebar-react";

const BaseMenu: React.FC = memo(() => {
  const { styles, cx } = useMenuWrapperStyles();
  const { matchRoute, treeMatchRoute } = useRouteMatch();
  const menuMode = useStore((state) => state.menuMode);
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
          const hasChildren = isArray(item.children) && item.children.length > 0;

          const menuItem: MenuItemType & Partial<SubMenuType> = {
            label: hasChildren ? label : <Link to={item.path}>{label}</Link>,
            key: item.path,
            icon: icon ? createElement(icon) : null,
          };

          if (hasChildren) menuItem.children = convertMenu(item.children!);

          return menuItem;
        });
    },
    [routes],
  );

  return (
    <SimpleBar className={cx(styles.menuWrapper)}>
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
    </SimpleBar>
  );
});

export default BaseMenu;
