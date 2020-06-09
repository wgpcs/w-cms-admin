/**
 * @description token 校验登陆
 */

const router = require('koa-router')()
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/httpExc')
const { generateToken } = require('../../../core/utils')
const { WXManager } = require('../../services/wx')

router.prefix('/v1/token')

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      const secret = v.get('body.secret') || ''
      token = await emailLogin(v.get('body.account'), secret)
      break
    case LoginType.USER_MINI_PRO:
      let userInfo =  v.get('body.userInfo')
      token = await WXManager.codeToToken(v.get('body.account'), userInfo)
      break
    default:
      throw new ParameterException('操作有误')
      break
  }

  ctx.body = { token }
})

/**
 * 邮箱登陆函数 返回token
 * @param {string} account
 * @param {string} secret
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, 2)
}

module.exports = router
