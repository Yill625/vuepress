# 变量

- [ES6 系列之模拟实现 Symbol 类型](https://github.com/mqyqingfeng/Blog/issues/87)
- [ECMAScript6 入门 Symbol](https://es6.ruanyifeng.com/#docs/symbol)
- [JavaScript 深入之浮点数精度](https://juejin.im/post/6844904093601759239)

- [MDN Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

- [js 中精度问题以及解决方案](https://xwjgo.github.io/2018/03/17/js%E4%B8%AD%E7%B2%BE%E5%BA%A6%E9%97%AE%E9%A2%98%E5%8F%8A%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)

## 1.Symbol 类型在实际开发中的应用、可手动实现一个简单的 Symbol

## 2.JavaScript 中的变量在内存中的具体存储形式

### 栈内存和堆内存

> JavaScript 中的变量分为基本类型和引用类型 基本类型是保存在栈内存中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问
>
> 引用类型是保存在堆内存中的对象，值大小不固定，栈内存中存放的该对象的访问地址指向堆内存中的对象，JavaScript 不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用

## 3.null 和 undefined 的区别

### undefined

> undefined 的字面意思就是：未定义的值 。这个值的语义是，希望表示一个变量最原始的状态，而非人为操作的结果 。 这种原始状态会在以下 4 种场景中出现：

- 1、声明一个变量，但是没有赋值
- 2、访问对象上不存在的属性或者未定义的变量
- 3、函数定义了形参，但没有传递实参
- 4、使用 void 对表达式求值

### null

> null 的字面意思是：空值 。这个值的语义是，希望表示一个对象被人为的重置为空对象，而非一个变量最原始的状态 。 在内存里的表示就是，栈中的变量没有指向堆中的内存对象。

- 如果定义的变量在将来用于保存对象，那么最好将该变量初始化为 null
- 当一个数据不再需要使用时，我们最好通过将其值设置为 null 来释放其引用
- 使用 typeof 操作符检测 null 值返回的类型却是"object"s

## 4.出现小数精度丢失的原因，JavaScript 可以存储的最大数字、最大安全数字，JavaScript 处理大数字的方法、避免精度丢失的方法
