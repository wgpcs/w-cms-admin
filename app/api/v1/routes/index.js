const router = require('koa-router')()

router.get('/', (ctx, next) => {
  return (ctx.body = {
    title: 'hello world',
  })
})

module.exports = router