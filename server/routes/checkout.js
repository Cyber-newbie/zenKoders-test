const express = require('express');
const passport = require('passport')
const {
    Subscribe
} = require('../controller/subscribe');
const checkoutRouter = express.Router()


//routes@   /api/checkout
//access@   private
checkoutRouter.post('/', passport.authenticate('jwt', {
    session: false,
}), Subscribe)

module.exports = checkoutRouter