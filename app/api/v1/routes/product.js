const router = require('koa-router')()
const { NotFound } = require('../../../../core/httpExc')
router.get('/list/:categoryid', (ctx, next) => {
  // const path = ctx.params
  // const header = ctx.request.header
  const error = new NotFound()
  throw error
  // ctx.body = {
  //     key:'product',
  //     path: path
  // }
})

module.exports = router
