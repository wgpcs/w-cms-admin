/**
 * @description 收藏 路由
 */

const router = require('koa-router')()
const { Auth } = require('../../../middlewares/auth')
const { Collect } = require('../../models/collect')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')

router.prefix('/v1/collect')

router.post('/', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'gid',
  })
  await Collect.like(v.get('body.gid'), ctx.auth.uid)
  success()
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'gid',
  })
  await Collect.unLike(v.get('body.gid'), ctx.auth.uid)
  success()
})

module.exports = router
