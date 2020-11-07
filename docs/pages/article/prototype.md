# 原型和原型链

[🚀 图解原型和原型链](https://juejin.im/post/6844903797039300615)

[🔥 继承的几种方式以及他们的优缺点](https://juejin.im/post/6844903839175278600)

[神三元 原生 JS 灵魂之问, 请问你能接得住几个](https://juejin.im/post/6844903974378668039#heading-32)

## 1.理解原型设计模式以及 JavaScript 中的原型规则

![原型链](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/08/04/BAUNLMYJLJ9iboLih4EzpVva6kHBvmTQtcLU8Hhp.png)

## 2.instanceof 的底层实现原理，手动实现一个 instanceof

- [🚀 instanceof 的原理与实现](https://juejin.im/post/6844903985086726158)
  > 核心: 原型链的向上查找。

```js
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

## 4.实现继承的几种方式以及他们的优缺点

1. 构造函数继承

```js
function Parent1() {
  this.name = 'parent1'
}
function Child1() {
  Parent1.call(this)
  this.type = 'child1'
}
console.log(new Child1())
```

> 缺点： 问题是父类原型对象中一旦存在方法那么子类无法继承

2. 原型链继承

```js
function Parent2() {
  this.name = 'parent2'
  this.play = [1, 2, 3]
}
function Child2() {
  this.type = 'child2'
}
Child2.prototype = new Parent2()

console.log(new Child2())
```

> 缺点：两个实例使用的是同一个原型对象。当修改父类引入属性时会同时修改

3. 组合继承

```js
function Parent3() {
  this.name = 'parent3'
  this.play = [1, 2, 3]
}
function Child3() {
  Parent3.call(this)
  this.type = 'child3'
}
Child3.prototype = new Parent3()
var s3 = new Child3()
var s4 = new Child3()
s3.play.push(4)
console.log(s3.play, s4.play)
```

> 缺点：Parent3 的构造函数会多执行了一次（Child3.prototype = new Parent3();）

4. 寄生组合继承方

```js
function Parent5() {
  this.name = 'parent5'
  this.play = [1, 2, 3]
}
function Child5() {
  Parent5.call(this)
  this.type = 'child5'
}
Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5
```

## 5.至少说出一种开源项目(如 Node)中应用原型继承的案例

## 6.可以描述 new 一个对象的详细过程，手动实现一个 new 操作符

1. 创建一个空的简单 JavaScript 对象（即{}）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤 1 新创建的对象作为 this 的上下文 ；
4. 如果该函数没有返回对象，则返回 this。

```js
function newFactory(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj, ...args);

    let isObject = typeof res === 'object' && typeof res !== null;
    let isFunction = typoof res === 'function';
    return isObect || isFunction ? res : obj;
};
```

## 7.理解 es6 class 构造以及继承的底层实现原理

```js
function _possibleConstructorReturn(self, call) {
  // ...
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  // ...
  //看到没有
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var Parent = function Parent() {
  // 验证是否是 Parent 构造出来的 this
  _classCallCheck(this, Parent)
}

var Child = (function(_Parent) {
  _inherits(Child, _Parent)

  function Child() {
    _classCallCheck(this, Child)

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments)
    )
  }

  return Child
})(Parent)
```
