/**
 * @description 异常处理中间件
 */

const { HttpException } = require('../core/httpExc')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {

    const isHttpExc = (error instanceof HttpException)
    const isDev = global.config.ENV === 'dev'
    // 开发环境 非 已知错误
    if (isDev && !isHttpExc) {
      throw error
    }

    if (isHttpExc) {
      ctx.body = {
        error_code: error.errorCode,
        msg: error.msg,
      }
      ctx.status = error.status
    } else {
      ctx.body = {
        msg: '抱歉！出问题了，请联系服务管理员',
        error_code: 999,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
