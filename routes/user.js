const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');

const {
    getUsers,
    getUser,
    putUser,
    postUser,
    delUser,
    patchUser,
} = require('../controllers/user');
const {
    roleValidation,
    emailValidation,
    userByIdValidation,
} = require('../utils/db-validators');

const router = new Router();

router.get('/', getUsers);
router.get(
    '/id',
    [
        check('id', 'not a valis id').isMongoId(),
        check('id').custom(userByIdValidation),
        fieldValidation,
    ],
    getUser
);

router.put(
    '/:id',
    [
        check('id', 'not a valis id').isMongoId(),
        check('id').custom(userByIdValidation),
        check('role').custom(roleValidation),
        fieldValidation,
    ],
    putUser
);

router.post(
    '/',
    [
        check('name', 'name required').not().isEmpty(),
        check('email', 'invalid email').isEmail(),
        check('email').custom(emailValidation),
        check(
            'password',
            'password must be at least 6 characters long'
        ).isLength({ min: 6 }),
        check('role').custom(roleValidation),
        fieldValidation,
    ],
    postUser
);

router.delete(
    '/:id',
    [
        check('id', 'not a valis id').isMongoId(),
        check('id').custom(userByIdValidation),
        fieldValidation,
    ],
    delUser
);

router.patch('/', patchUser);

module.exports = router;
