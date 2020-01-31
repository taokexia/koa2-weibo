/*
 * @Author: taokexia
 * @Date: 2020-01-31 15:43:24
 * @LastEditTime : 2020-01-31 15:46:15
 * @LastEditors  : Please set LastEditors
 * @Description: 微博数据模型
 * @FilePath: \koa2-weibo-code\src\db\model\Blog.js
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT} = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog