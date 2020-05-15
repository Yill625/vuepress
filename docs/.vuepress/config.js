//设定顶部导航栏、侧边导航栏等项目配置的核心文件
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  },
  title: '前端搬运工', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '前端文章记录', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link',
      { rel: 'icon', href: '/learn.svg' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ]
  ],
  //顶部导航栏
  themeConfig: {
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '首页', link: '/' },

      //格式二：添加下拉菜单，link指向的文件路径
      // {
      //   text: '知识点', //默认显示
      //   ariaLabel: '分类', //用于识别的label
      //   items: [
      //     { text: '文章', link: '/pages/article/index.md' },
      //     //点击标签会跳转至link的markdown文件生成的页面
      //     { text: '琐碎', link: '/pages/other/index.md' }
      //   ]
      // }
      { text: '知识点', link: '/pages/article/index.md' }

      // //格式三：跳转至外部网页，需http/https前缀
      // { text: 'Github', link: 'https://github.com/dwanda' }
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/article/': [
        {
          title: '一、JavaScript基础', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['variable.md', '变量'], //菜单名称为'子菜单1'，
            ['type.md', '类型'], //菜单名称为'子菜单1'，
            ['prototype.md', '原型'], //菜单名称为'子菜单1'，
            ['PrototypeChain.md', '原型链'],
            ['scope.md', '作用域'],
            ['closure.md', '闭包'],
            ['eventLoop.md', '执行机制'],
            ['grammar.md', '语法'],
            ['api.md', 'API']
          ]
        },
        {
          title: '二、HTML和CSS',
          collapsable: false,
          children: [
            ['html.md', 'HTML'],
            ['css.md', 'CSS'],
            ['write.md', '手写']
          ]
        },
        {
          title: '三、计算机基础',
          collapsable: false,
          children: [
            ['compile.md', '编译原理'],
            ['CommunicationsProtocol.md', '网络协议'],
            ['DesignPattern.md', '设计模式']
          ]
        },
        {
          title: '四、数据结构和算法',
          collapsable: false,
          children: [
            ['coding.md', 'JavaScript编码能力'],
            ['wheel.md', '手动实现前端轮子'],
            ['DataStructure.md', '数据结构'],
            ['algorithm.md', '算法']
          ]
        },
        {
          title: '五、运行环境',
          collapsable: false,
          children: [
            ['coding.md', '浏览器API'],
            ['wheel.md', '浏览器原理'],
            ['DataStructure.md', 'Node']
          ]
        },
        {
          title: '六、框架和类库',
          collapsable: false,
          children: [
            ['TypeScript.md', 'TypeScript'],
            ['React.md', 'React'],
            ['Vue.md', 'Vue'],
            ['more.md', '多端开发'],
            ['DataStream.md', '数据流管理'],
            ['library.md', '实用库'],
            ['dev.md', '开发和调试']
          ]
        },
        {
          title: '七、前端工程',
          collapsable: false,
          children: [
            ['build.md', '项目构建'],
            ['nginx.md', 'nginx'],
            ['fast.md', '开发提速'],
            ['git.md', '版本控制'],
            ['CICD.md', '持续集成']
          ]
        },
        {
          title: '八、项目和业务',
          collapsable: false,
          children: [
            ['optimization.md', '性能优化'],
            ['safety.md', '前端安全'],
            ['business.md', '业务相关']
          ]
        }
      ]

      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
