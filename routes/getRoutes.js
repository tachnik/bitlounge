const db = require('../config/database/queries');
module.exports = function(app,passport,isLoggedIn) {
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/', function(req, res, next) {
        if(!req.isAuthenticated()) return res.render('login_page');
        res.render('front_page', { req: req });
    });
}