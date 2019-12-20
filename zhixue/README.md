# zhixue

> A Mpvue project

## Build Setup

```bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目结构说明

- build：打包构建配置

- config：开发配置

- src：主要的源代码目录(我们开发基本都在该目录下进行)

  - components: 项目公共组件文件夹，里面存放一些可复用的公共通用组件，不要放置业务组件（组件命名语义化，一个组件代表一个功能）

  - less: 项目公共样式抽离 (以.less 建文件,文件命名语义化)

  - pages: 主要的页面文件，一个页面对应一个文件夹(需要新开发页面，就在该文件夹下建立一个文件夹)

  - server: 后台服务文件夹

    - apiList api 模块(模块划分规则：以页面划分，所以文件名必须和 pages 内部的文件夹名相同)

    - api.js 所有 api 模块的总出口

    - axios.js 针对微信的 ajax 请求 axios 二次封装

  - utils： 公共方法抽离

  - app.josn 小程序的主要配置配件 可配置顶部导航栏和底部导航等配置 详情看小程序官方文档

  - App.vue 和 vue 项目的差别不大

  - main.js 和 vue 项目的差别和用处相同

- static：存放静态文件资源，该目录下的文件不会受 webpack 打包配置，最终会直接以原格式出现在打包文件中

  - fonts：阿里图标库文件

  - images：静态图片

  - tabs：项目搭建时就有的测试用的 tabbar 的图片
