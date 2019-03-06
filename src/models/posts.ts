import * as Mongo from '../lib/mongo';
import * as marked from 'marked' ;
import CommentModel from './comments';

const Post = Mongo.Post;

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
    afterFind: function (posts) {
      return posts.map(function (post) {
        post.content = marked(post.content)
        return post
      })
    },
    afterFindOne: function (post) {
      if (post) {
        post.content = marked(post.content)
      }
      return post
    }
})

Post.plugin('addCommentsCount', {
    afterFind: function(posts){
        return Promise.all(posts.map(post => {
            return CommentModel.getCommentsCount(post._id).then(commentsCount => {
                post.commenCount = commentsCount;

                return post;
            });
        }));
    },
    afterFindOne: function(post){
        if(post){
            return CommentModel.getCommentsCount(post._id).then(count => {
                post.commenCount = count;

                return post;
            });
        }
        return post;
    }
});



export default {
    create: function(post){
        return Post.create(post).exec();
    },
    // 通过文章 id 获取一篇文章
    getPostById: function getPostById (postId) {
        return Post
        .findOne({ _id: postId })
        .populate({ path: 'author', model: 'User' })
        .convertCreatedAt()
        .addCommentsCount()
        .contentToHtml()
        .exec();
    },
    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts: function getPosts (author) {
        const query: any = {}
        if (author) {
            query.author = author
        }
        return Post
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .convertCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },
    incPv: function(postId){
        return Post
            .update({id: postId}, {$inc: {pv: 1}})
            .exec();
    },
    getRawPostById: function (postId){
        return Post
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .exec();
    },
    updatePostById: function(postId, data){
        return Post
            .update({_id: postId}, {$set: data})
            .exec();
    },
    delPostById: function (postId){
        return Post
            .deleteOne({_id: postId})
            .exec()
            .then(res => {
                if(res.result.ok && res.result.n > 0){
                    return CommentModel.delCommentsByPostId(postId);
                }
            });
    }
};
