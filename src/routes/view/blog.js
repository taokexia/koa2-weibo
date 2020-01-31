/*
 * @Author: taokexia
 * @Date: 2020-01-31 23:51:08
 * @LastEditTime : 2020-01-31 23:52:39
 * @LastEditors  : Please set LastEditors
 * @Description: 微博 view 路由
 * @FilePath: \koa2-weibo-code\src\routes\view\blog.js
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router