/*
 * @Author: taokexia
 * @Date: 2020-01-28 14:15:24
 * @LastEditTime : 2020-01-28 22:48:20
 * @LastEditors  : Please set LastEditors
 * @Description: 项目配置
 * @FilePath: \koa2-weibo-code\src\conf\db.js
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}


let MYSQL_CONF = {
  database: 'koa2_weibo_db',
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
