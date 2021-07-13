const { Router } = require('express');
const {
    getUsers,
    putUser,
    postUser,
    delUser,
    patchUser,
} = require('../controllers/user');

const router = new Router();

router.get('/', getUsers);

router.put('/:id', putUser);

router.post('/', postUser);

router.delete('/', delUser);

router.patch('/', patchUser);

module.exports = router;
