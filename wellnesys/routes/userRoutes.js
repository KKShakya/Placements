const express = require('express');
const { getUser, register, login } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/Auth');



const router = express.Router();


router.get('/', isAuthenticated, getUser);
router.post('/', register);
router.post('/login', login);




module.exports = router;