/*
 * @Author: taokexia
 * @Date: 2020-01-29 13:19:53
 * @LastEditTime : 2020-02-04 00:02:25
 * @LastEditors  : Please set LastEditors
 * @Description: user API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\user.js
 */

const router = require('koa-router')()
const { 
  isExist, 
  register, 
  login, 
  deleteCurUser,
  changeInfo,
  changePassword,
  logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidateor } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getFollowers } = require('../../controller/user-relation')

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

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidateor(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidateor(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  // controller
  ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  // controller
  ctx.body = await logout(ctx)
})

// 获取 at 列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const result = await getFollowers(userId)
  const { followersList } = result.data
  
  // 处理数据
  const list = followersList.map(user => {
    return `${user.nickName} - ${user.userName}`
  })
  ctx.body = list
})

module.exports = router