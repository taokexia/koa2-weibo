/*
 * @Author: taokexia
 * @Date: 2020-02-02 19:44:25
 * @LastEditTime : 2020-02-02 19:58:45
 * @LastEditors  : Please set LastEditors
 * @Description: 用户关系 services
 * @FilePath: \koa2-weibo-code\src\services\user-relation.js
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注用户的 id
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollower
}