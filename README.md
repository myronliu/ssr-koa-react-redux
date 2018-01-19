服务器启动步骤
=========

1、npm install
2、npm start

或者

1、yarn install
2、yarn start


搭建一个服务端渲染的程序
=========

第一步：技术选型
---------
    1、node
    2、koa
    3、页面路由react-router（要满足客户端和服务端路由的选择）
    4、接口代理koa-proxy
    4、单页面状态管理react-redux
    5、view层展示与交互react
    6、UI插件antd
    7、服务端页面转string，react-dom/server  renderToString(function)
    8、客户端页面渲染，react-dom  render(function)
    9、打包webpack

第二步：开始搭建
---------

**———>资源准备**

    1、app(文件夹)：主要放置程序代码
    2、assets(文件夹)：主要放置静态资源
    3、views
    4、模版ejs


**———>准备包&打包配置&客户端入口文件**

    5、package.json
    6、webpack.build.js & 创建客户端js的入口文件app.js


**———>准备服务端运行文件**

    7、创建服务端程序入口：index.js
    8、创建routers文件夹，并创建服务端的路由server.js(此处可以先写一个直接返回到客户端的代码)


**———>准备业务页面**

    9、创建页面路由/app/router.js
    10、创建页面文件夹pages以及各页面文件      // Redux待研究
        1、App.js
        2、Home.js
        3、News.js
    11、创建文件夹actions以及各个action
        1、home.js
        2、news.js
    12、创建reduers文件夹以及各个reducer
        1、home.js
        2、news.js
        3、index.js
    13、创建store文件夹以及store文件


**———>将业务页面返回给客户端**

    14、完善服务端路由/router/server.js
        1、匹配客户端URL
        2、调render方法，将页面返回给客户端
    15、创建/routers/render.js文件
        1、遍历所有的组件，获取静态的fetch方法，如果配置了ServerRender字段为true，则将此方法压入数组中
        2、利用promise，将所有接口同时发起请求
        3、所有接口请求完毕，将数据传入组件中，渲染出组件
        4、将上一步渲染出的组件，利用react-dom/server提供的renderToString，将其转化为字符串
        5、将字符串、以及页面其他需要的信息打入模版文件的占位符中
        6、返回信息到客户端


**———>准备好静态资源**

    16、加入css\react…等静态资源


**———>准备好客户端执行的js**

    17、加入客户端js，让整个页面动起来———>客户端渲染
        1、在/app/app.js中使用react-dom render出包括在 react-redux提供的Provider中的router.js即可