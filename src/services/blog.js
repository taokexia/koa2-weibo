/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:05:10
 * @LastEditTime : 2020-02-03 23:34:31
 * @LastEditors  : Please set LastEditors
 * @Description: 微博 service
 * @FilePath: \koa2-weibo-code\src\services\blog.js
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
const { PAGE_SIZE } = require('../conf/constant')

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

/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数 { userName, pageIndex = 0,pageSize = 10}
 */
async function getBlogListByUser(
  { userName, pageIndex = 0,pageSize = 10}
) {
  // 拼接查询条件
  const userwhereOpts = {}
  if (userName) {
    userwhereOpts.userName = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少跳
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userwhereOpts
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取关注者的微博
 * 三表查询
 * @param {Object} param0 查询条件
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = PAGE_SIZE}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}