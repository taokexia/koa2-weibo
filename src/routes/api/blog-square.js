/*
 * @Author: taokexia
 * @Date: 2020-02-02 15:01:33
 * @LastEditTime : 2020-02-02 16:49:16
 * @LastEditors  : Please set LastEditors
 * @Description: 广场 api
 * @FilePath: \koa2-weibo-code\src\routes\api\blog-square.js
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(result.data.blogList)
  console.log(result)
  ctx.body = result.data
})

module.exports = router