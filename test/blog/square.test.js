/*
 * @Author: taokexia
 * @Date: 2020-02-02 16:56:35
 * @LastEditTime : 2020-02-02 21:17:00
 * @LastEditors  : Please set LastEditors
 * @Description: 广场测试
 * @FilePath: \koa2-weibo-code\test\blog\square.test.js
 */

const server = require('../server')
const { T_COOKIE } = require('../testUserInfo')

// 加载第一页数据
test('广场，加载第一页数据', async () => {
    const res = await server
        .get(`/api/square/loadMore/0`)
        .set('cookie', T_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})
