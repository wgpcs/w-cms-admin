/**
 * @description 初始化
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadModules()
    InitManager.loadConf()
  }
  static loadConf(path = ''){
    const confDirectory = path || `${process.cwd()}/conf/config.js`
    const conf = require(confDirectory)
    global.config = conf
  }
  static initLoadModules() {const apiDirectory = `${process.cwd()}/app/api`
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })

    // routes
    function whenLoadModule(route) {
      if (route instanceof Router) {
        InitManager.app.use(route.routes(), route.allowedMethods())
      }
    }
  }
}

module.exports = InitManager
