/*
 * @Author: taokexia
 * @Date: 2020-02-02 16:35:48
 * @LastEditTime : 2020-02-02 16:40:18
 * @LastEditors  : Please set LastEditors
 * @Description: 微博缓存层
 * @FilePath: \koa2-weibo-code\src\cache\blog.js
 */

const { get, set} = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult != null) {
    // 获取缓存
    return cacheResult
  }

  // 没有缓存，则读取数据库
  const result = await getBlogListByUser({ pageIndex, pageSize })
  // 设置缓存
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList
}