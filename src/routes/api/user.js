/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:19:53
 * @LastEditTime : 2020-01-29 22:29:39
 * @LastEditors  : Please set LastEditors
 * @Description: user API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\user.js
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router