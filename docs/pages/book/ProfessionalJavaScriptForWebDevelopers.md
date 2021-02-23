# JavaScript 高级程序设计（第 4 版）

## 第 1 章 什么是 JavaScript

> 1995 年，JavaScript 问世。当时，它的主要用途是代替 Perl 等服务器端语言处理输入验证。

1. ECMAScript：由 ECMA-262 定义并提供核心功能
2. 文档对象模型（DOM）：提供与网页内容交互的方法和接口
3. 浏览器对象模型（BOM）：提供与浏览器交互的方法和接口

### DOM

> 文档对象模型（DOM，Document Object Model）是一个应用编程接口（API），用于在 HTML 中使
> 用扩展的 XML。DOM 将整个页面抽象为一组分层节点。HTML 或 XML 页面的每个组成部分都是一种
> 节点，包含不同的数据。

- DOM 的级别
  - DOM Level 1 的目标是映射文档结构
  - DOM Level 2 新增了以下模块
    - DOM 视图：描述追踪文档不同视图（如应用 CSS 样式前后的文档）的接口
    - DOM 事件：描述事件及事件处理的接口
    - DOM 样式：描述处理元素 CSS 样式的接口
    - DOM 遍历和范围：描述遍历和操作 DOM 树的接口
  - DOM Level 3 进一步扩展了 DOM，增加了以统一的方式加载和保存文档的方法

### BOM

> IE3 和 Netscape Navigator 3 提供了浏览器对象模型（BOM） API，用于支持访问和操作浏览器的窗口

BOM 主要针对浏览器窗口和子窗口（frame）

- 弹出新浏览器窗口的能力（window.open()）
- 移动、缩放和关闭浏览器窗口的能力
- [navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 对象，提供关于浏览器的详尽信息
- [location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 对象，提供浏览器加载页面的详尽信息
- [screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen) 对象，提供关于用户屏幕分辨率的详尽信息
- [performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 对象，提供浏览器内存占用、导航行为和时间统计的详尽信息
- 对 cookie 的支持
- 其他自定义对象，如 XMLHttpRequest 和 IE 的 ActiveXObject

### 兼容性查询

[mdn](https://developer.mozilla.org)

[Can I USE](https://caniuse.com)
