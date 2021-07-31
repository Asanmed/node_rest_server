const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { isAdmin, hasRole } = require('../middlewares/roleValidation');

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
//get user list
router.get('/', getUsers);

//get single user info
router.get(
    '/id',
    [
        check('id', 'not a valis id').isMongoId(),
        check('id').custom(userByIdValidation),
        fieldValidation,
    ],
    getUser
);

//modify user
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

//create new user
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

//delete user, it does not remove from database, set {"status": false,}
router.delete(
    '/:id',
    [
        tokenValidation,
        //isAdmin,
        hasRole('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'not a valis id').isMongoId(),
        check('id').custom(userByIdValidation),
        fieldValidation,
    ],
    delUser
);

module.exports = router;
