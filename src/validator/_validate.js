/*
 * @Author: taokexia
 * @Date: 2020-01-30 00:25:59
 * @LastEditTime : 2020-01-30 00:28:49
 * @LastEditors  : Please set LastEditors
 * @Description: json schema 校验
 * @FilePath: \koa2-weibo-code\src\validator\_validate.js
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有错误,较慢
})

/**
 * @description: json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 * @return: 
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if(!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
