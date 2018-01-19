import path from 'path';
import koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import views from 'koa-views';

const app = new koa();// 版本V2往上，需要用new的方式，1.x可以不用new
const templatePath = path.join(__dirname, './views');

app.use(require('koa-compress')());// 数据压缩，5.8k可以压缩至560B，老牛逼了
app.use(serve(__dirname + '/assets'));

// template ejs
app.use(views(templatePath, { extension: 'ejs' }))

app.use(async function(ctx, next){
  console.log("中间件1------>start")
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log("中间件1------>end，服务器响应耗时：" + ms + 'ms');
});

app.on('error', function(err){
  console.log("server error: ---->from index.js")
  console.log(err)
});


import renderRouter from './routers/server';
app.use(proxy({
  host:  'http://www.sojson.com',
  match: /^\/api\//,
  map: function(path) { return path.replace('/api/', '/'); }
}));
app.use(renderRouter);


var port = 2018;
app.listen(port);
console.log("---->服务器启动完毕")
console.log("---->请访问: http://localhost:" + port)
