/**
 * @description user模型
 */

const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const seq = require('../../db/seq')
const { UnAuthorized } = require('../../core/httpExc')

class User extends Model {
  /**
   * 验证邮箱 密码
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
      allowNull: false,
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
