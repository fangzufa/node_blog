const Koa = require('koa')
const app = new Koa()
const views = require('koa-views') // 页面模板
const json = require('koa-json') // json 处理
const onerror = require('koa-onerror') // 错误处理
const bodyparser = require('koa-bodyparser') // 处理 post data
const logger = require('koa-logger') //格式化控制台中的console
const session = require('koa-generic-session') //链接session
const redisStore = require('koa-redis') // 链接redis
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

// const index = require('./routes/index')
// const users = require('./routes/users')
const blog = require('./routes/blog')
const usera = require('./routes/user')

const { REDIS_CONF } = require('./server/conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())  //处理 post data  

app.use(logger()) // 日志
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// dev 是日志输出格式类型 可以在github上看配置
// https://github.com/express/morgan    
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 或 测试环境
  app.use(morgan('dev'));
}
else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream,
  }));
}

// 要在注册路由之前写入 session redis 配置
app.keys = ['AAasd(78y%&_aa']
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(usera.routes(), usera.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
