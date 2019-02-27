const marked = require('marked');
const Comment = require('../lib/mongo').Comment;
Comment.plugin('contentToHtml', {
    afterFind: function (comments) {
        return comments.map(comment => {
            comment.content = marked(comment.content);
            return comment;
        });
    }
});
export default {
    // 创建一个留言
    create: function (comment) {
        return Comment.create(comment).exec();
    },
    // 删除一个留言
    delCommentById: function (commentId) {
        return Comment.deleteOne({ _id: commentId }).exec();
    },
    // 获取一个留言
    getCommentById: function (commentId) {
        return Comment.findOne({ _id: commentId }).exec();
    },
    // 获取留言列表
    getComments: function (postId) {
        return Comment
            .find({ postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .convertCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 删除文章删除留言
    delCommentsByPostId: function (postId) {
        return Comment
            .deleteMany({ postId: postId })
            .exec();
    },
    // 通过文章 id 获取该文章下留言数
    getCommentsCount: function (postId) {
        return Comment.count({ postId: postId }).exec();
    }
};
