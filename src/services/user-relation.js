/*
 * @Author: taokexia
 * @Date: 2020-02-02 19:44:25
 * @LastEditTime : 2020-02-02 20:34:51
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

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系 
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注的用户
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}