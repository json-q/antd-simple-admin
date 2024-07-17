import { Result } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import ThemeControlProvider from "@/themes/ThemeControlProvider";
import HelmetMeta from "@/components/HelmetMeta";
import RootRoutes from "@/routes/RootRoutes";

const App: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <Result status="error" title="出现了一些未知错误" subTitle={props.error.message} />;
      }}
    >
      <HelmetMeta />
      <ThemeControlProvider>
        <RootRoutes />
      </ThemeControlProvider>
    </ErrorBoundary>
  );
};

export default App;
