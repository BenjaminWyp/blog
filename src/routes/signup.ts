import * as express from 'express';
import { checkNotLogin } from '../middlewares/check';
import * as fs from 'fs';
import sha1 from 'sha1';
import * as path from 'path';
import UserModel from '../models/users';

const router = express.Router();

router.get('/', checkNotLogin, (req, res) => {
    res.render('signup');
});

router.post('/', checkNotLogin, (req, res, next) => {
    const name = req.fields.name;
    let password: string  = req.fields.password as string;
    const repassword = req.fields.repassword as string;
    const gender = req.fields.gender as string;
    const bio = req.fields.bio as string;
    const avatar = req.files.avatar.path.split(path.sep).pop();

    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('名字请限制在 1-10 个字符');
        }
        if(['m', 'f', 'x'].indexOf(gender)){
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符')
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像')
          }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符')
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致')
        }
    }catch(e){
        // 删除头像
        fs.unlinkSync(req.files.avatar.path)
        req.flash('error', e.message);
        return res.redirect('signup');
    }

    // 明文密码加密
    password = sha1(password) as string;

    let user = {
        name,
        password,
        gender,
        bio,
        avatar,
    }

    UserModel.create(user).then(rel => {
        user = rel.ops[0];
        delete user.password;
        req.session.user = user;
        req.flash('success', '注册成功');
        res.redirect('/posts');
    }).catch(e => {
        // 删除头像
        fs.unlinkSync(req.files.avatar.path);

        if(e.message.match('duplicate key')){
            req.flash('error', '用户名已被占用');
            return res.redirect('/signup');
        }

        next(e);
    });
});

export default router;
