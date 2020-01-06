const Group = require('../model/group');
const Ug = require('../model/uGroup');
const User = require('../model/user');
const returnMsg = require('../until/index').returnMsg;
const getToken = require('../until/index').getToken;
const Sequelize = require('sequelize');
const md5 = require('md5');
const Op = Sequelize.Op


let list = async (ctx, next) => {
    await Group.findAll({
        attributes: [['name', 'title'],['id', 'key']],
        where:{
            GroupId:ctx.request.body.id
        }
    })
        .then(group => {
            return ctx.body = returnMsg({data:group,msg:'获取成功'})
        });
};




module.exports = {
    'POST /group/list': list
};
