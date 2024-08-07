import { memo, useEffect, useRef } from "react";
import { Layout } from "antd";
import useContentStyles from "./styles";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const { Content } = Layout;

interface PageContentProps {
  children?: React.ReactNode;
}
const PageContent: React.FC<PageContentProps> = memo(({ children }) => {
  const { styles } = useContentStyles();
  const { pathname } = useLocation();
  const nodeRef = useRef(null);

  useEffect(() => {
    console.log("aaa");
  }, []);

  return (
    <Content className={styles.content}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade-side"
          unmountOnExit
        >
          <div ref={nodeRef} className="h-full">
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Content>
  );
});

export default PageContent;
