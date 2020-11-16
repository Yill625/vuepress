# WebPack

## 基础

### entry :sring | []

> 入口起点，指示 Webpack 应该从哪个模块开始，来作为构建内部依赖图的开始。进入入口起点后，Webpack 会找出有哪些模块和库的入口起点直接或间接依赖的，每个依赖想随即被处理，最后输出到称之为 bundles 的文件中

单入口 : string
多入口 : [] 需要多个独立分离的依赖

### output

> 概念: output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程

- filename: 文件名
- chunkFilename
- path: path 目标输出目录的绝对路径
- publicPath：
  - webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(publicPath)。
  - 静态资源最终访问路径 = output.publicPath + 资源 loader 或插件等配置路径 举个例子 🌰：publicPath: "https://cdn.example.com/assets/"
    前端打包的出来的文件 📃 实际就是静态资源
- library: library 指定的就是你是用 require 时的模块名
- librayTarget: 配置如何暴露 library 的方式

### loaders

> 我们在前端构建中会遇见需要使用各式各样的文件，例如 css 代码，图片，模板代码等。webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。（注意始终理解一个概念就是 babel 是处理模块 module 的,你引入了一个模块资源就要用对应的 loader 去处理）

> 举个例子 🌰：举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，需要 css-loader 来处理 .css 文件（这里其实还需要 style-loader，后续详解），最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行。

#### 常用的 loader

- css-loader
- less-loader
- scss-loader
- file-loader
- babel-loader
- ts-loader
- eslint-loader
- thread-loader

### plugins

> loader 被用于转换某些类型的模块（与模块挂钩），而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

#### 常用的 plugin

- HotModuleReplacementPlugin
  模块热更新插件。Hot-Module-Replacement 的热更新是依赖于 webpack-dev-server，后者是在打包文件改变时更新打包文件或者 reload 刷新整个页面，HRM 是只更新修改的部分
- HtmlWebpackPlugin
  生成 html 文件。将 webpack 中 entry 配置的相关入口 chunk 和 extract-text-webpack-plugin 抽取的 css 样式 插入到该插件提供的 template 或者 templateContent 配置项指定的内容基础上生成一个 html 文件，具体插入方式是将样式 link 插入到 head 元素中，script 插入到 head 或者 body 中。
- clean-webpack-plugin
  clean-webpack-plugin 用于在打包前清理上一次项目生成的 bundle 文件，它会根据 output.path 自动清理文件夹；这个插件在生产环境用的频率非常高，因为生产环境经常会通过 hash 生成很多 bundle 文件，如果不进行清理的话每次都会生成新的，导致文件夹非常庞大。
- mini-css-extract-plugin
  - 将 CSS 提取为独立的文件的插件，对每个包含 css 的 js 文件都会创建一个 CSS 文件，支持按需加载 css 和 sourceMap
  - 这个插件应该只用在生产环境配置，并且在 loaders 链中不使用 style-loader, 而且这个插件暂时不支持 HMR
- purifycss-webpack
  - 有时候我们 css 写得多了或者重复了，这就造成了多余的代码，我们希望在生产环境进行去除。
- optimize-css-assets-webpack-plugin
  - 我们希望减小 css 打包后的体积（进行压缩），可以用到 optimize-css-assets-webpack-plugin。

### devltool

> 指定代码的 source map 生成方式

## 模块

### module

对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 module

### chunk

一般来说一个 chunk 对应一个 bundle，比如上图中的 utils.js -> chunks 1 -> utils.bundle.js；但也有例外，比如说上图中，我就用 MiniCssExtractPlugin 从 chunks 0 中抽离出了 index.bundle.css 文件。

### bundle

webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

::: tip
module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle
:::

## 文件指纹策略

> 打包后输出的文件名后缀，用于版本管理

### 文件指纹类型

1. hash: 和整个项目的构建相关，只要项目文件有修改，整个项目的构建 hash 值就会改变
2. chunkhash: 和 Webpack 打包的 chunk 有关，不用的 entry 会生成不用的 chunkhash 值

   > 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件(存在内存中)，webpack 会对这个 chunk 文件进行一些操作，所以我们根据 entry 还有模块之间的依赖关系来判断模块是否处于同一个 chunk

3. contenthash：根据文件内容来定义 hash，文件内容不变，contenthash 不变

   > 它的出现主要是为了解决，让 css 文件不受 js 文件的影响。比如 foo.css 被 foo.js 引用了，所以它们共用相同的 chunkhash 值。但这样子是有问题的，如果 foo.js 修改了代码，css 文件就算内容没有任何改变，由于是该模块的 hash 发生了改变，其 css 文件的 hash 也会随之改变

### 文件指纹策略

- js、css 文件的指纹策略

1. js
   如果采用 contenthash 根据 JS 文件内容来生成 hash,但是一旦样式修改了，css 文件名会变化，此时 JS 文件应该也要变化，重新引入正确 ✅ 的文件才对
2. css
   当使用 mini-css-extract-plugin 插件抽离 css 文件时候，该插件可以获取到 webapck 中 hash 以及其该 chunk 下的 hash，当然改插件还可以自己根据文件内容生成 hash 也就是 contenthash
3. 图片
   当我们使用 file-loader 处理图片等资源时候，其选项 contenthash 以及 hash 选项是自己内部生成的，❗️ 不采用 webpack 中的 hash
