/*
 * @Author: taokexia
 * @Date: 2020-01-29 22:08:12
 * @LastEditTime : 2020-01-29 22:15:27
 * @LastEditors  : Please set LastEditors
 * @Description: response 的数据模型
 * @FilePath: \koa2-weibo-code\src\model\ResModel.js
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({errno, data, message}) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/** 
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message}) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}