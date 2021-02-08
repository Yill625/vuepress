# 参考地址

[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[官方市场](https://github.com/marketplace?type=actions)

[github-actions-for-web-apps](https://lukeboyle.com/blog-posts/2019/08/github-actions-for-web-apps)

需要在仓库的 setting GitHub pages 中将 分支改为 gh-pages

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gng9fhexewj313008uab9.jpg)

## 基本概念

GitHub Actions 有一些自己的术语。

1. workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。

2. job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

3. step（步骤）：每个 job 由多个 step 构成，一步步完成。

4. action （动作）：每个 step 可以依次执行一个或多个命令（action）。

[构建完成的地址](https://yill625.github.io/github-actions-demo/)
