"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const check_1 = require("../middlewares/check");
const comments_1 = require("../models/comments");
const router = express.Router();
router.post('/', check_1.checkLogin, (req, res, next) => {
    const author = req.session.user._id;
    const postId = req.fields.postId;
    const content = req.fields.content;
    // 校验参数
    try {
        if (!content.length) {
            throw new Error('请填写留言内容');
        }
    }
    catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    const comment = {
        author: author,
        postId: postId,
        content: content
    };
    comments_1.default.create(comment).then(function () {
        req.flash('success', '留言成功');
        // 留言成功后跳转到上一页
        res.redirect('back');
    }).catch(next);
});
router.post('/:commentId/remove', check_1.checkLogin, (req, res, next) => {
    const commentId = req.params.commentId;
    const author = req.session.user._id;
    comments_1.default.getCommentById(commentId)
        .then(function (comment) {
        if (!comment) {
            throw new Error('留言不存在');
        }
        if (comment.author.toString() !== author.toString()) {
            throw new Error('没有权限删除留言');
        }
        comments_1.default.delCommentById(commentId)
            .then(function () {
            req.flash('success', '删除留言成功');
            // 删除成功后跳转到上一页
            res.redirect('back');
        })
            .catch(next);
    });
});
exports.default = router;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMvY29tbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsZ0RBQWtEO0FBQ2xELGlEQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsa0JBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDNUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBZ0IsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQWlCLENBQUM7SUFFN0MsT0FBTztJQUNQLElBQUk7UUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ3pCO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDOUI7SUFFRCxNQUFNLE9BQU8sR0FBRztRQUNaLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFBO0lBRUQsa0JBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVCLGNBQWM7UUFDZCxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsa0JBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDN0QsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDdEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBRW5DLGtCQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztTQUNyQyxJQUFJLENBQUMsVUFBVSxPQUFPO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3pCO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQzVCO1FBQ0Qsa0JBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO2FBQ25DLElBQUksQ0FBQztZQUNKLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQzlCLGNBQWM7WUFDZCxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIiwiZmlsZSI6InJvdXRlcy9jb21tZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBjaGVja0xvZ2luIH0gZnJvbSAnLi4vbWlkZGxld2FyZXMvY2hlY2snO1xuaW1wb3J0IENvbW1lbnRNb2RlbCBmcm9tICcuLi9tb2RlbHMvY29tbWVudHMnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdCgnLycsIGNoZWNrTG9naW4sIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGF1dGhvciA9IHJlcS5zZXNzaW9uLnVzZXIuX2lkO1xuICAgIGNvbnN0IHBvc3RJZCA9IHJlcS5maWVsZHMucG9zdElkIGFzIHN0cmluZztcbiAgICBjb25zdCBjb250ZW50ID0gcmVxLmZpZWxkcy5jb250ZW50IGFzIHN0cmluZztcblxuICAgIC8vIOagoemqjOWPguaVsFxuICAgIHRyeSB7XG4gICAgICAgIGlmICghY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfor7floavlhpnnlZnoqIDlhoXlrrknKVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXEuZmxhc2goJ2Vycm9yJywgZS5tZXNzYWdlKVxuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KCdiYWNrJylcbiAgICB9XG5cbiAgICBjb25zdCBjb21tZW50ID0ge1xuICAgICAgICBhdXRob3I6IGF1dGhvcixcbiAgICAgICAgcG9zdElkOiBwb3N0SWQsXG4gICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICB9XG5cbiAgICBDb21tZW50TW9kZWwuY3JlYXRlKGNvbW1lbnQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXEuZmxhc2goJ3N1Y2Nlc3MnLCAn55WZ6KiA5oiQ5YqfJylcbiAgICAgICAgLy8g55WZ6KiA5oiQ5Yqf5ZCO6Lez6L2s5Yiw5LiK5LiA6aG1XG4gICAgICAgIHJlcy5yZWRpcmVjdCgnYmFjaycpXG4gICAgfSkuY2F0Y2gobmV4dClcbn0pO1xuXG5yb3V0ZXIucG9zdCgnLzpjb21tZW50SWQvcmVtb3ZlJywgY2hlY2tMb2dpbiwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgY29uc3QgY29tbWVudElkID0gcmVxLnBhcmFtcy5jb21tZW50SWRcbiAgICBjb25zdCBhdXRob3IgPSByZXEuc2Vzc2lvbi51c2VyLl9pZFxuXG4gICAgQ29tbWVudE1vZGVsLmdldENvbW1lbnRCeUlkKGNvbW1lbnRJZClcbiAgICAudGhlbihmdW5jdGlvbiAoY29tbWVudCkge1xuICAgICAgaWYgKCFjb21tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcign55WZ6KiA5LiN5a2Y5ZyoJylcbiAgICAgIH1cbiAgICAgIGlmIChjb21tZW50LmF1dGhvci50b1N0cmluZygpICE9PSBhdXRob3IudG9TdHJpbmcoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ayoeacieadg+mZkOWIoOmZpOeVmeiogCcpXG4gICAgICB9XG4gICAgICBDb21tZW50TW9kZWwuZGVsQ29tbWVudEJ5SWQoY29tbWVudElkKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVxLmZsYXNoKCdzdWNjZXNzJywgJ+WIoOmZpOeVmeiogOaIkOWKnycpXG4gICAgICAgICAgLy8g5Yig6Zmk5oiQ5Yqf5ZCO6Lez6L2s5Yiw5LiK5LiA6aG1XG4gICAgICAgICAgcmVzLnJlZGlyZWN0KCdiYWNrJylcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKG5leHQpXG4gICAgfSlcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=
