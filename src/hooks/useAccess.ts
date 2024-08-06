import { useMemo } from "react";
import { isArray } from "lodash-es";
import { useSelector } from "@/stores";

/**
 * 当前用户权限默认为数组，根据入参身份进行权限判断
 * @param access 权限 string | string[]
 * @returns boolean
 */
const useAccess = (access: string | string[]) => {
  const { currentUser } = useSelector(["currentUser"]);
  const auth = currentUser?.role || [];

  return useMemo(() => {
    return validateAccess(auth, access);
  }, [access, auth]);
};

export function validateAccess(auth: string[], access: string | string[]) {
  if (auth.length === 0) return false;

  if (typeof access === "string") {
    return auth.includes(access);
  } else if (isArray(access)) {
    return access.some((item) => auth.includes(item));
  }
  return false;
}

export default useAccess;
