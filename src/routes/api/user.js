/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:19:53
 * @LastEditTime : 2020-01-30 00:32:03
 * @LastEditors  : Please set LastEditors
 * @Description: user API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\user.js
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller 返回
  ctx.body = await register({userName, password, gender})
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router