/*
 * @Author: taokexia
 * @Date: 2020-01-29 22:20:51
 * @LastEditTime : 2020-01-29 23:33:25
 * @LastEditors  : Please set LastEditors
 * @Description: 失败信息集合, 包括 errno 和 message
 * @FilePath: \koa2-weibo-code\src\model\ErrorInfo.js
 */

module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败，请重试'
  },
  // 用户名未存在
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    errno: 10006,
    message: '修改密码失败, 请重试'
  } 
}