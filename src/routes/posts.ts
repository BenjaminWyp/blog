import * as express from 'express';
import { checkLogin } from '../middlewares/check';
import PostModel from '../models/posts';
import CommentModel from '../models/comments';

const router = express.Router();

router.get('/', (req, res, next) => {
    const author = req.query.author;
    PostModel.getPosts(author).then(posts => {
        res.render('posts', {posts: posts});
    }).catch(next);
});

router.get('/create', checkLogin, (req, res) => {
    res.render('create');
});

router.post('/create', checkLogin, (req, res, next) => {
    const author: string = req.session.user._id;
    const title: string | string[] = req.fields.title;
    const content: string | string[] = req.fields.content;

    try{
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    }catch(e){
        req.flash('error', e.message);
        res.redirect('back');
    }

    interface Post {
        author: string,
        title: string,
        content: string,
    }
    let post: Post = {
        author,
        title,
        content,
    }

    PostModel.create(post).then(result => {
        req.flash('success', '发表成功');
        res.redirect('/posts/' + result.ops[0]);
    }).catch(next);
});

router.get('/:postId', checkLogin, (req, res, next) => {
    const postId = req.params.postId;

    Promise.all([
        PostModel.getPostById(postId), // 获取文章信息
        CommentModel.getComments(postId), // 获取该文章所有留言
        PostModel.incPv(postId), // pv 加 1
    ]).then(result => {
        const post = result[0];
        const comments = result[1];
        if(!post){
            throw new Error();
        }
        res.render('post', {
            post: post,
            comments: comments,
        });
    }).catch(next);
});

router.get('/:postId/edit', checkLogin, (req, res, next) => {
    const postId = req.params.postId;
    const author = req.session.user._id;

    PostModel.getRawPostById(postId).then(post => {
        console.log(post);
        if(!post){
            throw new Error('该文章不存在');
        }
        if(author.toString() !== post.author._id.toString()){
            throw new Error('权限不足')
        }

        res.render('edit', {post: post});
    }).catch(next);
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    const postId = req.params.postId;
    const author = req.session.user._id;
    const title = req.fields.title;
    const content  = req.fields.content;

    // 校验参数
    try {
        if (!title.length) {
        throw new Error('请填写标题')
        }
        if (!content.length) {
        throw new Error('请填写内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    let data = {postId, author, title};

    PostModel.getRawPostById(postId).then(post => {
        if (!post) {
            throw new Error('文章不存在')
        }
        if (post.author._id.toString() !== author.toString()) {
            throw new Error('没有权限')
        }

        PostModel.updatePostById(postId, { title: title, content: content }).then(function () {
            req.flash('success', '编辑文章成功')
            // 编辑成功后跳转到上一页
            res.redirect(`/posts/${postId}`)
        }).catch(next)
    })
});

router.get('/:postId/remove', checkLogin, (req, res, next) => {
    const postId = req.params.postId;
    const author = req.session.user._id;

    PostModel.getRawPostById(postId).then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限')
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '删除文章成功')
          // 删除成功后跳转到主页
          res.redirect('/posts')
        })
        .catch(next)
    })
});

export default router;
