const express = require('express');
const {
    registerUser,
    loginUser
} = require('../controller/users');

const router = express.Router()

//routes@   /api/users/register
//access@   public
router.post('/register', registerUser);

//routes@   /api/users/login    
//access@   public
router.post('/login', loginUser);

module.exports = router