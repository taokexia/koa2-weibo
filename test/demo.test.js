/*
 * @Author: taokexia
 * @Date: 2020-01-29 00:18:18
 * @LastEditTime : 2020-01-29 00:19:48
 * @LastEditors  : Please set LastEditors
 * @Description: 测试案例
 * @FilePath: \koa2-weibo-code\test\demo.test.js
 */

function sum(a, b) {
    return a + b
}

 test('10 + 20 应该等于30',() => {
     const res = sum(10, 20)
     expect(res).toBe(30)
 })
