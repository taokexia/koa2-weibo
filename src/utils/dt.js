/*
 * @Author: taokexia
 * @Date: 2020-02-01 17:55:51
 * @LastEditTime : 2020-02-01 17:56:57
 * @LastEditors  : Please set LastEditors
 * @Description: 时间处理相关函数
 * @FilePath: \koa2-weibo-code\src\utils\dt.js
 */

const { format } = require('date-fns')

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}
