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

## 第 3 章 语言基础

### 语法

- 最佳实践：ECMAScript 标识符使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词
  的首字母大写
- 注释 单行 // 多行 `/* 1212*/`

### 变量

- 最佳实践
  - 不使用 var
  - const 优先 ，let 次之

### 数据类型

ECMAScript 有 6 中原始类型 Symbol String Number Boolean Undefined BigInt（ECMA2020）
typeof 可以判断原始类型,除了 null 因为特殊值 null 被认为是一个对空对象的引用

- undefined
  - 永远不必显式地将变量值设置为 undefined
- null
  - `console.log(typeof null); // "object"`
  - 作为空对象初始值
- boolean
  - 其他值转换为布尔类型的情况
    | 数据类型 | 转换为 true 的值 | 转换为 false 的值 |
    | ---------------------------------- | :----------------------------------------------: |:-:|
    | String |非空字符串 |""|
    | Number | 非零数值（包括无穷值） |0 NAN|
    | Symbol | 任意值 |--|
    | BigInt | 非零数值 |0 |
    | Object | 任意对象 |null|
- number
  > Number 类型使用 IEEE 754 格式表示整
  > 数和浮点值（在某些语言中也叫双精度值）。
  - 浮点值
    0.1+0.2 不要测试某个特定的浮点值
  - 值得范围
    - ECMAScript 可以表示的最小数值保存在 Number.MIN_VALUE 5e-324  
      Number.MAX_VALUE 是 1.797 693 134 862 315 7e+308
    - 正无穷 Infinity 负无穷 -Infinity
    - 要确定一个值是不是有限大（即介于 JavaScript 能表示的最小值和最大值之间），可以使用 isFinite()函数，
  - NaN (Not a Number)
    > 用于表示本来要返回数值的操作失败了（而不是抛出错误）。
  - 其他值转换为数字类型的情况
    | 数据类型 | 转换为 true 的值 |
    | ---------------------------------- | :----------------------------------------------: |
    | Number| 直接返回 |
    | Symbol | TypeError |
    | BigInt | 直接返回 |
    | null | 0 |
    | undefined | NaN|
    | 对象 | 调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString()方法，再按照转换字符串的规则转换。|
  - 字符串转为数字类型
    1. 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面的零）。
    2. 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
    3. 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
    4. 如果是空字符串（不包含字符），则返回 0。
    5. 如果字符串包含除上述情况之外的其他字符，则返回 NaN。
  - 使用 parseInt()转换数字类型取整
    > 通常在需要得到整数时可以优先使
    > 用 parseInt()函数。parseInt()函数更专注于字符串是否包含数值模式。字符串最前面的空格会被
    > 忽略，从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，parseInt()立即
    > 返回 NaN。这意味着空字符串也会返回 NaN（这一点跟 Number()不一样，它返回 0）。如果第一个字符
    > 是数值字符、加号或减号，则继续依次检测每个字符，直到字符串末尾，或碰到非数值字符。
  - 使用 parseFloat()转换数字类型浮点型
    > parseFloat()函数的另一个不同之处在于，它始终忽略字符串开头的零。这个函数能识别前面讨
    > 论的所有浮点格式，以及十进制格式（开头的零始终被忽略）。十六进制数值始终会返回 0。因为
    > parseFloat()只解析十进制值，因此不能指定底数。最后，如果字符串表示整数（没有小数点或者小
    > 数点后面只有一个零），则 parseFloat()返回整数。
