const User = require('../model/user');
const returnMsg = require('../until/index').returnMsg;
const getToken = require('../until/index').getToken;
const Sequelize = require('sequelize');
const md5 = require('md5');
const Op = Sequelize.Op
let login = async (ctx, next) => {
    await User.findAll({
        where: {
            userName:ctx.request.body.userName,
            password:ctx.request.body.password
        }
    })
        .then(users => {
            if(users.length !=0){
                token = md5(ctx.request.body.userName + Date.parse(new Date()))
                return User.update({token: token}, {
                    where: {
                        id: users[0].id
                    }
                })
                    .then(res=>{
                        users[0].token = token
                        return ctx.body = returnMsg({data:users[0],msg:'登录成功'})
                    })
            }else{
                return  ctx.body = returnMsg({code: 500,msg:'账号或密码错误'})
            }
        });
};
let list = async (ctx, next) => {
    await User.findAll({
        limit: ctx.request.body.pagingParam.pageSize || 10,
        offset: ctx.request.body.pagingParam.pageNumber ? (ctx.request.body.pagingParam.pageNumber - 1) * ctx.request.body.pagingParam.pageSize : 0
    })
        .then(users => {
            return User.count()
                .then(count => {
                    ctx.body = returnMsg({data: users}, {total: count})
                })
        });
};
let add = async (ctx, next) => {
    await User.create(ctx.request.body)
        .then(users => {
            return ctx.body = returnMsg({data:users})
        });
};
let edit = async (ctx, next) => {
    await User.update(ctx.request.body,{
        where:{
            id:ctx.request.body.id
        }
    })
        .then(users => {
            return ctx.body = returnMsg({data:users})
        });
};
let del = async (ctx, next) => {
    await User.destroy({
        where:{
            id:ctx.request.body.id
        }
    })
        .then(users => {
            return ctx.body = returnMsg({data:users})
        });
};
module.exports = {
    'POST /user/login': login,
    'POST /user/list': list,
    'POST /user/add': add,
    'POST /user/edit': edit,
    'POST /user/del': del
};
