/*
 * @Author: taokexia
 * @Date: 2020-01-30 00:24:11
 * @LastEditTime : 2020-01-30 00:29:57
 * @LastEditors  : Please set LastEditors
 * @Description: user 数据格式校验
 * @FilePath: \koa2-weibo-code\src\validator\user.js
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

/**
 * @description: 执行校验
 * @param {Object} data 用户数据 
 * @return: 
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate