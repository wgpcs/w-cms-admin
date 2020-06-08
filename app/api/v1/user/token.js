/**
 * @description token 校验登陆
 */

const router = require('koa-router')()
const { TokenValidator } = require('../../../validators/validator')
const { LoginType } = require('../../../lib/enum')
const { User } = require('../../../models/user')
const { ParameterException } = require('../../../../core/httpExc')
const { generateToken } = require('../../../../core/utils')

router.prefix('/v1/token')

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PRO:
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
