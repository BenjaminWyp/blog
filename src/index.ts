import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import flash = require('connect-flash');
import * as configLite from 'config-lite';
import routes from './routes';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import 'source-map-support/register';
//Instead of:
import * as sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

// Promise.resolve().then(() => {
//     const a = 4;
//     a.split('1');
// })
// process.on('unhandledRejection', console.log)

const app = express();
const MongoStore = connectMongo(session);
const config = configLite(__dirname);

// view set
console.log(__dirname);
app.set('views', path.join(`${__dirname}/../`, 'views'));
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(`${__dirname}/../`, 'public')))

// session 中间件
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
      url: config.mongodb// mongodb 地址
    })
}))

// 成功日志
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            //json: true,
            //colorize: true,
        }),
        new winston.transports.File({
            filename: 'logs/success.log',
        })
    ]
}))

// flash 中间件，用来显示通知
app.use(flash());

// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        //json: true,
        //colorize: true
      }),
      new winston.transports.File({
        filename: 'logs/error.log'
      })
    ]
}))

app.locals.blog = {
    title: config.name,
    description: config.description,
};

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString();
    next();
});

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(`../${__dirname}`, 'public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
}));

// routes
routes(app);

// 错误处理
app.use((e, req, res, next) => {
    console.error(e)
    req.flash('error', e.message)
    res.redirect('/posts')
});

if(module.parent){
    module.exports = app;
}else{
    app.listen(8000);
}
