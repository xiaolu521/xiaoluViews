require("babel-register");
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const static_ = require('koa-static')
const check = require('./until/index').check
const controller = require('./service/controller');
const app = new Koa();
const path = require('path');
// log request URL:
app.use(static_(
    path.join(__dirname, './static')
))
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// parse request body:
app.use(bodyParser());


app.use(check);
// add controllers:
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');
