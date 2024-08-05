import pico from "picocolors";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const msgPath = path.resolve(".git/COMMIT_EDITMSG");
const msg = readFileSync(msgPath, "utf-8").trim();

// by https://github.com/vuejs/core/blob/main/scripts/verify-commit.js
const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${pico.white(pico.bgRed(" ERROR "))} ${pico.red(`invalid commit message format.`)}\n\n` +
      pico.red(`  you should submit good message format. Examples:\n\n`) +
      `    ${pico.green(`feat: add a new feature`)}\n` +
      `    ${pico.green(`fix: fixed a logic bug`)}\n\n` +
      pico.red(`please see scripts/verify-commit.js to complete commit.\n`),
  );
  process.exit(1);
}

/**
-   feat：新增功能。
-   fix：修复 bug。
-   docs：更新文档。
-   dx：改进开发者体验。
-   style：修改样式。
-   refactor：重构代码。
-   perf：性能优化。
-   test：添加或修改测试。
-   workflow：改进工作流程。
-   build：修改构建系统或外部依赖。
-   ci：修改持续集成配置文件或脚本。
-   chore：其他杂项任务。
-   types：修改类型定义文件（如 TypeScript）。
-   wip：进行中的工作，尚未完成。
-   release：发布新版本。
 */
