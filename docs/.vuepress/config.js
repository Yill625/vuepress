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
  title: '前端打工人', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '易亮亮前端文章记录', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link',
      { rel: 'icon', href: '/learn.svg' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ]
  ],

  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    //顶部导航栏
    nav: [
      { text: '📚书单', link: '/pages/book/index.md' },
      { text: '✊掘金', link: '/pages/juejin/index.md' },
      { text: '🥳知识点', link: '/pages/article/index.md' },
      { text: '👩‍💻工作', link: '/pages/WorkHole/index.md' },
      { text: 'Github', link: 'https://github.com/Yill625' }
      // { text: 'Vue3', link: '/pages/vue3/index.md' },
      // { text: 'CSS', link: '/pages/css/index.md' },
      // { text: '文章整理', link: '/pages/article/index.md' },
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/article/': [
        {
          title: '一、JavaScript基础', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['variable.md', '变量'], //菜单名称为'子菜单1'，
            ['type.md', '类型'], //菜单名称为'子菜单1'，
            ['prototype.md', '原型和原型链'], //菜单名称为'子菜单1'，
            ['scope.md', '作用域和闭包'],
            // ['closure.md', ''],
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
            ['BOM.md', '浏览器API'],
            ['BOMBase.md', '浏览器原理'],
            ['node.md', 'Node']
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
            ['backend.md', '后端技能'],
            ['optimization.md', '性能优化'],
            ['safety.md', '前端安全'],
            ['business.md', '业务相关']
          ]
        }
      ],
      '/pages/book/': [
        {
          title: 'JavaScript', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            [
              'ProfessionalJavaScriptForWebDevelopers.md',
              'JavaScript高级程序设计（第4版）'
            ]
          ]
        }
      ],
      '/pages/WorkHole/': [
        {
          title: '分享', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['ShareBase.md', '基础分享'], //菜单名称为'子菜单1'，
            ['ShareEs6.md', 'es6分享'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: '一、后台管理页面', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['AdminLibrary.md', '框架类库'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: '二、H5页面', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['MobileLibrary.md', '框架类库'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: '三、代码规范', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['Eslint.md', 'Eslint'], //菜单名称为'子菜单1'，
            ['Prettier.md', 'Prettier'],
            ['TypeScript.md', 'TypeScript']
          ]
        },
        {
          title: '四、GitHub Actions', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['GitHubActions.md', 'GitHubActions'] //菜单名称为'子菜单1'，
          ]
        }
      ],
      '/pages/xmind/': [
        {
          title: 'JavaScript', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['JavaScript.md', 'JavaScript'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: '网络知识', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['net.md', '网络知识'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: 'Webpack', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['Webpack.md', 'Webpack'] //菜单名称为'子菜单1'，
          ]
        },
        {
          title: 'Vue', // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['Vue.md', 'Vue'] //菜单名称为'子菜单1'，
          ]
        }
      ]
      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
