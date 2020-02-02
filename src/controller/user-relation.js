/*
 * @Author: taokexia
 * @Date: 2020-02-02 19:43:06
 * @LastEditTime : 2020-02-02 20:02:38
 * @LastEditors  : Please set LastEditors
 * @Description: 用户关系 controller
 * @FilePath: \koa2-weibo-code\src\controller\user-relation.js
 */

const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel }  = require('../model/ResModel.js')
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

module.exports = {
  getFans
}