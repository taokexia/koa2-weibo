/*
 * @Author: taokexia
 * @Date: 2020-02-01 00:20:47
 * @LastEditTime : 2020-02-01 17:38:22
 * @LastEditors  : Please set LastEditors
 * @Description: 微博数据模型单元测试
 * @FilePath: \koa2-weibo-code\test\blog\model.test.js
 */

const { Blog } = require('../../src/db/model/index')

test('微博数据模型各个属性, 符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/1580441267658.1567837337024.3.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/1580441267658.1567837337024.3.png')
})