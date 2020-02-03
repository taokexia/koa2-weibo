/*
 * @Author: taokexia
 * @Date: 2020-01-29 12:33:58
 * @LastEditTime : 2020-02-03 22:11:18
 * @LastEditors  : Please set LastEditors
 * @Description: 数据模型入口文件
 * @FilePath: \koa2-weibo-code\src\db\model\index.js
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}