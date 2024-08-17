import { Card, Typography } from "antd";

const { Paragraph, Text } = Typography;
const Admin: React.FC = () => {
  return (
    <Card>
      <Paragraph>
        This page can only be viewed by <Text code>admin</Text>
      </Paragraph>
    </Card>
  );
};

export default Admin;
