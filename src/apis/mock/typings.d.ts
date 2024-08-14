export namespace Mock {
  // type Auth = "admin" | "user" | "visitor";

  export interface UserInfo {
    nickName: string;
    id: string;
    avatar: string;
    email: string;
    role: string[];
  }

  export interface LoginParams {
    username: string;
    password: string;
    captcha: string;
  }
}
