import http from "@/http";
import type { Mock } from "./typings";

export const login = (data: Mock.LoginParams) => {
  return http.post("/user/login", data);
};

export const fetchUserInfo = () => {
  return http.get<Mock.UserInfo>("/user/info");
};

export const logout = () => {
  return http.post("/user/logout");
};
