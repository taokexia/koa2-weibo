/*
 * @Author: taokexia
 * @Date: 2020-02-02 21:20:09
 * @LastEditTime : 2020-02-04 00:18:01
 * @LastEditors  : Please set LastEditors
 * @Description: 用户关系 单元测试
 * @FilePath: \koa2-weibo-code\test\blog\relation.test.js
 */

 const server = require('../server')
 const { getFans, getFollowers} = require('../../src/controller/user-relation')
 const {
    T_ID,
    T_USER_NAME,
    T_COOKIE,
    Z_ID,
    Z_USER_NAME,
    Z_COOKIE
 } = require('../testUserInfo')

 // 先取消关注
 test('无论如何，先取消关注，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: Z_ID })
        .set('cookie', T_COOKIE)
    expect(1).toBe(1)
 })

 // 添加关注
 test('关注应该成功', async () => {
     const res = await server
        .post('/api/profile/follow')
        .send({ userId: Z_ID })
        .set('cookie', T_COOKIE)
    expect(res.body.errno).toBe(0)
 })

 // 获取粉丝
 test('获取粉丝应该有taokexia', async () => {
     const result = await getFans(Z_ID)
     const { count, fansList } = result.data
     const hasUserName = fansList.some(fanInfo => {
         return fanInfo.userName === T_USER_NAME
     })
     expect(count > 0).toBe(true)
     expect(hasUserName).toBe(true)
 })

 // 获取关注人
 test('获取关注，应该有zhangsan', async () => {
    const result = await getFollowers(T_ID)
    const { count, followersList } = result.data
    const hasUserName = followersList.some(fanInfo => {
        return fanInfo.userName === Z_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
 })

 // 获取 at 列表
 test('获取 at 列表, 应该有张三', async () => {
     const res = await server
        .get('/api/user/getAtList')
        .set('cookie', T_COOKIE)
    const atList = res.body
    const hasUserName = atList.some(item => {
        return item.indexOf(`- ${Z_USER_NAME}`) > 0
    })
    expect(hasUserName).toBe(true)
 })

 // 取消关注
 test('取消关注应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: Z_ID })
        .set('cookie', T_COOKIE)
    expect(res.body.errno).toBe(0)
 })