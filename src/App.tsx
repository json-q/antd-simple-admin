import { Result } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import RenderRoutes from "@/routes";
import AntdConfigProvider from "./themes/AntdConfigProvider";
import "./locales/i18n";

const App: React.FC = () => {
  return (
    <AntdConfigProvider>
      <ErrorBoundary
        fallbackRender={(props) => {
          return (
            <Result status="error" title="出现了一些未知错误" subTitle={props.error.message} />
          );
        }}
      >
        <RenderRoutes />
      </ErrorBoundary>
    </AntdConfigProvider>
  );
};

export default App;
