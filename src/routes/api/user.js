/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:19:53
 * @LastEditTime : 2020-01-30 22:53:56
 * @LastEditors  : Please set LastEditors
 * @Description: user API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\user.js
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidateor } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidateor(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller 返回
  ctx.body = await register({userName, password, gender})
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下,测试账号登录之后，删除自己
    const { userName } = ctx.session.userInfo
    // 调用 controller
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router