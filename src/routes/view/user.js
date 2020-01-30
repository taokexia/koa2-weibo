/*
 * @Author: taokexia
 * @Date: 2020-01-29 12:03:31
 * @LastEditTime : 2020-01-30 23:32:11
 * @LastEditors  : Please set LastEditors
 * @Description: user view 路由
 * @FilePath: \koa2-weibo-code\src\routes\view\user.js
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Object} ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false // 默认未登录
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) { 
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }

  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  console.log(ctx.session.userInfo)
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
