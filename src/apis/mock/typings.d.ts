export namespace Mock {
  // type Auth = "admin" | "user" | "visitor";

  interface UserInfo {
    nickName: string;
    id: string;
    avatar: string;
    email: string;
    role: string[];
  }

  interface LoginParams {
    username: string;
    password: string;
    captcha: string;
  }
}
