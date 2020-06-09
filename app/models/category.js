/**
 * @description 商品分类
 */

const seq = require('../../db/seq')
const { Sequelize, Model } = require('sequelize')

class Category extends Model {}

Category.init(
  {
    gid: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    sort: Sequelize.INTEGER,
  },
  { sequelize: seq }
)
module.exports = {
  Category,
}
