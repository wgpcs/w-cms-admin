/**
 * @description 微信登陆相关配置
 */

let wx = {
  appId: 'wx91f0984de48757dd',
  appSecret: 'eb38802f3e70443139b91e5bc4b06719',
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"',
}

module.exports = {
  wx,
}
