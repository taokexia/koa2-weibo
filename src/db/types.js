/*
 * @Author: taokexia
 * @Date: 2020-01-29 12:28:19
 * @LastEditTime : 2020-01-29 12:29:48
 * @LastEditors  : Please set LastEditors
 * @Description: 封装 sequelize 数据类型
 * @FilePath: \koa2-weibo-code\src\db\types.js
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
}
