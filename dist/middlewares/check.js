"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        return res.redirect('/signin');
    }
    next();
}
exports.checkLogin = checkLogin;
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录');
        return res.redirect('back');
    }
    next();
}
exports.checkNotLogin = checkNotLogin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taWRkbGV3YXJlcy9jaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLFNBQWdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDckMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDO1FBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUVELElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQVBELGdDQU9DO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUN4QyxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDO1FBQ2hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQjtJQUVELElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQVBELHNDQU9DIiwiZmlsZSI6Im1pZGRsZXdhcmVzL2NoZWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tMb2dpbihyZXEsIHJlcywgbmV4dCl7XG4gICAgaWYoIXJlcS5zZXNzaW9uLnVzZXIpe1xuICAgICAgICByZXEuZmxhc2goJ2Vycm9yJywgJ+acqueZu+W9lScpO1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KCcvc2lnbmluJyk7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tOb3RMb2dpbihyZXEsIHJlcywgbmV4dCl7XG4gICAgaWYocmVxLnNlc3Npb24udXNlcil7XG4gICAgICAgIHJlcS5mbGFzaCgnZXJyb3InLCAn5bey55m75b2VJyk7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoJ2JhY2snKTtcbiAgICB9XG5cbiAgICBuZXh0KCk7XG59XG4iXX0=
