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
  logging: true  // 限时sql语句
}
const seq = new Sequelize(datebase, user, pwd, conf)

module.exports = seq
