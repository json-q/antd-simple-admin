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
