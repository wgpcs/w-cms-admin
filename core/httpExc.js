/**
 * @description 异常错误类 返回格式
 */

class HttpException extends Error {
  constructor(msg = '请求错误', errorCode = 1000, status = 400) {
    super()
    this.errorCode = errorCode
    this.status = status
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.status = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 1000
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.status = 404
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 1004
  }
}

class Unauthorized extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.status = 401
    this.msg = msg || '你没有相关操作权限'
    this.errorCode = errorCode || 1001
  }
}

module.exports = { HttpException, ParameterException, NotFound, Unauthorized }
