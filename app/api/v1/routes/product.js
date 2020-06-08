const router = require('koa-router')()
// const { NotFound } = require('../../../../core/httpExc')
const { Auth } = require('../../../../middlewares/auth')

router.prefix('/v1/product')

router.get('/:categoryid', new Auth(8).m, (ctx, next) => {
  // const path = ctx.params
  // const header = ctx.request.header
  ctx.body = {
    auth: ctx.auth,
  }
})

module.exports = router
