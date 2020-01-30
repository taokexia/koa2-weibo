/*
 * @Author: taokexia
 * @Date: 2020-01-30 15:26:34
 * @LastEditTime : 2020-01-30 21:23:41
 * @LastEditors  : Please set LastEditors
 * @Description: 登录验证的中间件
 * @FilePath: \koa2-weibo-code\src\middlewares\loginChecks.js
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
/**
  * API 登录验证 
  * @param {Object} ctx ctx
  * @param {function} next next
  */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {*} ctx 
 * @param {*} next 
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}
