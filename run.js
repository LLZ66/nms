const { exec } = require("child_process");
const { stderr } = require("process");

// 定义要检查的文件夹数组
const folders = ["a", "b", "c", "d"];

// 获取上一次提交的哈希值
const REQUIRE_RE_NPM_INSTALL = false;
for (let file of folders) {
  exec('git log -1 --format="%H" ', (error, stdout, stderr) => {
    console.log(stdout);
  });
}
