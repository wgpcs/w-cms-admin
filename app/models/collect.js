/**
 * @description 收藏
 */

const seq = require('../../db/seq')
const { Sequelize, Model } = require('sequelize')
const { HttpException } = require('../../core/httpExc')
const { Goods } = require('../models/goods')

class Collect extends Model {
  static async like(gid, uid) {
    const collect = await Collect.findOne({
      where: {
        gid,
        uid,
      },
    })
    if (collect) {
      throw new HttpException('已经收藏')
    }
    // 数据库事务
    return seq.transaction(async (t) => {
      await Collect.create(
        {
          uid,
          gid,
        },
        { transaction: t }
      )
      const goods = await Goods.getInfo(gid)
      await goods.increment('coll_num', { by: 1, transaction: t })
    })
  }

  static async unLike(gid, uid) {
    const collect = await Collect.findOne({
      where: {
        gid,
        uid,
      },
    })
    if (!collect) {
      throw new HttpException('已经取消')
    }
    // 数据库事务
    return seq.transaction(async (t) => {
      await collect.destroy({
        force: false, // 软删除
        transaction: t,
      })
      const goods = await Goods.getInfo(gid)
      await goods.decrement('coll_num', { by: 1, transaction: t })
    })
  }
}

Collect.init(
  {
    uid: Sequelize.INTEGER,
    gid: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    sort: Sequelize.INTEGER,
  },
  { sequelize: seq }
)

module.exports = {
  Collect,
}
