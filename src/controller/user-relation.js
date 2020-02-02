/*
 * @Author: taokexia
 * @Date: 2020-02-02 19:43:06
 * @LastEditTime : 2020-02-02 21:10:01
 * @LastEditors  : Please set LastEditors
 * @Description: 用户关系 controller
 * @FilePath: \koa2-weibo-code\src\controller\user-relation.js
 */

const { getUsersByFollower, getFollowersByUser, addFollower, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel }  = require('../model/ResModel.js')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
/**
  * 根据 userid 获取粉丝列表
  * @param {number} userId 用户 id
  */
async function getFans(userId) {
  // service
  const { count, userList } = await getUsersByFollower(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录用户 id
 * @param {number} curUserId 要被关注用户 id
 */
async function follow(myUserId, curUserId) {
  // service
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch(ex) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 当前用户 id
 * @param {number} curUserId 取消关注用户 id
 */
async function unFollow(myUserId, curUserId) {
  const result =  await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowers(userId) {
  // service
  const { count, userList } = await getFollowersByUser(userId)

  return new SuccessModel({
    count,
    followersList: userList
  })
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollowers
}