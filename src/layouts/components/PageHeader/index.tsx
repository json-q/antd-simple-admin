import { Button, Layout } from "antd";
import useHeaderStyles from "./styles";
import useStore from "@/stores";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { styles } = useHeaderStyles();

  const { menuMode, themeMode, actionThemeMode, actionMenuMode } = useStore((state) => ({
    ...state,
  }));

  return (
    <Header className={styles.header}>
      <Button onClick={() => actionMenuMode(menuMode === "dark" ? "light" : "dark")}>Menu</Button>
      <Button onClick={() => actionThemeMode(themeMode === "dark" ? "light" : "dark")}>
        Theme
      </Button>
    </Header>
  );
};

export default PageHeader;
