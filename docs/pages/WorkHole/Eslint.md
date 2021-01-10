# Eslint 的使用

[中文官网](https://cn.eslint.org/)

配置文件 .eslintrc.js

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixl6lohpj31uc0lw0y6.jpg)

## 初始化!!

[](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixm697w7j31zc0s416f.jpg)

```shell
npx eslint --init
```

![image](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixiivbu5j317s0e8aes.jpg)

按照对应的选项生成代码检查的规则 [更多配置规则](https://cn.eslint.org/docs/user-guide/configuring)

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

"semi" 和 "quotes" 是 ESLint 中 规则 的名称。第一个值是错误级别，可以使下面的值之一：

- "off" or 0 - 关闭规则
- "warn" or 1 - 将规则视为一个警告（不会影响退出码）
- "error" or 2 - 将规则视为一个错误 (退出码为 1)

## 配置

### extends

1. 安装对应的配置依赖
2. 使用 extends 数组配置依赖
   ![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixno0ub5j31og06ojss.jpg)

### parserOptions 解析器选项

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixpvlu0nj31zc0s416f.jpg)

### parser 解析器

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixorn6bjj31zt0u07e3.jpg)

### plugins 插件

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmixn1g39nj321i0gqdj7.jpg)

### env

一个环境定义了一组预定义的全局变量

### globals

添加全局变量

### rules

配置细节规则

### overrides

重写规则

```json
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

## [命令行](https://cn.eslint.org/docs/user-guide/command-line-interface)
