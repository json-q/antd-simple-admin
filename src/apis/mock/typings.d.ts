export namespace Mock {
  type Auth = "admin" | "user" | "visitor";

  interface UserInfo {
    nickName: string;
    id: string;
    avatar: string;
    email: string;
    auth: Auth[];
  }

  interface LoginParams {
    username: string;
    password: string;
    captcha: string;
  }
}
