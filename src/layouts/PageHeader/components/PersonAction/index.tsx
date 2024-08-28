import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Dropdown, Flex, type MenuProps } from "antd";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { message, modal } from "@/hooks/useStaticApp";
import { useSelector } from "@/stores";
import { PagePathEnum, StorageEnum } from "@/enums";
import localCacha from "@/utils/cache/localCache";
import { logout } from "@/apis/mock";
import usePersonActionStyles from "./styles";

enum MenuItemKey {
  PASSWORD = "PASSWORD",
  LOGOUT = "LOGOUT",
}

const PersonAction: React.FC = memo(() => {
  const { styles } = usePersonActionStyles();
  const { t } = useTranslation();
  const { currentUser, resetUserState, responsive } = useSelector([
    "currentUser",
    "resetUserState",
    "responsive",
  ]);
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: t("person.password.menu.label"),
      key: MenuItemKey.PASSWORD,
      icon: <LockOutlined />,
    },
    { type: "divider" },
    {
      label: t("person.logout.menu.label"),
      key: MenuItemKey.LOGOUT,
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const onClickDrop: MenuProps["onClick"] = async ({ key }) => {
    switch (key) {
      case MenuItemKey.LOGOUT:
        onClickLogout();
        break;
      default:
        message.success(`you click ${key}`);
        break;
    }
  };

  const onClickLogout = () => {
    modal.confirm({
      title: t("logout.confirm.title"),
      content: t("logout.confirm.content"),
      onOk: loginOut,
    });

    async function loginOut() {
      const { code } = await logout();
      if (code === 200) {
        localCacha.remove(StorageEnum.Token);
        message.success(t("common.logout.success"));
        resetUserState();
        navigate(PagePathEnum.Login);
      }
    }
  };

  return (
    <Dropdown menu={{ items, onClick: onClickDrop }} placement="bottomRight">
      <Flex align="center" gap={8} className={styles.personWrapper}>
        <Avatar size="small" src={currentUser?.avatar} icon={<UserOutlined />} />
        {responsive.md && <span className="name">{currentUser?.nickName}</span>}
      </Flex>
    </Dropdown>
  );
});

export default PersonAction;
