/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:05:10
 * @LastEditTime : 2020-02-01 00:07:05
 * @LastEditors  : Please set LastEditors
 * @Description: 微博 service
 * @FilePath: \koa2-weibo-code\src\services\blog.js
 */

const { Blog } = require('../db/model/index')

/**
 * 创建微博
 * @param {Object} param0 创建微博数据 { userId, content, image}
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}