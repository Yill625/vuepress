# prettier

- https://prettier.io/
- [Prettier 看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012)
- [ESLint+Prettier 代码规范实践](https://zhuanlan.zhihu.com/p/68026905)

## 安装

1. 编辑器安装 Prettier 插件
2. 代码里引入依赖

```shell
npm install --save-dev --save-exact prettier

or

yarn add prettier -D

```

使用命令行执行全局格式化

yarn prettier --write .

检查全局格式化的情况

yarn prettier --check .

## 使用 Eslint 与 prettier 进行格式化

Lint 和 prettier 区别
那 ESLint 和 Prettier 的区别是什么呢？eslint（包括其他一些 lint 工具）的主要功能包含代码格式的校验，代码质量的校验。而 Prettier 只是代码格式的校验（并格式化代码），不会对代码质量进行校验。代码格式问题通常指的是：单行代码长度、tab 长度、空格、逗号表达式等问题。而代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。

1. 安装依赖 eslint-config-prettier
   > 它关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则

> 自己的理解
> prettier 为主配置自动格式化整体的代码风格
> Elint 为辅助对于常规的空格呀换行等皆以 prettier 为主

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixwlwv1uj31f40pcagn.jpg)

eslint-plugin-prettier
