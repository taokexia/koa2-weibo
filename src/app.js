/*
 * @Author: your name
 * @Date: 2020-01-22 16:22:47
 * @LastEditTime : 2020-02-01 17:23:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-code\src\app.js
 */
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtkoa = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')

const profileAPIRouter = require('./routes/api/blog-profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
// error handler
// 错误配置项
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name,默认 'koa.sid'
  prefix: 'weibo:sess:', // redis key 前缀，默认 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // ttl: 24 * 60 * 60 * 1000, 默认等于 cookie maxAge
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
