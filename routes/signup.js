const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const fs = require('fs');
const sha1 = require('sha1');
const path = require('path');
const UserModel = require('../models/users');

router.get('/', checkNotLogin, (req, res) => {
    res.render('signup');
});
router.post('/', checkNotLogin, (req, res, next) => {
    const name = req.fields.name;
    let password  = req.fields.password;
    const repassword = req.fields.repassword;
    const gender = req.fields.gender;
    const bio = req.fields.bio;
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
    password = sha1(password);

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

module.exports = router;
