/**
 * @description sequelize 实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/config')

const { host, user, pwd, datebase } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql',
  timezone: '+8:00',
  logging: true,  // 显示sql语句
  define: {
    // 添加 deletedAt 字段
    paranoid: true
  }
}
const seq = new Sequelize(datebase, user, pwd, conf)

module.exports = seq
