/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:03:45
 * @LastEditTime : 2020-02-01 00:15:00
 * @LastEditors  : Please set LastEditors
 * @Description: 首页 controller
 * @FilePath: \koa2-weibo-code\src\controller\blog-home.js
 */

const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
/**
 * 创建微博
 * @param {Object} param0 创建微博所需数据 { userId, content, image}
 */
async function create({ userId, content, image}) {
  // service
  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}