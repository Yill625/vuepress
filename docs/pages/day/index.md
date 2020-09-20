# JavaScript 基础

## [原型与原型链](https://github.com/mqyqingfeng/Blog/issues/2)

### prototype

> 每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype

### `__proto__`

> 这是每一个 JavaScript 对象(除了 null )都具有的一个属性，叫`__proto__`，这个属性会指向该对象的原型

### constructor

> 指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数

1. 构造函数
2. 实例
3. 原型对象

相关文章
[最详尽的 JS 原型与原型链终极详解，没有「可能是](https://www.jianshu.com/p/dee9f8b14771)

### ！三者之间的关系

> `实例与原型`-当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止

> `原型的原型`-原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 `__proto__` 指向`构造函数`的 prototype

### 原型链

> 实例的`__proto__`串联起来

---

## [执行上下文](https://github.com/mqyqingfeng/Blog/issues/8)

> 每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。

### 执行上下文的类型

- 全局执行上下文
  > 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文
- 函数执行上下文
  > 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤
- Eval 函数执行上下文
  > 执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它

### 怎么创建执行上下文

`在真正执行代码前会创建执行上下文`

在创建阶段会发生三件事:

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

```js
globalContext = {
  VO: [global],
  Scope: [globalContext.VO],
  this: globalContext.VO
}
```

<!-- 初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]

## 闭包 https://github.com/mqyqingfeng/Blog/issues/9

f 执行上下文维护了一个作用域链

```js
fContext = {
  Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
``` -->

---

### 变量对象

变量对象包括

1. 函数的所有形参 (如果是函数上下文)
   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 undefined
2. 函数声明
   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
     3 变量声明
   - 由名称和对应值（undefined）组成一个变量对象的属性被创建
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

### 作用域链

> 一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的?

### 词法作用域

词法作用域也叫静态作用域 在函数定义的时候就确定了函数的作用域

一个函数能够访问上下文中定义的变量 就叫词法作用域

#### 函数创建

!!! [[scope]] 并不代表完整的作用域链！

```js
function foo() {
    function bar() {
        ...
    }
}


foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
]
```

#### 函数激活

> 当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端 这时候执行上下文的作用域链，我们命名为 Scope

```js
Scope = [AO].concat([[Scope]])
```

### this 的调用

> 严格模式下 函数调用 this 指向 undefined

1. 作为对象调用时，指向该对象 obj.b(); // 指向 obj
2. 作为函数调用, var b = obj.b; b(); // 指向全局 window
3. 作为构造函数调用 var b = new Fun(); // this 指向当前实例对象
4. 作为 call 与 apply 调用 obj.b.apply(object, []); // this 指向当前的 object

### call

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```js
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

### apply

> 参数接收的是一个数组

```js
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result
}
```

---

## 路由懒加载和异步组件是使用了浏览器预加载 prefetch 的技术来实现的

> 目的是等到需要加载内容时在获取预加载缓存的资源来达到快速加载

## code spiltting 使用 webpackChunkName 来定义

## tree shaking 是情理 js 中没有使用的依赖 前提 esmdule mode==production
