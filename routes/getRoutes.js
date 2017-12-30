const pugData = require('./../views/pugData.js');
const { HLTV } = require('hltv');
const db = require('../app/database/queries');
var stringify = require('js-stringify');
const axios = require('axios');

module.exports = function(app,login,isLoggedIn,authenticate) {
    app.get('/', function(req, res, next) {
        res.render('front_page', pugData.get(req));
    });
    app.get('/logout', function(req, res, next) {
        req.session.destroy(() => {
            res.redirect('/');
        })
    });
    app.get('/profile/:profileId',isLoggedIn, function(req, res, next) {
        res.render('profile_page', pugData.get(req));
    });
    app.get('/bets/:pageId', isLoggedIn, function(req,res) {
        db.user.getAllBets(req.params.pageId).then((bets) => {
            res.render('bets_page', pugData.get(req, {
                pageData: stringify(bets),
                pageId: req.params.pageId,
            }));
        })
    })
    app.get('/player/:playerId', function(req,res) {
        HLTV.getPlayer({id: req.params.playerId}).then(player => {
            res.render('player_page', pugData.get(req, {
                pageData: stringify(player),
                pageId: req.params.playerId,
            }));
        })
    })
    app.get('/team/:id', function(req,res) {
        HLTV.getTeam({id: req.params.id}).then(team => {
            res.render('team_page', pugData.get(req, {
                pageData: stringify(team),
                pageId: req.params.id,
            }));
        })
    })
    app.get('/match/:matchId',((req, res, next) => {
        db.match.get(req.params.matchId).then((match) => {
            res.render('match_page', pugData.get(req, {
                pageData: stringify(match),
                pageId: req.params.matchId,
            }));
        });
    }));
    app.get('/auth/coinbase', authenticate)
    app.get('/auth/coinbase/callback',login);
}
