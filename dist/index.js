const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const winston = require('winston');
const expressWinston = require('express-winston');
const app = express();
// view set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// session 中间件
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
        url: config.mongodb // mongodb 地址
    })
}));
// 成功日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true,
        }),
        new winston.transports.File({
            filename: 'logs/success.log',
        })
    ]
}));
// flash 中间件，用来显示通知
app.use(flash());
// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));
app.locals.blog = {
    title: pkg.name,
    description: pkg.description,
};
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true // 保留后缀
}));
// routes
routes(app);
// 错误处理
app.use((e, req, res, next) => {
    console.error(e);
    req.flash('error', e.message);
    res.redirect('/posts');
});
if (module.parent) {
    module.exports = app;
}
else {
    app.listen(8000);
}
