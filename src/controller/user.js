/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:23:17
 * @LastEditTime : 2020-01-29 22:25:32
 * @LastEditors  : Please set LastEditors
 * @Description: user controller
 * @FilePath: \koa2-weibo-code\src\controller\user.js
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
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

module.exports = {
  isExist
}