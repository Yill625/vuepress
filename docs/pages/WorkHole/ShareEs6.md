# let 和 const 命令

## 基本用法

> 1.声明的变量，只在 let const 命令所在的代码块内有效
> 2.const 声明一个只读的常量。一旦声明，常量的值就不能改变

```js
{
  let a = 10
  var b = 1
  const c = 100
}

a // ReferenceError: a is not defined.
b // 1
c // 100
```

## 不存在变量提升

> var 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 undefined

```js
// var 的情况
console.log(foo) // 输出undefined
var foo = 2
// 等价于 var 会变量提升
var foo
console.log(foo)
foo = 2
// let 的情况
console.log(bar) // 报错ReferenceError
let bar = 2
```

## 暂时性死区（TDZ）

> 在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

```js
var tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```

## 实际应用

> 90% 的场景都用 const 。当需定义基本类型且后续会改变时使用 let

---

# 变量的解构赋值

> ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

## 1.数组的结构赋值

```js
let [foo, [[bar], baz]] = [1, [[2], 3]]
foo // 1
bar // 2
baz // 3

let [, , third] = ['foo', 'bar', 'baz']
third // "baz"

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4]
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a']
x // "a"
y // undefined
z // []
```

## 2.对象的结构

> 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' }
baz // undefined
```

## 实际应用

> react 用经常使用结构来获取 state 和 props 中的数据 方便后续的一个展示

```js
const { data, loading } = this.state
const { loading } = this.props

let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309]
}

let { id, status, data: number } = jsonData

console.log(id, status, number)
```

> 交换变量的值

```js
let x = 1
let y = 2

;[x, y] = [y, x]
```

> 从函数返回多个值

```js
// 返回一个数组 hooks useState()
function example() {
  return [1, 2, 3]
}
let [a, b, c] = example()

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  }
}
let { foo, bar } = example()
```

---

# 函数参数的默认值

## 基本用法

```js
function log(x, y = 'World') {
  console.log(x, y)
}

// 参数变量是默认声明的，所以不能用let或const再次声明
function foo(x = 5) {
  let x = 1 // error
  const x = 2 // error
}

//如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

function foo(x = 5, y = 6) {
  console.log(x, y)
}

foo(undefined, null)
// 5 null
```

---

# rest 参数

> ES6 引入 rest 参数（形式为 **_...变量名_** ），用于获取函数的多余参数，这样就不需要使用 arguments 对象了

```js
function add() {
  console.log(arguments[0])
}
add(1) //1
// rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中
function add(...values) {
  let sum = 0

  for (const val of values) {
    sum += val
  }

  return sum
}

add(2, 5, 3) // 10
```

---

# 箭头函数

## 基本用法

```js
// 函数参数为一个时 可以省略两边括号 只有一个表达式时可以省略return 和大括号
const f = v => v

// 等同于
const f = function(v) {
  return v
}

// 没有参数时 也要写（）
const f = () => 7
```

# 扩展运算符(数组的结构赋值 对象的结构赋值)

> 扩展运算符（spread）是三个点（**_..._**）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```

## 实际应用

### 复制数组 浅拷贝

```js
const a1 = [1, 2]
// 写法一
const a2 = [...a1]
// 写法二
const [...a2] = a1
```

### 合并数组

```js
const arr1 = ['a', 'b']
const arr2 = ['c']
const arr3 = ['d', 'e']

// ES5 的合并数组
arr1.concat(arr2, arr3)
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]

// React 修改state中数组
const list = [...this.state.list,...nextList]

this.setState({
  list
})
```

### 与解构赋值结合

```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// 扩展运算符还可以将字符串转为真正的数组
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

# 属性的简洁表示法

> ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
const foo = 'bar'
const baz = { foo }
baz // {foo: "bar"}

// 等同于
const baz = { foo: foo }

const o = {
  method() {
    return 'Hello!'
  }
}

// 等同于

const o = {
  method: function() {
    return 'Hello!'
  }
}
```

# 链判断运算符

```js
// 错误的写法
const firstName = message.body.user.firstName

// 正确的写法
const firstName =
  (message &&
    message.body &&
    message.body.user &&
    message.body.user.firstName) ||
  'default'
// best
const firstName = message?.body?.user?.firstName || 'default'
const fooValue = myForm.querySelector('input[name=foo]')?.value
```

# Null 判断运算符

```js
// 读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值
const headerText = response.settings.headerText || 'Hello, world!'
const animationDuration = response.settings.animationDuration || 300
const showSplashScreen = response.settings.showSplashScreen || true

const headerText = response.settings.headerText ?? 'Hello, world!'
const animationDuration = response.settings.animationDuration ?? 300
const showSplashScreen = response.settings.showSplashScreen ?? true
```

# Set 和 Map 数据结构
