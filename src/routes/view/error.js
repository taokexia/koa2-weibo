/*
 * @Author: taokexia
 * @Date: 2020-01-28 19:13:09
 * @LastEditTime : 2020-01-28 19:14:46
 * @LastEditors  : Please set LastEditors
 * @Description: 404 路由
 * @FilePath: \koa2-weibo-code\src\routes\view\error.js
 */

const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
