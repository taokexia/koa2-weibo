/*
 * @Author: taokexia
 * @Date: 2020-01-29 00:21:12
 * @LastEditTime : 2020-01-29 00:24:39
 * @LastEditors  : Please set LastEditors
 * @Description: jest server
 * @FilePath: \koa2-weibo-code\test\server.js
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
