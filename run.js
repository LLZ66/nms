const { exec } = require("child_process");

// 定义要检查的文件夹数组
const folders = ["a", "b", "c", "d"];

// 获取上一次提交的哈希值
exec("git rev-parse HEAD^", (err, lastCommitHash) => {
  if (err) {
    console.error("Error getting last commit hash:", err);
    return;
  }

  lastCommitHash = lastCommitHash.trim();

  folders.forEach((folder) => {
    // 对每个文件夹使用git diff检查变化
    exec(
      `git diff --quiet ${lastCommitHash} HEAD -- ${folder}`,
      (err, stdout, stderr) => {
        if (err) {
          // 如果有错误，意味着发生了变化
          console.log(`Changes detected in ${folder}`);
        } else {
          console.log(`No changes in ${folder}`);
        }
      }
    );
  });
});
