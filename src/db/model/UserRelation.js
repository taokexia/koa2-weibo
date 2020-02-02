/*
 * @Author: taokexia
 * @Date: 2020-02-02 18:28:55
 * @LastEditTime : 2020-02-02 19:25:57
 * @LastEditors  : Please set LastEditors
 * @Description: 用户关注关系
 * @FilePath: \koa2-weibo-code\src\db\model\UserRelation.js
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
})

module.exports = UserRelation