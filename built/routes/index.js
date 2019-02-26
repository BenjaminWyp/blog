import { checkLogin } from '../middlewares/check';
import signup from './signup';
import signin from './signin';
import signout from './signout';
import posts from './posts';
import comments from './comments';
export default function (app) {
    app.get('/', checkLogin, (req, res) => {
        res.redirect('/posts');
    });
    app.use('/signup', signup);
    app.use('/signin', signin);
    app.use('/signout', signout);
    app.use('/posts', posts);
    app.use('/comments', comments);
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
}
;
