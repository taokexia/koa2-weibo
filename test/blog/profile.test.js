/*
 * @Author: taokexia
 * @Date: 2020-02-01 18:01:52
 * @LastEditTime : 2020-02-02 21:16:52
 * @LastEditors  : Please set LastEditors
 * @Description: 个人主页 test
 * @FilePath: \koa2-weibo-code\test\blog\profile.test.js
 */

const server  = require('../server')
const { T_COOKIE, T_USER_NAME } = require('../testUserInfo')

test('个人主页，加载第一页数据，应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${T_USER_NAME}/0`)
        .set('cookie', T_COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})