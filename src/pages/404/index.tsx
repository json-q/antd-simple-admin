import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle={t("404.subTitle")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
};

export default NotFound;
