/*
 * @Author: taokexia
 * @Date: 2020-01-29 12:03:31
 * @LastEditTime : 2020-01-29 12:06:43
 * @LastEditors  : Please set LastEditors
 * @Description: user view 路由
 * @FilePath: \koa2-weibo-code\src\routes\view\user.js
 */

const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

module.exports = router
