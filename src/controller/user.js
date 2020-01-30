/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:23:17
 * @LastEditTime : 2020-01-30 23:10:49
 * @LastEditors  : Please set LastEditors
 * @Description: user controller
 * @FilePath: \koa2-weibo-code\src\controller\user.js
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo } = require('../model/ErrorInfo')
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
    return new ErrorModel(registerUserNameExistInfo)
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

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxxx

  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前账户
 * @param {string} userName 
 */
async function deleteCurUser(userName) {
  // service
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}