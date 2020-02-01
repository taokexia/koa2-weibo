/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:23:53
 * @LastEditTime : 2020-02-01 17:38:35
 * @LastEditors  : Please set LastEditors
 * @Description: 首页test
 * @FilePath: \koa2-weibo-code\test\blog\home.test.js
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')
// const COOKIE = 'weibo.sid=8g5-fA9cP_SqzDKSx-sZiB748IzJ9Vhh; weibo.sid.sig=tWGkTr_rZRfH6eHmt3h04564pD4'

// 存储微博 id
let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建微博_' + Date.now()
    const image = '/1580441267658.1567837337024.3.png'

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})
