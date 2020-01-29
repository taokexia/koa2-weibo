/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:23:17
 * @LastEditTime : 2020-01-30 00:00:43
 * @LastEditors  : Please set LastEditors
 * @Description: user controller
 * @FilePath: \koa2-weibo-code\src\controller\user.js
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')

/**
 * @description: 用户名是否存在
 * @param {string} userName 用户名 
 */ 
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * @description: 注册账号
 * @param {string} userName 用户名 
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男, 2 女, 3 保密) 
 * @return: 
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo)
  }

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch(ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}