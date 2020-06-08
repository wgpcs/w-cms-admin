/**
 * @description 校验器
 */

const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要正整数')]
  }
}

class RedisterValidator extends LinValidator {
  constructor() {
    super()
    this.userName = [
      new Rule('isLength', '用户名长度在5~32个之间', {
        min: 5,
        max: 32,
      }),
    ]
    this.email = [new Rule('isEmail', '不符合Email规范')]
    this.password1 = [
      new Rule('isLength', '密码长度在6~30个字符', {
        min: 6,
        max: 30,
      }),
      new Rule(
        'matches',
        '密码不符合格式',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      ),
    ]
    this.password2 = this.password1
  }

  validatePassword(val) {
    const psw1 = val.body.password1
    const psw2 = val.body.password2
    if (psw1 !== psw2) {
      throw new Error('两次输入密码不一致')
    }
  }

  async validateUserName(val) {
    const username = val.body.userName
    const user = await User.findOne({
      where: {
        userName: username,
      },
    })
    if (user) {
      throw new Error('用户名已存在')
    }
  }

  async validateEmail(val) {
    const email = val.body.email
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (user) {
      throw new Error('邮箱已被绑定')
    }
  }
}

// token
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '格式不符合要求', {
        min: 6,
        max: 32,
      }),
    ]
    this.secret = [
      // 可以不传，传就验证
      new Rule('isOptional'),
      new Rule('isLength', '密码长度在6~30个字符', {
        min: 6,
        max: 30,
      }),
    ]
    // this.type
  }

  validateLoginType(val) {
    if (!val.body.type) {
      throw new Error('缺少必要参数 type')
    }
    if (!LoginType.isAllowType(val.body.type)) {
      throw new Error('type类型不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RedisterValidator,
  TokenValidator,
}
