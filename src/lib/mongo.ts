const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp');
const mongolass = new Mongolass();

mongolass.connect(config.mongodb);
mongolass.plugin('convertCreatedAt', {
    afterFind: function(results){
        results.forEach(item => {
            item.createdAt = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:ii:ss');
        });

        return results;
    },
    afterFindOne: function(result){
        if(result){
            result.createdAt = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:ii:ss');
        }

        return result;
    }
});

export let User = mongolass.model('User', {
    name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    avatar: {type: 'string', required: true},
    gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
    bio: { type: 'string', required: true },
});
User.index({ name: 1 }, { unique: true }).exec();

export let Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId, required: true},
    title: {type: 'string', required: true},
    content: {type: 'string', required: true},
    pv: {type: 'number', default: 0},
});
Post.index({author: 1, _id: -1}).exec();

export let Comment = mongolass.model('Comment', {
    author: {type: Mongolass.Types.ObjectId, required: true},
    content: {type: 'string', required: true},
    postId: {type: Mongolass.Types.ObjectId, required: true},
});
Comment.index({postId: 1, _id: 1}).exec();




