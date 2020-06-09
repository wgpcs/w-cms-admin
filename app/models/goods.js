/**
 * @description 商品模型
 */

const seq = require('../../db/seq')
const { Sequelize, Model } = require('sequelize')

class Goods extends Model {
  static async getInfo(id){
    let res = await Goods.findOne({
      where: {
        id
      }
    })
    return res
  }
}

Goods.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: Sequelize.STRING,
    content: Sequelize.TEXT,
    coll_num: Sequelize.INTEGER,
    sort: Sequelize.INTEGER,
  },
  { sequelize: seq, tableName: 'goods' }
)

module.exports = {
  Goods,
}
