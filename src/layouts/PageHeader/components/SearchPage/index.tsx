import { memo, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Empty, Input, Modal } from "antd";
import { EnterOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash-es";
import { useSelector } from "@/stores";
import { type IRouteObject } from "@/routes";
import useSearchStyles from "./styles";
import { useKeyPress } from "ahooks";

const SearchPage: React.FC = memo(() => {
  const { styles, cx } = useSearchStyles();
  const { authRoutes } = useSelector(["authRoutes"]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [routeList, setRouteList] = useState<IRouteObject[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  useEffect(() => {
    // reset hover index when routeList change
    setHoverIndex(0);
  }, [routeList]);

  const baseRouteList = useMemo(() => {
    function genBaseRouteList(routes: IRouteObject[]): IRouteObject[] {
      const _baseRouteList: IRouteObject[] = [];
      routes.forEach((item) => {
        if (item.children) {
          _baseRouteList.push(...genBaseRouteList(item.children));
        } else {
          _baseRouteList.push(item);
        }
      });

      return _baseRouteList;
    }

    return genBaseRouteList(authRoutes);
  }, [authRoutes]);

  useKeyPress("esc", () => setOpen(false));

  useKeyPress("uparrow", () => {
    if (!open) return;
    setHoverIndex((state) => (state == 0 ? routeList.length - 1 : state - 1));
  });

  useKeyPress("downarrow", () => {
    if (!open) return;
    setHoverIndex((state) => (state >= routeList.length - 1 ? 0 : state + 1));
  });

  useKeyPress("enter", () => {
    if (routeList.length === 0) return;
    navToPage(routeList[hoverIndex]);
  });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setRouteList([]);

    const newRouteList = baseRouteList.filter((item) => item.title?.includes(value));
    setRouteList(newRouteList);
  };

  const navToPage = (routeItem: IRouteObject) => {
    navigate(routeItem.path);
    setOpen(false);
    setHoverIndex(0);
    setRouteList([]);
  };

  return (
    <>
      <Button type="text" shape="circle" icon={<SearchOutlined />} onClick={() => setOpen(true)} />

      <Modal
        footer={null}
        closeIcon={null}
        destroyOnClose
        open={open}
        onCancel={() => setOpen(false)}
        styles={{ body: { minHeight: 200, maxHeight: 500 } }}
      >
        <Input
          onChange={debounce(onSearch, 200)}
          prefix={<SearchOutlined />}
          placeholder="导航页面快速搜索"
          size="large"
        />

        <div className={styles.searchContent}>
          {routeList.length === 0 ? (
            <Empty description="暂无搜索结果" />
          ) : (
            <>
              {routeList.map((item, index) => (
                <div
                  key={item.path}
                  className={cx(styles.searchItem, {
                    active: item.path === pathname,
                    hover: hoverIndex === index,
                  })}
                  onClick={() => navToPage(item)}
                  onMouseEnter={() => setHoverIndex(index)}
                >
                  <div>
                    {item.icon ? <span className="mr-2">{item.icon}</span> : null}
                    <span>{item.title}</span>
                  </div>
                  <EnterOutlined />
                </div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </>
  );
});

export default SearchPage;
