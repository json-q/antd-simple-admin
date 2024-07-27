import { Result } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import ThemeControlProvider from "@/themes/ThemeControlProvider";
import useHelmet from "@/hooks/useHelmet";
import useStaticApp from "@/hooks/useStaticApp";
import RootRoutes from "@/routes/RootRoutes";
import LoadUser from "@/layouts/auth/LoadUser";

const App: React.FC = () => {
  useHelmet();
  useStaticApp();

  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <Result status="error" title="出现了一些未知错误" subTitle={props.error.message} />;
      }}
    >
      <ThemeControlProvider>
        <LoadUser>
          <RootRoutes />
        </LoadUser>
      </ThemeControlProvider>
    </ErrorBoundary>
  );
};

export default App;
