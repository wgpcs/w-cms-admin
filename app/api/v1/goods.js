/**
 * @description 商品 路由
 */

const router = require('koa-router')()
const { Auth } = require('../../../middlewares/auth')
const { Goods } = require('../../models/goods')

router.prefix('/v1/goods')

router.get('/latest', new Auth().m, async (ctx, next) => {
  const res = await Goods.findOne({
    order: [['sort', 'ASC']],
  })

  ctx.body = res
})

module.exports = router
