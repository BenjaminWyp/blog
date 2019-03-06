"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("../middlewares/check");
const signup_1 = require("./signup");
const signin_1 = require("./signin");
const signout_1 = require("./signout");
const posts_1 = require("./posts");
const comments_1 = require("./comments");
function default_1(app) {
    app.get('/', check_1.checkLogin, (req, res) => {
        res.redirect('/posts');
    });
    app.use('/signup', signup_1.default);
    app.use('/signin', signin_1.default);
    app.use('/signout', signout_1.default);
    app.use('/posts', posts_1.default);
    app.use('/comments', comments_1.default);
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
}
exports.default = default_1;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBa0Q7QUFDbEQscUNBQThCO0FBQzlCLHFDQUE4QjtBQUM5Qix1Q0FBZ0M7QUFDaEMsbUNBQTRCO0FBQzVCLHlDQUFrQztBQUdsQyxtQkFBd0IsR0FBUTtJQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQkFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2xDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQU0sQ0FBQyxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFPLENBQUMsQ0FBQztJQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxlQUFLLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxrQkFBUSxDQUFDLENBQUM7SUFDL0IsV0FBVztJQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNoQztJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQWhCRCw0QkFnQkM7QUFBQSxDQUFDIiwiZmlsZSI6InJvdXRlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNoZWNrTG9naW4gfSBmcm9tICcuLi9taWRkbGV3YXJlcy9jaGVjayc7XG5pbXBvcnQgc2lnbnVwIGZyb20gJy4vc2lnbnVwJztcbmltcG9ydCBzaWduaW4gZnJvbSAnLi9zaWduaW4nO1xuaW1wb3J0IHNpZ25vdXQgZnJvbSAnLi9zaWdub3V0JztcbmltcG9ydCBwb3N0cyBmcm9tICcuL3Bvc3RzJztcbmltcG9ydCBjb21tZW50cyBmcm9tICcuL2NvbW1lbnRzJztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcHA6IGFueSl7XG4gICAgYXBwLmdldCgnLycsIGNoZWNrTG9naW4sIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMucmVkaXJlY3QoJy9wb3N0cycpO1xuICAgIH0pO1xuXG4gICAgYXBwLnVzZSgnL3NpZ251cCcsIHNpZ251cCk7XG4gICAgYXBwLnVzZSgnL3NpZ25pbicsIHNpZ25pbik7XG4gICAgYXBwLnVzZSgnL3NpZ25vdXQnLCBzaWdub3V0KTtcbiAgICBhcHAudXNlKCcvcG9zdHMnLCBwb3N0cyk7XG4gICAgYXBwLnVzZSgnL2NvbW1lbnRzJywgY29tbWVudHMpO1xuICAgIC8vIDQwNCBwYWdlXG4gICAgYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCFyZXMuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5yZW5kZXIoJzQwNCcpXG4gICAgICAgIH1cbiAgICB9KVxufTtcbiJdfQ==
