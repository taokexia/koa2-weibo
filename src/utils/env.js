/*
 * @Author: taokexia
 * @Date: 2020-01-28 14:20:06
 * @LastEditTime : 2020-01-28 19:23:14
 * @LastEditors  : Please set LastEditors
 * @Description: 环境变量
 * @FilePath: \koa2-weibo-code\src\utils\env.js
 */
const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}
