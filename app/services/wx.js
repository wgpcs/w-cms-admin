const util = require('util')
const axios = require('axios')
const { wx } = require('../../conf/wxconf')
const { UnAuthorized } = require('../../core/httpExc')
const { User } = require('../models/user')
// const { LoginType } = require('../lib/enum')
const { Auth } = require('../../middlewares/auth')
const { generateToken } = require('../../core/utils')

class WXManager {
  static async codeToToken(code, userInfo) {
    let url = util.format(wx.loginUrl, wx.appId, wx.appSecret, code)
    let res = await axios.get(url)
    if (res.status !== 200) {
      throw new UnAuthorized('openid 获取失败')
    }
    const errcode = res.data.errcode
    if (errcode && errcode !== 0) {
      throw new UnAuthorized('openid 获取失败 ' + errcode + res.data.errmsg)
    }

    let user = await User.getUserByOpenid(res.data.openid)
    if (!user) {
      user = await User.createUserByOpenid(res.data.openid, userInfo)
    }

    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager,
}
