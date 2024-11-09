const express = require('express')
const router = express.Router();
const {addFavorite, getFavorites, removeFavorite } = require('./controllers')
const passport = require('passport')

router.post( '/api/favorites',  passport.authenticate('jwt', { session: false }),addFavorite)
router.get('/api/favorites/:id', passport.authenticate('jwt', { session: false }), getFavorites);
router.delete('/api/favorites/:id', passport.authenticate('jwt', { session: false }), removeFavorite);

module.exports = router;