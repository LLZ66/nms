const { exec } = require("child_process");
const { writeFileSync, readFileSync, ensureDirSync } = require("fs-extra");
const path = require("path");

// 定义要检查的文件夹数组
const folders = ["a", "b", "c", "d"];

function safeReadFileSync(filePath, defaultValue = "") {
  try {
    return readFileSync(filePath, { encoding: "utf8" });
  } catch (err) {
    if (err.code === "ENOENT") {
      // 文件不存在，返回默认值
      return defaultValue;
    } else {
      // 其他错误，重新抛出
      throw err;
    }
  }
}
// 获取上一次提交的哈希值
for (let file of folders) {
  let REQUIRE_RE_NPM_INSTALL = false;
  exec(`git log -1 --format="%H" -- ${file}`, (error, stdout, stderr) => {
    const LAST_BUILD_PARENT_GIT_HEAD = safeReadFileSync(`.cache/${file}`);
    const CURRENT_GIT_HEAD = stdout;
    if (LAST_BUILD_PARENT_GIT_HEAD !== CURRENT_GIT_HEAD) {
      console.log(`文件${file}发生变化，需要重新打包`);
      REQUIRE_RE_NPM_INSTALL = true;
    } else {
      console.log(`文件${file}无变化，不需要重新打包`);
    }
    if (REQUIRE_RE_NPM_INSTALL) {
      console.log("rebuild");
      const dir = path.dirname(`.cache/${file}`);
      ensureDirSync(dir);

      // 现在可以安全地写入文件
      writeFileSync(`.cache/${file}`, CURRENT_GIT_HEAD);
    }
  });
}
