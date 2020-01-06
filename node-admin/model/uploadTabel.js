const sequelize = require('./db.js')
const User = require('./user');
const Group = require('./group');
const Ug = require('./uGroup');
// 创建新用户

sequelize.sync({
    force: true      // 强制同步
})
    .then(_ => {
        return User.create({
            userName: 'admin',
            password: '123456',
            nickName:'超级会员'
        });
    })
    .then(_ => {
        return Group.bulkCreate([
            {
                name: '部门1'
            },
            {
                name: '部门1-1',
                GroupId:1
            }
        ]);
    })
    .then(_ => {
        return Ug.create({
            UserId: 1,
            GroupId:1
        });
    })
