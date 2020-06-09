/**
 * @description 身份验证 中间件
 */

const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('../core/httpExc')

class Auth {
  constructor(level) {
    // 接口权限级别
    this.level = level || 1
    this.USER = 8
    this.ADMIN = 16
  }
  get m() {
    return async (ctx, next) => {
      let errMsg = 'token 验证失败'
      // HttpBasicAuth 身份验证
      const token = basicAuth(ctx.req)
      if (!token || !token.name) {
        throw new Forbbiden(errMsg)
      }

      // jwt 验证 token
      try {
        var decoded = jwt.verify(token.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token 已经过期'
        }
        throw new Forbbiden(errMsg)
      }

      if (decoded.scope < this.level) {
        throw new Forbbiden()
      }

      ctx.auth = {
        uid: decoded.uid,
        scope: decoded.scope,
      }

      await next()
    }
  }
}

module.exports = { Auth }
