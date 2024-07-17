import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403 Forbidden"
      subTitle="抱歉，您无权访问此页面"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
};

export default Forbidden;
