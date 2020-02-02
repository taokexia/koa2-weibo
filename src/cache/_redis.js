/*
 * @Author: taokexia
 * @Date: 2020-01-28 22:48:35
 * @LastEditTime : 2020-02-02 16:37:02
 * @LastEditors  : Please set LastEditors
 * @Description: 连接 redis 的方法
 * @FilePath: \koa2-weibo-code\src\cache\_redis.js
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log('redis error', err)
})

/**
 * @description: redis set
 * @param {string} key 键
 * @param {string} value 值
 * @param {string} timeout 过期时间，单位 s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @description: redis get
 * @param {string} key 键 
 * @return: Promise 对象
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  get,
  set
}