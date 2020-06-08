/**
 * @description 用户 路由
 */

const Router = require('koa-router')
const { RedisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { success } = require('../../lib/helper')
const router = new Router({
  prefix: '/v1/user',
})

router.post('/register', async (ctx, next) => {
  const v = await new RedisterValidator().validate(ctx)
  const user = {
    userName: v.get('body.userName'),
    email: v.get('body.email'),
    password: v.get('body.password2'),
  }
  let res = await User.create(user)
  if (res) {
    success()
  }
})

module.exports = router
