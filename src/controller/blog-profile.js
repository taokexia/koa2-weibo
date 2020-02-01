/*
 * @Author: taokexia
 * @Date: 2020-02-01 15:51:02
 * @LastEditTime : 2020-02-01 16:05:29
 * @LastEditors  : Please set LastEditors
 * @Description: 个人主页 controller
 * @FilePath: \koa2-weibo-code\src\controller\blog-profile.js
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页数
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  // service
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}