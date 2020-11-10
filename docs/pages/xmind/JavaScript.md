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

> 继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或者新的功能，也可以用父类的功能，但不能选择性的继承父类。通过使用继承我们能够非常方便地复用以前的代码，大大增加开发效率

1. 原型链继承

```js
function Parent() {}
function Son(name) {}
Son.prototype = new Parent()

// 缺点1. 当修改子类的继承的引用属性时 会修改所有子类
// 缺点2. 创建子类型的实例时，不能向超类型的构造函数中传递参数
```

2. 借用 Call
   > 相比原型链 属性都有自己独立副本 子类型构造函数中向超类型构造函数传递参数

```js
function Parent(name) {
  this.name = name
}

function Son(name) {
  Parent.call(this, name)
}

const son = new Son('son')

console.log(son.name)
// 缺点 在超类型的原型中定义的方法，对子类型而言也是不可见的
```

3. 组合继承

> 将构造函数式继承和原型链式继承组合

```js
function Parent(name) {
  this.name = name
}
Parent.prototype.getParentName = function() {
  return this.name
}
function Son(name, age) {
  Parent.call(this, name)
  this.age = age
}

Son.prototype = new Parent()

Son.prototype.getSonAge = function() {
  return this.age
}

const son = new Son('ivan', 18)
console.log(son.getParentName())
console.log(son.getSonAge())

// 缺点 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部
```

4. 原型式继承

> 使用 Object.create() 借助原型可以基于已有的对象创建新对象
> [mdn-Oject.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
> Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**

```js
var person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}

var anotherPerson = Object.create(person, {
  name: {
    value: 'Greg'
  }
})
anotherPerson.__proto__ === person
console.log(anotherPerson.name) //"Greg"
// 缺点和原型链继承一样 原型的引用属性和子属性共享
```

5. 寄生式继承

> 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有的工作一样返回对象。

```js
function createObject(obj) {
  const clone = Object.create(obj)
  clone.sayHi = function() {
    console.log('hi')
  }
  return clone
}

var person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}

var anotherPerson = createObject(person)
anotherPerson.sayHi() //"hi

// 缺点：使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似
```

6. 寄生组合式继承

> 理想的继承方式

```js
function Parent(name) {
  this.name = name
}

Parent.prototype.sayName = function() {
  console.log(this.name)
}

function Son(name, age) {
  Parent.call(this, name)
  this.age = age
}

function initExtend(Son, Parent) {
  const prototype = Object.create(Parent.prototype)
  prototype.construction = Son
  Son.prototype = prototype
}

initExtend(Son, Parent)

Son.prototype.sayAge = function() {
  console.log(this.age)
}

const son = new Son('ivan', 18)

console.log(son.sayAge())
console.log(son.sayName())
```

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

### 绑定事件的方法

1. HTML 的内联属性

```html
<button onClick="alert('click')"></button>
```

2. 元素的 onXXX 属性添加事件

```js
document.getElementById('button').onClick = function() {
  alert('click')
}
```

3. addEventListener
   - 标准方法 el.addEventListener(EventName,handle,optios|useCapture )
     - EventName: 时间名称
     - handle: 事件函数
     - useCaptrue: 是否在捕获阶段触发事件，默认 false
     - options: options 选项
   - 移除事件 el.removeEventListener(EventName,handle)

```js
const alertF = function() {
  alert('click')
}
document.getElementById('button').addEventListener('click', alertF)
document.getElementById('button').removeEventListener('click', alertF)
```

4. IE8 兼容处理

   - el.attachEvent(EventName,handle)
   - el.depachEvent(EventName,handle)

5. 对比
   - 只支持冒泡
   - this 指向 window
   - 绑定的顺序倒叙执行
   - 事件名要加'on'

### 事件对象

- 标准
  - 属性
    - currentTarget：currentTarget 的值始终等于 this，即指向事件所绑定到的元素
    - target: 指向真正触发事件的元素
    - bubbles: 表示事件是否冒泡
    - cancelable: 是否可以取消默认行为
    - defaultPrevented: 为真时调用了 preventDefault()
    - detail: 描述事件的细节
    - eventPhase: 描述事件处理函数的阶段 1. 捕获 2. 处于目标 3. 冒泡
    - trusted: 为真则是浏览器原生事件,为假则是手动添加的事件
    - type: 事件类型
  - 方法
    - event.preventDefault() 阻止默认事件
    - event.stopPropagation() 阻止冒泡，也可以阻止捕获（根据 DOM 的事件流，捕获阶段被阻止了处于目标阶段的和事件冒泡也就不会被触发）
    - event.stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其他监听器被触发
      - react 使用合成事件，如果出现点击空白区域弹框消失，可以利用 stopImmediatePropagation 阻止事件的其它函数执行 （只执行我这个事件的回调函数,其它不执行）因为我都冒泡到 document 上了，阻止冒泡没什么用了，另外一种解决方法关闭操作注册到 window 上
      - stopImmediatePropagation 这个解决问题的不是阻止冒泡 而是不允许其他的事件回调触发 因为我们这时候事件已经冒泡到 document 上了 为 document 再绑定了一个 click 事件 此时我们想触发按钮这个 click 事件（实际绑定到 document 上）触发以后，不允许再触发其他 document 上 click 的事件回调函数
- IE
  - 属性
    - srcElement：与 target 的值相同
    - returnValue：默认为真，若设置为 false，可以阻⽌默认事件
    - cancelBubble：默认为假，设置为 true 可以阻⽌冒泡
  - 方法
    - el.attachEvent：回调中的 event 可以为传⼊的 event 参数也可为 window.event

### DOM 事件流

> 事件流： 描述的是从页面中接收事件的顺序

#### 执行的三个阶段

1. 事件捕获，当事件发生时，首先发生的是事件捕获，为父元素截获事件提供了机会
2. 处于目标，事件到了具体元素时，在具体元素上发生，并且被看成冒泡阶段的一部分
3. 事件冒泡，冒泡阶段发生，事件开始冒泡

#### 注意点

1. DOM 事件流确实会按照这三个阶段执行，我们可以通过 addEventListener 注册事件时候指定 useCapture 的值来规定事件在捕获阶段还是冒泡阶段中执行（如果该对象是目标对象，则会在目标阶段执行）
2. 你会注意到按照 DOM 事件流这种执行顺序，事件不会被触发两次吧，造成重复触发，并不是的，我们可以有选择是在冒泡阶段触发还是捕获阶段，默认是冒泡阶段

### [多种事件](https://www.runoob.com/jsref/dom-obj-event.html)

#### UI 事件

1. load
   - window 上触发：页面完全加载完，包括所有图像，js 文件，css 文件，object 内嵌对象等等
   - `<script><link>`:js 文件或 css 文件加载成功后，script 标签只支持内联属性
2. resize 窗口发生变化时
3. scroll

   - window 上触发，页面发生滚动时，
   - 元素，可滚动元素发生滚动时

4. 焦点 可以捕获 不能冒泡

   - focus
   - blur

#### 鼠标与滚轮事件

#### 文本事件

#### HTML5 事件

### DOM 事件模型

1. DOM0 级事件 on-event (HTML 属性)
2. DOM1 级事件 没有 1 级 DOM。DOM 级别 1 于 1998 年 10 月 1 日成为 W3C 推荐标准。1 级 DOM 标准中并没有定义事件相关的内容，所以没有所谓的 1 级 DOM 事件模型
3. DOM2 级事件 el.addEventListerer(EventName,handle,useCarture) 规定了 DOM 事件流
4. DOM3 级事件 在 DOM2 级事件的基础上添加了更多的事件类型

### 事件代理（事件委托）

- 由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
- 优点:减少内存消耗，提高性能
- 通过 e.currentTarget 拿到目标对象
