const Sequelize = require('sequelize');
const sequelize = require('./db.js')
const moment = require('moment');
const Model = Sequelize.Model;
class Group extends Model {}
Group.init({
    // 属性
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING, //分组名称
        allowNull: false,
        comment: '分组名称'
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
    tableName: 'group',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    // 参数
});

Group.hasMany(Group);

module.exports = Group;


