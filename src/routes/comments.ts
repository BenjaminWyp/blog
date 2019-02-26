import * as express from 'express';
import { checkLogin } from '../middlewares/check';
import CommentModel from '../models/comments';

const router = express.Router();

router.post('/', checkLogin, (req: Request, res: Response, next) => {
    const author = req.session.user._id;
    const postId = req.fields.postId;
    const content = req.fields.content;

    // 校验参数
    try {
        if (!content.length) {
        throw new Error('请填写留言内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    const comment = {
        author: author,
        postId: postId,
        content: content
    }

    CommentModel.create(comment).then(function () {
        req.flash('success', '留言成功')
        // 留言成功后跳转到上一页
        res.redirect('back')
    }).catch(next)
});

router.post('/:commentId/remove', checkLogin, (req, res, next) => {
    const commentId = req.params.commentId
    const author = req.session.user._id

    CommentModel.getCommentById(commentId)
    .then(function (comment) {
      if (!comment) {
        throw new Error('留言不存在')
      }
      if (comment.author.toString() !== author.toString()) {
        throw new Error('没有权限删除留言')
      }
      CommentModel.delCommentById(commentId)
        .then(function () {
          req.flash('success', '删除留言成功')
          // 删除成功后跳转到上一页
          res.redirect('back')
        })
        .catch(next)
    })
});

export default router;
