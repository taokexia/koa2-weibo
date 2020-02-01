/*
 * @Author: taokexia
 * @Date: 2020-01-29 15:15:02
 * @LastEditTime : 2020-02-01 17:54:24
 * @LastEditors  : Please set LastEditors
 * @Description: 常量集合
 * @FilePath: \koa2-weibo-code\src\conf\constant.js
 */

module.exports = {
  // 默认头像
  DEFAULT_PICTURE: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg',
  // 默认页面展示数量
  PAGE_SIZE: 5,

  // 正则表达式，匹配 '@昵称 - userName'
  REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}
