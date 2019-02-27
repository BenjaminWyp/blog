import * as express from 'express';
import { checkNotLogin } from '../middlewares/check';
import UserModel from '../models/users';
import sha1 from 'sha1';

const router = express.Router();

router.get('/', checkNotLogin, (req, res) => {
    res.render('signin');
});

router.post('/', checkNotLogin, (req, res, next) => {
    const name: string = req.fields.name as string;
    const password: string = req.fields.password as string;

    // 校验参数
    try {
        if (!name.length) {
        throw new Error('请填写用户名')
        }
        if (!password.length) {
        throw new Error('请填写密码')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    UserModel.getUserByName(name).then(user => {
        if(!user){
            req.flash('error', '用户不存在');
            return res.redirect('back');
        }
        // 检查密码是否匹配
        if(sha1(password) !== user.password){
            req.flash('error', '用户名或密码错误');
            return res.redirect('back');
        }

        req.flash('success', '登录成功');

        delete user.password;
        req.session.user = user;
        res.redirect('/posts');
    }).catch(next);
});

export default router;
