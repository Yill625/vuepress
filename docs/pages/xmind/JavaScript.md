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

```js
// Object.assign()
const obj = { a: 1 }
const copy = Object.assign({}, obj)
console.log(copy) // { a: 1 }
// 2. ... 展开运算符
const arr1 = [1, 2]
const arr2 = [...arr1]
// 3. concat 浅拷贝数
const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f']
const array3 = array1.concat(array2)

console.log(array3)
// expected output: Array ["a", "b", "c", "d", "e", "f"]
// 4. slice 浅拷贝
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(2))
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4))
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5))
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

### 深拷贝 deepClone

> 深拷贝会另外拷贝一份一个一模一样的对象,从堆内存中开辟一个新的区域存放新对象,新对象跟原对象不共享内存，修改新对象不会改到原对象。

#### JSON.pares(JSON.stringify()) 的使用问题

1. 无法解决循环引用的问题
2. 无法拷贝特殊的对象 RegExp Date Set Map
3. 无法拷贝函数

#### 实现一个深拷贝

1. 原始类型
   - 直接返回
2. 引用类型
   - 循环引用
     > 解决方案： 辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝
   - 可遍历类型
     - Set
     - Map
     - Array
     - Object
   - 不可遍历类型
     - Boolean
     - Number
     - Date
     - Error
     - Symbol Object(Symbol.prototype.valueOf.call(target))
   - 函数 lodash 对函数的处理 因为拷贝函数没有啥意义
     - 箭头函数 我们可以直接使用 eval 和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。
     - 非箭头函数 分别使用正则取出函数体和函数参数，然后使用 new Function ([arg1[, arg2[, ...argN]],] functionBody)构造函数重新构造一个新的函数

[如何写出一个惊艳面试官的深拷贝?](https://segmentfault.com/a/1190000020255831)

### 赋值

#### 基本数据类型：赋值，赋值之后的两个变量互不影响

#### 引用数据类型：赋 “址” ，两个变量具有相同的引用，指向同一个对象，相互之间有影响

#### 为什么需要浅拷贝和深拷贝？

1. 对引用类型进行赋**址**操作，两个变量指向同一个对象，改变变量 a 之后会影响变量 b，哪怕改变的只是对象 a 中的基本类型数据
2. 通常在开发中并不希望改变变量 a 之后会影响到变量 b，这时就需要用到浅拷贝和深拷贝。

## this 指向

### 显式绑定

#### call

```js
/**
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
**/

Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn(' + args + ')')

  delete context.fn
  return result
}
```

#### apply

```js
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn

```

#### bind

```js
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function() {}

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

### 隐式绑定

1. 全局上下文 全局上下文默认的 this 指向 window，严格模式下指向 undefined
2. 直接调用函数 this 相当于调用全局上下文的情况
3. 对象.方法的调用 谁调用这个方法，他就指向谁
4. DOM 事件绑定（特殊） onClick addEventerListener 中 this 默认指向绑定事件的元素
5. new 构造函数绑定 指向实例对象
6. 箭头函数 箭头函数没有 this, 因此也不能绑定。里面的 this 会指向当前最近的非箭头函数的 this，找不到就是 window(严格模式是 undefined)

## JS 数组

### 函数的 arguments 为什么不是数组？如何转化为一个数组

#### 常见的类数组

1. arguments
2. 用 getElementsByTagName/ClassName()获得的 HTMLCollection
3. 用 querySelector 获得的 nodeList

#### 类数组转换为数组的方式

1. Array.prototype.slice.call()
2. Array.from()
3. ... 展开运算符

```js
function arr(a, b) {
  console.log(Array.prototype.slice.call(arguments)) //[1,2]
  console.log(Array.from(arguments))
  console.log([...arguments])
}

arr(1, 2)
```

#### 对象转换为数组

1. Array.from() 对象的 length 起关键作用
2. Object.values()
3. Object.keys()
4. Object.entries()

### forEach 中 return 有效果吗？如何中断 forEach 循环

#### 在 forEach 中用 return 不会返回，函数会继续执行

#### 中断方法

1. 使用 some every 来中断返回 some 返回 true every 中返回 false

```js
const arr = [1, 2, 3, 4]
const isHasEven = arr.some(item => {
  if (item % 2 === 0) return true
})

const isAllEven = arr.every(item => {
  if (item % 2 !== 0) return false
})
```

### JS 判断数组中是否包含某一个值

```js
// 1. array.indexOf
const arr = [1, 2, 3, 4]
console.log(arr.indexOf(1)) // 0

// 2. includes() 组数中是否包含某元素
console.log(arr.includes(2)) // true

// 3. find() 方法返回数组中满足提供的测试函数的第一个元素的值 没找到返回undefined
arr.find(item => {
  return item === 3
}) // 3 返回找到的元素

// 4. findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引 若没有找到对应元素则返回-1。
arr.findIndex(item => {
  return item === 4
}) // 3 返回找到的元素索引
```

### 数组扁平化

1. 递归
2. reduce 加递归
3. 原型链上的 flat 方法

```js
/* ES6 递归*/
const flatten = arr => {
  let result = []
  arr.forEach((item, i, arr) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item))
    } else {
      result.push(arr[i])
    }
  })
  return result
}

const arr = [1, [2, [3, 4]]]
console.log(flatten(arr))
```

```js
// concat recude
function flatten(arr) {
  return arr.reduce(function(prev, cur) {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

const arr = [1, [2, [3, 4]]]
console.log(flatten(arr))
```

```js
// flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
const arr1 = [0, 1, 2, [3, 4]]

console.log(arr1.flat())
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]]

console.log(arr2.flat(2))
// expected output: [0, 1, 2, [3, 4]]
```

### Js 数组的高阶函数

1. map

```js
const a = [1, 2].map(item => item * 2) // [2,4]
```

2. reduce

```js
const sum = [1, 2].reduce((pre, res) => {
  return pre + res
}, 0) // 3
```

3. filter

```js
const even = [1, 2].filter(item => item % 2 === 0) // [2]
```

4. sort

```js
const sort = [2, 1].sort((a, b) => a - b) // [1,2]
```

## JS 如何实现继承

## 原型链

### 原型对象和构造函数有什么关系

1. 在 JavaScript 中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个 prototype 属性，这个属性指向函数的原型对象。
2. 当函数经过 new 调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

### 描述下原型链

1. 首先要明白实例的`__proto__`属性与构造函数的`prototype`属性都是指向原型对象，原型对象的 constructor 属性指向构造函数
2. JavaScript 对象通过`__proto__`属性指向父类原型对象，直达指向 Object 的原型对象为止，这样就形成了一个原型指向的链条，即原型链
3. 对象的 hasOwnPrototype()来检查对象自身是否存在该属性
4. 使用 in 检查对象中是否有该属性时，如果该属性自身对象没有 但是原型链中有 也是返回 true

```js
function Person() {}

const person = new Person()

person.__proto__ === Person.prototype
Person.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
```

## DOM 事件
