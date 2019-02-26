import * as express from 'express';
import { checkLogin } from '../middlewares/check';

const router = express.Router();

router.get('/', checkLogin, (req, res, next) => {
    // 清空 session 中用户信息
    req.session.user = null;
    req.flash('success', '登出成功');
    // 登出成功后跳转到主页
    res.redirect('/posts')
});

export default router;
