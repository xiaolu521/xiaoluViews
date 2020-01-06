const Sequelize = require('sequelize');
const sequelize = require('./db.js')
const moment = require('moment');
const Model = Sequelize.Model;
class User extends Model {}
User.init({
    // 属性
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    userName: {
        type:Sequelize.STRING,
        comment: '用户名'
    },//昵称
    nickName: {
        type:Sequelize.STRING,
        comment: '昵称'
    },//昵称
    password:{
        type: Sequelize.STRING(11),
        allowNull: false,
        comment: '密码'
    },//密码
    token:{
        type:Sequelize.STRING,
        comment: 'token'
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }

}, {
    sequelize,
    tableName: 'user',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    // 参数
});
module.exports = User;


