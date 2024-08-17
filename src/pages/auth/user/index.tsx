import Access from "@/components/Access";
import useAccess from "@/hooks/useAccess";
import { message } from "@/hooks/useStaticApp";
import { Button, Card, Divider, Typography } from "antd";
const { Paragraph, Text, Title } = Typography;

const User: React.FC = () => {
  const hasAccess = useAccess(["admin", "user"]);

  return (
    <Card>
      <Title level={4}>Page Auth: </Title>
      <Paragraph>
        This is the page that <Text code>admin</Text> and <Text code>user</Text> can see
      </Paragraph>

      <Divider />

      <Title level={4}>
        <Text code>Access</Text> Component Auth:（show / hidden button）
      </Title>
      <Paragraph>
        This button can only be viewed by <Text code>admin</Text>
      </Paragraph>
      <Access access="admin">
        <Button type="primary" onClick={() => message.info("You are Admin")}>
          Only Admin Auth Button
        </Button>
      </Access>

      <Divider />

      <Title level={4}>
        <Text code>useAccess</Text> Hook Auth:（show / hidden button）
      </Title>
      <Paragraph>
        This button is viewed by <Text code>admin</Text> and <Text code>user</Text>
      </Paragraph>
      {hasAccess ? (
        <Button type="primary" onClick={() => message.info("You are Admin or User")}>
          Admin and User Auth Button
        </Button>
      ) : null}
    </Card>
  );
};
export default User;
