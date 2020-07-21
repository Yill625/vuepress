# JS 中的变量

## 变量的定义方式

- let
- const
- var

## 变量的类型

- 基本数据类型

  - number
  - string
  - boolean
  - null
  - undefined
  - Symbol

- 引用数据类型
  - 普通对象 `{}`
  - 数组对象 `[]`
  - 正则对象 `/^$/`
  - 日期对象 `Date`
  - 数学函数对象 `Math`
  - 函数 `function`

---

### number 数据类型

```js
// 数字包含 正数 负数 0 NaN infinity
const int = 12
const float = 12.2
const NaNNumber = NaN // 不是一个有效的数字但是属于number类型 NaN == NaN false
const InfinityNumber = Infinity // 表示无穷大的值

console.log(3 / 0) // Infinity
console.log(3 / '除数') // NaN
// isNaN() 用来验证一个值是否是一个有效的数字
isNaN(NaN)
// 其他类型转数字类型
Number('1212') //1212
Number('')    //0
Number('ddffs') //NaN
Number(true) //1
Number(false) //0
Number(undefined) //NaN
Number(null) //0
Number({}) // 先把对象转为字符串 再把字符串转为数字 NaN
Number({ toString: () => 1 }) //1 对象转为字符串 会调用对象的toString方法
Number([1212]) //1212
Number([]) //0
Number(['1212']) //1212
Number(['1212', 121]) // NaN

// parseInt 从字符串最左边开始查找，把找到的有效数字字符转为数字，一直遇到一个非有效数字字符为止，则查找结束
parseInt(121) //121
parseInt('121') //121
parseInt('121a121') //121
parseInt(12.12) //12
// parseFloat比parseInt 多识别一位小数
parseFloat(12.12) //12.12
parseFloat('121') //121
parseFloat('121.121') //121.121

// toFixed() 保留小数后的N位（最后的结果是一个字符串）
(121).toFixed(1) // '121.0'
(121.55).toFixed(1) // '121.5'
(121.91).toFixed(1) // '121.9'

// 技巧
+'1212' // 1212
// 思考
1.toFixed(12)
0.2+0.1==0.3
```

![number数据类型](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/07/18/j7T2MBo2XDwdwWkliWYxd2VjGPSkbKktEm35MM7s.png)

---

## string 数据类型

```js
// 用单引号、双引号、反引号，包起来的就是字符串
const a = 'aaaa'

//其他类型转为字符串类型
String(121) //'121'
[].toString() //'' //
['abc','def'].toString() //'abc,def'
({}).toString() //"[object Object]"

// 字符串的数学运算
// -*/ 将字符串转为数字在做运算
console.log('121'-'120')  //  1

// + 只要加号两边任意一边出现字符串，则变为字符串拼接
console.log(100 + true + 21.2+null+undefined+'Tencent'+[]+null+9+false) //NaNTencentnull9false

// es6中的模板字符串
const day = 21
const year = 2020

const date = day+'-'+year //'2020-21'
const dateNew  = `${day}-${year}`//'2020-21'

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar

// 常用的方法 增删改查
const str = 'abcdefgh'
// 获取索引的字符
str.charAt(0) // 'a'
// 截取 从n开始截取m个
str.substr(0,2) //'ab'
str.substr(0) //'abcdefgh'
//
```

![string](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/07/19/pN3MBoQrFlJ5Lj1a6oE3xjHSyagY9BfoLWRuub2Z.png)

---

## boolean 数据类型

```js
// boolean 包含 true false
//其他类型转为布尔类型
Boolean('')
Boolean(0)
Boolean(null)
Boolean(undefined)
Boolean(NaN)
// 除了上面都是false 其他都是true
Boolean({})
Boolean([])
// 取反
!12
// 技巧 取反在取反转为 布尔类型
!!12
```

![boolean](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/07/19/kTaXXPkfDa0zdc7HSaP7WkKupXcvniEnLi9vRD6s.png)

---

## [Symbol 数据类型](https://es6.ruanyifeng.com/#docs/symbol)

> ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值

```js
let s = Symbol()

typeof s
// "symbol"

let s1 = Symbol('foo')
let s2 = Symbol('bar')

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

//作为属性名的 Symbol
let mySymbol = Symbol()

// 第一种写法
let a = {}
a[mySymbol] = 'Hello!'

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
}
```

---

## 普通对象

![普通对象](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/07/19/Dkxw2rP6R1pgisEDIacqfBjMNf96vRtx9V1xueZf.png)

---

## 数组对象

### 基础知识

![数组对象](https://weapposs.oss-cn-shenzhen.aliyuncs.com/cover/2020/07/19/J8163X0LxBaBUDbfH9J4ofiVjnuZoibhU9rf4Pez.png)

### 常用方法

![常用方法](https://weapposs.oss-cn-shenzhen.aliyuncs.com/15%E3%80%81%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95.png)

### 补充方法

![补充方法](https://weapposs.oss-cn-shenzhen.aliyuncs.com/2020/07/16、数组常用方法补充reduce、filter、flat.png)

## 参考地址

[76 张脑图带你彻底搞懂原生 JS](https://juejin.im/post/5ebb68796fb9a0435432df8e)
