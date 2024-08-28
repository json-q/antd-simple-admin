import { faker } from "@faker-js/faker/locale/zh_CN";
import { defineFakeRoute } from "vite-plugin-fake-server/client";

function delay(timeout = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
}

export default defineFakeRoute([
  {
    url: "/user/login",
    method: "POST",
    response: async ({ body }) => {
      await delay();
      const { username, password } = body;
      if ((username != "admin" || username !== "user") && password != "123456") {
        return R.fail(500, "账号或密码错误");
      }

      return R.ok(username); // mock token
    },
  },
  {
    url: "/user/info",
    method: "GET",
    response: async ({ headers }) => {
      await delay();
      const { authentication } = headers;
      if (!authentication) return R.fail(401, "认证失败");
      if (authentication != "admin" && authentication != "user") {
        return R.fail(401, "认证失败");
      }

      const data = {
        id: faker.string.uuid(),
        nickName: faker.person.middleName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        sex: faker.person.sexType(),
        role: [authentication],
      };

      return R.ok(data);
    },
  },

  {
    url: "/user/logout",
    method: "POST",
    response: async () => {
      await delay();
      return R.ok();
    },
  },
]);

interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}

interface R_Type {
  ok: <T>(data?: T) => Result;
  fail: (code: number, msg?: string) => Result;
}

class _R implements R_Type {
  ok<T>(data?: T) {
    return { code: 200, data, msg: "操作成功" };
  }
  fail(code: number, msg?: string) {
    return { code: code, data: null, msg: msg || "操作失败" };
  }
}
const R = new _R();
