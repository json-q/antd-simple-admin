import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const BreadcrumbToggle: React.FC = memo(() => {
  const { breadcrumb, actionBreadcrumb } = useSelector(["breadcrumb", "actionBreadcrumb"]);

  return <Switch checked={breadcrumb} onChange={actionBreadcrumb} />;
});

export default BreadcrumbToggle;
