/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:00:49
 * @LastEditTime : 2020-02-01 00:20:22
 * @LastEditors  : Please set LastEditors
 * @Description: 首页 API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\blog-home.js
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { genValidateor } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidateor(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  // controller
  ctx.body = await create({ userId, content, image})
})

module.exports = router
