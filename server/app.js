var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 首页
var indexRouter = require('./routes/index');
// 平台介绍
var platformRouter = require('./routes/platform');
// 工程案例
var engineeringCaseRouter = require('./routes/engineeringCase');
// 加建科普
var polularScienceRouter = require('./routes/polularScience');
// 新闻中心
var newsRouter = require('./routes/news');
// 加装咨询
var consultationRouter = require('./routes/consultation');
// 加装中心
var constructionCenterRouter = require('./routes/constructionCenter');
// 关于我们
var contactUsRouter = require('./routes/contactUs');
// 底部
var footerRouter = require('./routes/footer');




// 图片上传
var uploadRouter = require('./routes/upload');
var usersRouter = require('./routes/users');

var app = express();
var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('./public'));//将文件设置成静态
app.use('/', express.static('./view'));//将文件设置成静态
app.use('/viewadmin', express.static('./viewadmin'));//将文件设置成静态

app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/platform', platformRouter);
app.use('/engineeringCase', engineeringCaseRouter);
app.use('/polularScience', polularScienceRouter);
app.use('/news', newsRouter);
app.use('/consultation', consultationRouter);
app.use('/constructionCenter', constructionCenterRouter);
app.use('/contactUs', contactUsRouter);
app.use('/footer', footerRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
