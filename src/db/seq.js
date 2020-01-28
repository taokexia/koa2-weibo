/*
 * @Author: taokexia
 * @Date: 2020-01-28 14:02:33
 * @LastEditTime : 2020-01-28 14:25:27
 * @LastEditors  : Please set LastEditors
 * @Description: Sequilize 实例
 * @FilePath: \koa2-weibo-code\src\db\seq.js
 */

const Sequelize = require('sequelize')
const MYSQL_CONF = require('../conf/db').MYSQL_CONF
const { isProd, isTest } = require('../utils/env')


const { host, database, user, password} = MYSQL_CONF
const conf = {
  host: host,
  dialect: 'mysql'
}

// 测试环境不打印数据库信息
if (isTest) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池最大连接数量
    min: 0, // 连接池最小连接数
    idle: 10000, // 如果一个连接池 10s 之内没有连接则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
