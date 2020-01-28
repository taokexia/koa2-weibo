/*
 * @Author: taokexia
 * @Date: 2020-01-29 00:22:16
 * @LastEditTime : 2020-01-29 00:24:02
 * @LastEditors  : Please set LastEditors
 * @Description: json test
 * @FilePath: \koa2-weibo-code\test\json.test.js
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})
