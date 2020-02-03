/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:29:32
 * @LastEditTime : 2020-02-03 23:41:13
 * @LastEditors  : Please set LastEditors
 * @Description: 单元测试的用户信息
 * @FilePath: \koa2-weibo-code\test\testUserInfo.js
 */

/** 
 * 【特别提醒】 cookie 是用户的敏感信息，此处只能是**测试用户**的 cookie
 * 每次测试用户重新登录都需要更新 id
 */
module.exports = {
    T_ID: 1,
    T_USER_NAME: 'taokexia',
    T_COOKIE: 'weibo.sid=7q_KPn_gMUAWTwVVZSE6qhe9MILux7Ng; weibo.sid.sig=9gWKceSGNFJDF33XM56mptfy3ZU',

    Z_ID: 2,
    Z_USER_NAME: 'lisi',
    Z_COOKIE: 'weibo.sid=CBHe2p58UctIEAJgicsSdczi8zr-9VbT; weibo.sid.sig=5dIU3AYzr6OzLRUhSwd7964NA3U'

}