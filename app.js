var createError = require('http-errors'); //处理404
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser'); //处理cookie
var logger = require('morgan'); //处理日志
const session = require('express-session') //处理session
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// view engine setup (前端页面展示)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// dev 是日志输出格式类型 可以在github上看配置
// https://github.com/express/morgan    
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 或 测试环境
  app.use(logger('dev'));
}
else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream,
  }));
}

app.use(express.json()); //处理POST数据 post data  放到req.body
app.use(express.urlencoded({ extended: false })); //兼容其他格式的post请求 放到req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 处理访问静态文件地址

const redisClient = require('./server/db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'AAasd(78y%&_aa', //session 密匙
  cookie: {
    // path: '/', //默认配置
    // httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore, //链接redis
}))

// 注册路由 '/users' 父路由  usersRouter 里面是子路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {}; //development

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
