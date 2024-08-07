import { Result } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import useStaticApp from "@/hooks/useStaticApp";
import RenderRoutes from "@/routes";

const App: React.FC = () => {
  useStaticApp();

  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <Result status="error" title="出现了一些未知错误" subTitle={props.error.message} />;
      }}
    >
      <RenderRoutes />
    </ErrorBoundary>
  );
};

export default App;
