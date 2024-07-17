import { Layout } from "antd";
import useHeaderStyles from "./styles";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { styles } = useHeaderStyles();

  return <Header className={styles.header} />;
};

export default PageHeader;
