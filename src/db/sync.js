/*
 * @Author: taokexia
 * @Date: 2020-01-28 14:26:12
 * @LastEditTime : 2020-01-28 14:28:59
 * @LastEditors  : Please set LastEditors
 * @Description: 测试数据库连接
 * @FilePath: \koa2-weibo-code\src\db\sync.js
 */

const seq = require('./seq')

// 测试
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

// 执行同步
// force true表示重新创建表
seq.sync({ force: true}).then(() => {
  console.log('sync ok')
  process.exit()
})
