/**
 * @description 工具包
 */

const { Success } = require('../../core/httpExc')

/**
 * 成功信息返回
 * @param {string} msg
 * @param {number} errorCode
 */
function success({ data = null, msg = '', errorCode = 0 } = {}) {
  console.log(msg, data)
  throw new Success(msg, errorCode, data)
}

module.exports = {
  success,
}
