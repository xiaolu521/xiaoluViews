const Sequelize = require('sequelize');
const sequelize = require('./db.js')
const Group = require('./group');
const User = require('./user');
const moment = require('moment');
const Model = Sequelize.Model;
class Ug extends Model {}
Ug.init({
    // 属性
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
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
    tableName: 'ug',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    // 参数
});
Ug.belongsTo(User);
Ug.belongsTo(Group);
User.hasMany(Ug);
Group.hasMany(Ug);

module.exports = Ug;
