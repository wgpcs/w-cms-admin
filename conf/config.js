/**
 * @description 配置
 */

// prod / dev
let ENV = 'dev'

// 数据库配置
let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  pwd: '870329',
  datebase: 'koa2_mi_mall',
  port: 3306,
}

// jwt
let security = {
  secretKey: 'seEvkKo5e7$@*5265875',
  expiresIn: 60 * 60,
}

module.exports = {
  ENV,
  MYSQL_CONF,
  security,
}
