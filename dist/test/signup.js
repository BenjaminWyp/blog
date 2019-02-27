const path = require('path');
const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const User = require('../lib/mongo').User;
const testName1 = 'testName1';
const testName2 = 'nswbmw';
describe('signup', function () {
    describe('POST /signup', function () {
        const agent = request.agent(app);
        beforeEach(function (done) {
            //创建一个用户
            User.create({
                name: testName1,
                password: '123456',
                avatar: '',
                gender: 'x',
                bio: ''
            })
                .exec()
                .then(() => {
                done();
            })
                .catch(done);
        });
        afterEach(function (done) {
            User.deleteMany({ name: { $in: [testName1, testName2] } })
                .exec()
                .then(function () {
                done();
            })
                .catch(done);
        });
        after(function (done) {
            process.exit();
        });
        it('wrong name', function (done) {
            agent
                .post('/signup')
                .type('form')
                .field({ name: '' })
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .redirects()
                .end(function (err, res) {
                console.log('console.log(res.text);', res.text);
                if (err)
                    return done(err);
                console.log(res.text);
                assert(res.text.match(/名字请限制在 1-10 个字符/));
                done();
            });
        });
        it('wrong gender', function (done) {
            agent
                .post('/signup')
                .type('form')
                .field({ name: testName2, gender: 'a' })
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .redirects()
                .end(function (err, res) {
                if (err)
                    return done(err);
                assert(res.text.match(/性别只能是m、f、x/));
                done();
            });
        });
        it('duplite name', function (done) {
            agent
                .post('/signup')
                .type('form')
                .fields({ name: testName1, gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .redirects()
                .end(function (err, res) {
                if (err)
                    return done(err);
                assert(res.text.match(/用户名已被占用/));
                done();
            });
        });
        it('success', function (done) {
            agent
                .post('/signup')
                .type('form')
                .field({ name: testName2, gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .redirects()
                .end((err, res) => {
                if (err)
                    done(err);
                assert(res.text.match(/注册成功/));
                done();
            });
        });
    });
});
