var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var login = require('./routes/login')
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 中间件
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//使用session会话控制
app.use(session({
    secret: 'MedidationPlatFormCreatedByZhangh-tYouMotherfucker',   //cookie签名信息
    cookie: {maxAge: 60 * 1000 * 30, secure: false},                //cookie有效期时长
    resave: true,                                                   //是否在session没有被修改的时候保存
    name:'MedidationPlatForm',                                      //cookie名称，不知道是不是
    saveUninitialized:true,                                         //是否强制创建一个未初始化的session
    store : new RedisStore({
        host : "127.0.0.1",
        port : "6379",
        db : 1,
        ttl : 1800,
        logErrors : true,
        pass : "84519300"
    })
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/signin', signin);
app.use('/login', login);
// app.use('/路径', js文件);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
