/*
 * @Author: taokexia
 * @Date: 2020-02-02 14:59:33
 * @LastEditTime : 2020-02-02 16:47:47
 * @LastEditors  : Please set LastEditors
 * @Description: 广场页 controller
 * @FilePath: \koa2-weibo-code\src\controller\blog-square.js
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList} = require('../cache/blog')
/**
 * 获取广场的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
  // cache
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length == 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getSquareBlogList
}