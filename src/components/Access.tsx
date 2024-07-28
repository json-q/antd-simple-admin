import { memo, type FC, type PropsWithChildren } from "react";
import useAccess from "@/hooks/useAccess";

interface AccessProps {
  access: string | string[];
}

const Access: FC<PropsWithChildren<AccessProps>> = memo(({ access, children }) => {
  const hasAccess = useAccess(access);

  return hasAccess ? children : null;
});

export default Access;
