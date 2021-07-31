const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/fieldValidation');

const router = new Router();

router.post(
    '/login',
    [
        check('email', 'the email is required').isEmail(),
        check('password', 'password is required').not().isEmpty(),
        fieldValidation,
    ],
    login
);

module.exports = router;
