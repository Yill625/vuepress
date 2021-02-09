# 玩转 CSS 的艺术之美

1. 准备

- 结构类：通过结构选择器、Flex 布局方式、对齐方式等方式实现

- 背景类：通过多重背景、渐变背景、遮罩等方式实现

- 点击类：通过状态选择器结合层次选择器的方式实现

- 切换类：通过状态选择器结合层次选择器的方式实现

- 表单类：通过状态选择器互相结合的方式实现

默认样式的导入

1. normalize.css：懒人必备的浏览器默认样式库，接近 40k 的 Star，说明大部分人都是懒人
2. reset.css：其实就是笔者自定义的默认样式，各位同学也可自行为项目撰写一份默认样式

3. 回流重绘

   > 回流又名重排，指几何属性需改变的渲染。
   > 重绘指更改外观属性而不影响几何属性的渲染。相比回流，重绘在两者中会温和一些

4. 盒模型

- content-box：标准盒模型(默认)

  > 标准盒模型是 W3C 规范的标准，由 margin + border + padding + content 组成。与上述提到的公式一模一样，节点的 width/height 只包含 content，不包含 padding 和 border

- border-box：怪异盒模型
  > 怪异盒模型又名 IE 盒子模型，是 IExplore 制定的标准，由 margin + content 组成。与上述提到的公式一不同，节点的 width/height 包含 border、padding 和 content

5. 样式计算

!important > 内联样式 = 外联样式 > ID 选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 元素选择器 = 伪元素选择器 > 通配选择器 = 后代选择器 = 兄弟选择器

6. 布局方式

- 普通布局：display:block/inline
- 浮动布局：float:left/right
- 定位布局：position:relative/absolute/fixed、left/right/top/bottom/- z-index
- 表格布局：table 系列属性
- 弹性布局：display:flex/inline-flex、flex 系列属性
- 多列布局：column 系列属性
- 格栅布局：display:grid/inline-grid、grid 系列属性
- 响应式布局：em/rem/vw/vh/vmin/vmax、媒体查询
  [深度解析 CSS Flexbox 布局 - 2020 年最新版](https://juejin.cn/post/6844904116141948936)

```scss
// 垂直水平居中
.center-layout {
  display: flex;
  div {
    margin: auto;
  }
}
```

```scss
// 单行文字溢出overflow + text-overflow
.s-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```scss
// 多行文字溢出flex + overflow + text-overflow

.m-ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

```scss
// 💥💥💥使用旧版弹性布局模拟多行文字溢出，只能在Webkit内核中使用，局限性太大了。
.m-ellipsis {
  overflow: hidden;
  position: relative;
  max-height: 120px;
  line-height: 40px;
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    padding-left: 20px;
    background: linear-gradient(to right, transparent, #fff 50%);
    content: '...';
  }
}
```

7. 计算属性
  