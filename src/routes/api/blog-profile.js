/*
 * @Author: taokexia
 * @Date: 2020-02-01 17:21:47
 * @LastEditTime : 2020-02-02 20:35:32
 * @LastEditors  : Please set LastEditors
 * @Description: 个人主页 API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\blog-profile.js
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:useName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)

  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  // controller
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router