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

## 第 2 章 HTML 中的 JavaScript

- 推迟执行脚本

  > HTML 4.01 为`<script>`元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改
  > 变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在`<script>`元素上
  > 设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。

- 异步执行脚本
  > 给脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到
  > 该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM

### 总结

- JavaScript 是通过`<script>`元素插入到 HTML 页面中的。这个元素可用于把 JavaScript 代码嵌入到
  HTML 页面中，跟其他标记混合在一起，也可用于引入保存在外部文件中的 JavaScript。本章的重点可
  以总结如下。

  - 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同
    一台服务器上，也可以位于完全不同的域。
  - 所有`<script>`元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的
    情况下，包含在`<script>`元素中的代码必须严格按次序解释。
  - 对不推迟执行的脚本，浏览器必须解释完位于`<script>`元素中的代码，然后才能继续渲染页面
    的剩余部分。为此，通常应该把`<script>`元素放到页面末尾，介于主内容之后及`</body>`标签
    之前。
  - 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出
    的次序执行。
  - 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异
    步脚本不能保证按照它们在页面中出现的次序执行。
  - 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启
    用脚本，则`<noscript>`元素中的任何内容都不会被渲染。

### 思考

- link script 引入外部 js 的区别
- link 的 [preload](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content) prefetch 作用
  - 通过 `rel="preload" as="${type}"`进行内容预加载
  - 通过 `rel="prefetch"`进行内容懒加载
  - [使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)
