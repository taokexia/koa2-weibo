/*
 * @Author: taokexia
 * @Date: 2020-01-30 00:32:29
 * @LastEditTime : 2020-01-30 00:44:12
 * @LastEditors  : Please set LastEditors
 * @Description: 验证中间件
 * @FilePath: \koa2-weibo-code\src\middlewares\validator.js
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * @description: 生成 json shcema 验证中间件
 * @param {function} validateFn 验证函数 
 * @return: 
 */ 
function genValidateor(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body =  new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，继续
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = {
  genValidateor
}