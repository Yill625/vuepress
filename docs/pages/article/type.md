# 类型

## 1.JavaScript 规定了几种语言类型

> ECMAScript 标准规定了 7 种数据类型，其把这 7 种数据类型又分为两种：原始类型和对象类型。

- 基本类型

  - Null：只包含一个值：null
  - Undefined：只包含一个值：undefined
  - Boolean：包含两个值：true 和 false
  - Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
  - String：一串表示文本值的字符序列
  - Symbol：一种实例是唯一且不可改变的数据类型
  - (在 es10 中加入了第七种原始类型 BigInt，现已被最新 Chrome 支持)

- 引用数据类型

  - 普通对象 {}
  - 数组对象 []
  - 正则对象 /^\$/
  - 日期对象 Date
  - 数学函数对象 Math
  - 函数 function

## 2.JavaScript 对象的底层数据结构是什么 理解值类型和引用类型

> JavaScript 中的原始类型的值被直接存储在栈中，在变量定义时，栈就为其分配好了内存空间

- 栈内存：

  - 存储的值大小固定
  - 空间较小
  - 可以直接操作其保存的变量，运行效率高
  - 由系统自动分配存储空间

![栈内存](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/08/04/62zQaxyJy66Nd1WCaOHNHBFaBmkEv4cOFNTe0APC.png)

> 相对于上面具有不可变性的原始类型，我习惯把对象称为引用类型，引用类型的值实际存储在堆内存中，它在栈中只存储了一个固定长度的地址，这个地址指向堆内存中的值。

- 堆内存：
  - 存储的值大小不定，可动态调整
  - 空间较大，运行效率低
  - 无法直接操作其内部存储，使用引用地址读取
  - 通过代码进行分配空间

![堆内存](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/08/04/HYjVkWogC8TUMaRyKZUADBEH9sfhUcgMy6u3yTR1.png)

## 3.基本类型对应的内置对象，以及他们之间的装箱拆箱操作

### 包装类型

> 引用类型和包装类型的主要区别就是对象的生存期，使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而自基本类型则只存在于一行代码的执行瞬间，然后立即被销毁，这意味着我们不能在运行时为基本类型添加属性和方法。

- Boolean
- String
- Number

### 装箱与拆箱

> 装箱转换：把基本类型转换为对应的包装类型
>
> 拆箱转换：把引用类型转换为基本类型

- 引用类型转换为 Number 类型，先调用 valueOf，没有返回基本类型，再调用 toString
- 引用类型转换为 String 类型，先调用 toString，没有返回基本类型，再调用 valueOf

## 4.至少可以说出三种判断 JavaScript 数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

- typeof 操作符可以准确判断一个变量是否为下面几个原始类型
- instanceof 操作符可以帮助我们判断引用类型具体是什么类型的对象
- 每一个引用类型都有 toString 方法，默认情况下，toString()方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型

![判断类型](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/08/04/V94vertfvp4M3ZgxUUup7eSozwqy9snxffvgEkk1.png)

## 5.可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用

- 场景
  - if 语句和逻辑语句
  - 各种运数学算符（- \* /）
  - ==

![类型转换](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/08/04/b19yqaOkAKfapmkhhnzB2RIYewSlzgBIIP4p97jm.png)

### 参考地址

[【JS 进阶】你真的掌握变量和类型了吗](https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-9)
