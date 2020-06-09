/**
 * @description user模型
 */

const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const seq = require('../../db/seq')
const { UnAuthorized } = require('../../core/httpExc')

class User extends Model {
  /**
   * 验证邮箱 密码 是否存在 匹配
   * @param {string} email
   * @param {string* password
   */
  static async verifyEmailPassword(email, password) {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnAuthorized('邮箱不存在')
    }

    const verify = bcrypt.compareSync(password, user.password)
    if (!verify) {
      throw new UnAuthorized('密码不正确')
    }

    return user
  }

  /**
   * 微信获取openID 查看数据库 openid 用户
   * @param {string} openid
   */
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid,
      },
    })

    return user
  }

  /**
   * 微信获取openID 创建用户
   * @param {string} openid
   */
  static async createUserByOpenid(openid, userInfo) {
    let { userName, nickName, avatarUrl } = userInfo
    return await User.create({
      openid,
      nickName,
      avatar: avatarUrl,
      userName: userName ? userName : nickName,
    })
  }
}

User.init(
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        // 加密密码
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
    },
    nickName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    avatar: Sequelize.STRING,
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  { sequelize: seq }
)

module.exports = {
  User,
}
