# 算法

## 排序

### 冒泡排序

> 相邻两个元素比较 大的在右边 小的在左边

```js
const arr = [9, 5, 3, 2, 6, 2, 1]

for (let i = 0; i < arr.length - 1; i++) {
  for (let j = 0; j < arr.length - 1 - i; j++) {
    if (arr[j] > arr[j + 1]) {
      const tem = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = tem
    }
  }
}

console.log(arr)
```

#### 快速排序
