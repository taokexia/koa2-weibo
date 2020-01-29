/*
 * @Author: taokexia
 * @Date: 2020-01-29 15:06:55
 * @LastEditTime : 2020-01-29 15:16:56
 * @LastEditors  : Please set LastEditors
 * @Description: 数据格式化
 * @FilePath: \koa2-weibo-code\src\services\_format.js
 */

const {DEFAULT_PICTURE} = require('../conf/constant')

/**
 * @description: 用户默认头像
 * @param {Object} obj 用户对象 
 * @return: 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * @description: 格式化用户信息
 * @param {Array|Object} list 用户列表或用户对象 
 * @return: 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组 用户列表
    return list.map(_formatUserPicture)
  }

  // 单个对象
  let result = list
  result = _formatUserPicture(result)
  return result
}

module.exports = {
  formatUser
}
