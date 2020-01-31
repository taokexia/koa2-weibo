/*
 * @Author: taokexia
 * @Date: 2020-01-29 12:33:58
 * @LastEditTime : 2020-01-31 15:48:57
 * @LastEditors  : Please set LastEditors
 * @Description: 数据模型入口文件
 * @FilePath: \koa2-weibo-code\src\db\model\index.js
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// User.hasMany(Blog)

module.exports = {
  User,
  Blog
}