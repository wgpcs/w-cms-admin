/**
 * @description 工具包
 */

const {
    Success
} = require('../../core/httpExc')

/**
 * 
 * @param {string} msg 
 * @param {number} errorCode 
 */
function success(msg, errorCode){
    throw new Success(msg, errorCode)
}

module.exports = {
    success
}