/*
 * @Author: taokexia
 * @Date: 2020-01-29 14:59:30
 * @LastEditTime : 2020-01-29 15:18:34
 * @LastEditors  : Please set LastEditors
 * @Description: user service
 * @FilePath: \koa2-weibo-code\src\services\user.js
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @description: 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码 
 * @return: 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickname', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

module.exports = {
  getUserInfo
}