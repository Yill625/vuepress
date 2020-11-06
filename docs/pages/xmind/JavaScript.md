# JavaScript

## 数据类型

### 概念篇

#### 7 种原始数据类型

1. boolean
2. string
3. number
4. null
5. undefined
6. biglnt
7. symbol

#### 引用类型

1. 普通对象 Object {}
2. 数组对象 Array []
3. 正则对象 RegExp / /
4. 数字函数 Math
5. 函数对象 Function
6. 日期对象 Date
7. 包装对象 Boolean Number String

#### null 是对象吗

> null 不是对象
>
> > 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。JS 在运行之前编译成二进制形式，在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

#### 1.toString()或者(1).toString 为什么可以调用？

> 数字后面的第一个点会被解释为小数点，而不是点调用。只不过不推荐这种使用方法，而且这样做也没什么意义

#### 为什么基本类型却可以直接调用引用类型的方法呢

> 其实是 js 引擎在解析上面的语句的时候，会把这三种基本类型解析为包装对象（就是下面的 new String()），而包装对象是引用类型可以调用 Object.prototype 上的方法。

#### 0.1+0.2 为什么不等于 0.3？

> 简单理解 0.1 和 02 不能被二进制浮点数精确表示

> > 在 JS 中数字采用的 IEEE 754 的双精度标准进行存储，像 0.1 这样的数值用二进制表示你就会发现无法整除，最后算下来会是 0.000110011….由于存储空间有限（双精度是 64 位存储空间），最后根据 IEEE 754 的规则会舍弃后面的数值

> > > 解决方案：利用第三方库:Math.js，decimal.js 0.1+0.2-0.3<Number.EPSILON

### 检测篇

#### typeof 是否能正确判断类型？

> 原理：不同的对象在底层都表示为二进制，在 Javascript 中二进制前（低）三位存储其类型信息。

> 对于原始类型 除了 null 都可以 对于引用类型 处理 function 都是 object

#### instanceof 能判断基本数据类型

> 原理：用来比较一个对象是否为某一个构造函数的实例

```js
// 手写instanceof
function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== 'object' || left === null) return false
  //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left)
  while (true) {
    //查找到尽头，还没找到
    if (proto == null) return false
    //找到相同的原型对象
    if (proto == right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

#### Object.is 和===的区别？

> Object 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0 和-0(false)，NaN 和 NaN(true)。

#### Object.prototype.toString 判断所有类型

```js
Object.prototype.toString.call(12)
// "[object Number]"
```

### 类型转换

#### JS 中类型转换有哪几种？

1. 转换为数字
2. 转换为字符串
3. 转换为布尔值

#### == 和=== 有什么区别

1. ===严格相等 除了两边的值相等 两边的类型也要相等
2. ==不像===那样严格，对于一般情况，只要值相等，就返回 true，但==还涉及一些类型转换，它的转换规则如下：（比较最终都是转化为数字的）
   1. 两边的类型是否相等 如果相同的话比值得大小
   2. 两边是否是 null 和 undefined 是的话就返回 true
   3. 两边一边是 string 一边是 number 是的话将 string 转换为 number 在比较
   4. 判断是否一方是 Boolean 是的话把 Boolean 转换为 Number 在比较
   5. 如果一方是 Object 且另一方是 String Number Symbol 会先将 Object 转为 String ，在比较

#### 对象转换为原始类型的流程

1. 是否存在 Symbol.toPrimitive()方法，优先调用返回
2. 调用 valueOf(),如果转换了原始类型，则返回
3. 调用 toString(),如果转换了原始类型，则返回
4. 如果都没有返回，则会报错

#### 如何让 if(a == 1 && a == 2)条件成立？

```js
const a = {
  index: 0,
  valueOf: function() {
    this.index++
    return this.index
  }
}
```

## 拷贝

### 浅拷贝 shallowClone

> 一个新的对象直接拷贝已存在的对象的对象属性的引用，就是浅拷贝，

1. Object.assign()
2. ... 展开运算符
3. concat 浅拷贝数组
4. slice 浅拷贝

### 深拷贝

## this 指向

## JS 数组

## JS 如何实现继承

## 原型链

## DOM 事件
