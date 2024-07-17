import { Layout } from "antd";
import useContentStyles from "./styles";

const { Content } = Layout;

interface PageContentProps {
  children?: React.ReactNode;
}
const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const { styles } = useContentStyles();

  return <Content className={styles.content}>{children}</Content>;
};

export default PageContent;
