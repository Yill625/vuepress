[Vue3+TS 快速上手](https://24kcs.github.io/vue3_study/00_%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.html)

# TypeScript 的基础使用

## 基础类型

```ts
// 字符串
const a: string = 1
// 布尔
const isDone: boolean = true
// 数字
const b: number = 12
// null
const nul: null = null
// undefined
const und: undefined = undefined
// 数组方式1
const arr1: number[] = [1, 2, 3, 4]
// 数组方式2
const arr2: Array<string> = ['1']
// 元祖 Tuple
const arr3: [number, boolean, string] = [1, true, '11']
// 枚举
enum ColorType {
  red,
  green
}

const red = ColorType.red

// any
const arr4: any[] = [1, '2', false, null]

// void
function test(): void {
  console.log(12)
}

// object

function getObj(obj: object): object {
  return obj
}

getObj({ name: 11 })
```

### 联合类型

```ts
const demo: string | number = 1
```

### 类型断言

### 类型推断

> 编辑器根据赋值自己推断出数据的类型

## 接口

```js
interface User {
  readonly id:number,
  name?: string
}
```

### 函数类型

> 通过的接口的方式来定义函数的使用
