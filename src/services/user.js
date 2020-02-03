/*
 * @Author: taokexia
 * @Date: 2020-01-29 14:59:30
 * @LastEditTime : 2020-02-03 22:20:55
 * @LastEditors  : Please set LastEditors
 * @Description: user service
 * @FilePath: \koa2-weibo-code\src\services\user.js
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('../services/user-relation')

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
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
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

/**
 * @description: 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })

  // 自己关注自己 (为了方便首页获取数据)
  const data = result.dataValues
  addFollower(data.id, data.id)

  return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName: userName
    }
  })
  // result 删除得行数
  return result > 0
}

/**
 * 更新用户信息
 * @param {*} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity}
 * @param {*} param1 查询条件{ userName, password }
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity},
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0 // 修改行数是否大于0
}


module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}