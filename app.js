const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)

InitManager.initCore(app)

// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// })

app.listen(3000)
