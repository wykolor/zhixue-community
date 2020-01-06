# zhixue 小程序

## 下载依赖 

```node
	npm i
```
## 运行(开发环境)

```node
	npm run dev:mp-weixin
```
## 发行(生产环境)

```node
	npm run build:mp-weixin
```

## 项目结构说明

- common 公共样式文件
	- iconfont 字体图标样式文件
- components 公共组件
- js_sdk axios插件内容
- node_modules 项目依赖
- pages 页面文件 所有模块界面 一个模块为一个界面
- server 请求封装文件
	- apiList api模块化
	- api.js 所有模块的出口
	- axios.js 封装的请求、响应和请i去拦截等
	- env.js 环境配置
- static 项目静态资源文件夹(一般存放图片等静态资源)，该文件下的内容不会被webpack解析打包，最终会原格式出现在打包文件中
	- img 静态图片
		- tabbar 底部栏的图片
- unpackage 最终运行或者发行之后会出现该文件，内部是打包之后的微信小程序文件
	- dist
		- build 生产打包运行文件 	(直接在微信开发者工具上打开，可上传至服务器)
		- dev 开发打包运行文件	(直接在微信开发者工具上打开，可上传至服务器)
- utils 公共方法
	- base.js 项目中常用的公共方法
	- login.js 登录方法
- wxcomponents 微信小程序组件
	- vant 有赞的vant-weapp 小程序组件库
- uni.scss 全局样式变量
- App.vue 是uni-app的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件
- main.js 是uni-app的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如vuex
- pages.json 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
- manifest.json 文件是应用的配置文件，用于指定应用的名称、图标、权限等。