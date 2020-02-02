/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:29:32
 * @LastEditTime : 2020-02-02 17:00:52
 * @LastEditors  : Please set LastEditors
 * @Description: 单元测试的用户信息
 * @FilePath: \koa2-weibo-code\test\testUserInfo.js
 */

/** 
 * 【特别提醒】 cookie 是用户的敏感信息，此处只能是**测试用户**的 cookie
 * 每次测试用户重新登录都需要更新 id
 */
module.exports = {
    USER_NAME: 'taokexia',
    COOKIE: 'weibo.sid=CGZA7KJgZmyevaRhhklQjz6hhpeRa4kq; weibo.sid.sig=lPqnxu8DO-9vYseG8eAYrFQRO2o'
}