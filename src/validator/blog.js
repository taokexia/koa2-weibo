/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:15:55
 * @LastEditTime : 2020-02-01 00:17:52
 * @LastEditors  : Please set LastEditors
 * @Description: 微博数据格式校验
 * @FilePath: \koa2-weibo-code\src\validator\blog.js
 */
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * @description: 执行校验
 * @param {Object} data 微博数据 
 * @return: 
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate