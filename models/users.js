const User = require('../lib/mongo.js').User;

module.exports = {
    create: function create(user){
        return User.create(user).exec();
    },
    getUserByName: function (name){
        return User
        .findOne({name: name})
        .convertCreatedAt()
        .exec()
    }
}

