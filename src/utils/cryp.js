/*
 * @Author: taokexia
 * @Date: 2020-01-29 23:53:00
 * @LastEditTime : 2020-01-29 23:59:47
 * @LastEditors  : Please set LastEditors
 * @Description: 加密方法
 * @FilePath: \koa2-weibo-code\src\utils\cryp.js
 */
const crypto = require('crypto')
// 密钥
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * @description: md5 加密
 * @param {string} content 明文
 * @return: 
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * @description: 加密方法
 * @param {string} content 明文 
 * @return: 加密后文本
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = {
  doCrypto
}