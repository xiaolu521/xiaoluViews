const User = require('../model/user');
const fs = require('fs');
const path = require('path');
returnMsg = (data = {}, other={}) => {

    return Object.assign(
        {
            code: data.code || 0,
            msg: data.msg || '操作成功 ',
            data: data.data
        },other
    )
}
exports.returnMsg = returnMsg

exports.getToken = (ctx,next) => {
    return User.findAll({
        where: {
            token: ctx.headers.token
        }
    })
        .then(result => {
            return result[0]
        })
}

exports.check = async (ctx, next)=>{
    console.log('验证')
    let url = ctx.request.url;
    if (url == "/api/user/login" || url == "/api/vip/create" || url == '/favicon.ico'){
        await next()
        return
    }
    else {
        if (ctx.header.cookie) {
            console.log('token')
            return User.findAll({
                where: {
                    token: ctx.headers.token
                }
            })
                .then(async result => {
                    if (result.length == 0) {
                       ctx.body = returnMsg({code: 500, msg: '状态过期'})
                        return
                    }
                    await next()
                })
        } else {
            console.log('notoken')
            ctx.body = returnMsg({code: 500, msg: '请先登录'})
        }
    }
}

exports.upLoad = (ctx)=>{
    return new Promise(async (resolve, reject) => {
        const files =  ctx.request.files.file; // 获取上传文件
        const reader =  fs.createReadStream(files.path);
        // 获取上传文件扩展名
        let date = Date.parse(new Date())
        let format = files.name.split('.').pop()
        let filePath = path.join(__dirname, '../static/upload/') + date + '.' + format;
        // 创建可写流
        const upStream = await fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        await reader.pipe(upStream);
        let filePathName = '/upload/' + date + '.' + format;
        // path.join(__dirname, '../static/upload/1571308896000.xlsx')
        reader.on('end',async function(){
            fs.unlinkSync(files.path);// 异步删除虚拟文件
            resolve({
                localhostPath:filePath,
                onlonePath:filePathName,
            })
        });

    })
}
