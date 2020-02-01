/*
 * @Author: taokexia
 * @Date: 2020-02-01 17:21:47
 * @LastEditTime : 2020-02-01 17:47:34
 * @LastEditors  : Please set LastEditors
 * @Description: 个人主页 API 路由
 * @FilePath: \koa2-weibo-code\src\routes\api\blog-profile.js
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

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

module.exports = router