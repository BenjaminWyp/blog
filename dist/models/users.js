"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../lib/mongo.js').User;
exports.default = {
    create: function create(user) {
        return User.create(user).exec();
    },
    getUserByName: function (name) {
        return User
            .findOne({ name: name })
            .convertCreatedAt()
            .exec();
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFFN0Msa0JBQWU7SUFDWCxNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsSUFBSTtRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNELGFBQWEsRUFBRSxVQUFVLElBQUk7UUFDekIsT0FBTyxJQUFJO2FBQ1YsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ3JCLGdCQUFnQixFQUFFO2FBQ2xCLElBQUksRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNKLENBQUEiLCJmaWxlIjoibW9kZWxzL3VzZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL2xpYi9tb25nby5qcycpLlVzZXI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSh1c2VyKXtcbiAgICAgICAgcmV0dXJuIFVzZXIuY3JlYXRlKHVzZXIpLmV4ZWMoKTtcbiAgICB9LFxuICAgIGdldFVzZXJCeU5hbWU6IGZ1bmN0aW9uIChuYW1lKXtcbiAgICAgICAgcmV0dXJuIFVzZXJcbiAgICAgICAgLmZpbmRPbmUoe25hbWU6IG5hbWV9KVxuICAgICAgICAuY29udmVydENyZWF0ZWRBdCgpXG4gICAgICAgIC5leGVjKClcbiAgICB9XG59XG5cbiJdfQ==
