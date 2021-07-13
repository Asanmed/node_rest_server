const getUsers = (req, res) => {
    const { first_name, last_name, email, page, limit } = req.query;

    res.json({
        msg: 'get API - user controller',
        first_name,
        last_name,
        email,
        page,
        limit,
    });
};

const putUser = (req, res) => {
    const { id } = req.params;

    res.json({ msg: 'put API - user controller', id });
};

const postUser = (req, res) => {
    const { first_name, last_name } = req.body;
    res.json({ msg: 'post API - user controller', first_name, last_name });
};

const delUser = (req, res) => {
    res.json({ msg: 'delete API - user controller' });
};

const patchUser = (req, res) => {
    res.json({ msg: 'patch API - user controller' });
};

module.exports = {
    getUsers,
    putUser,
    postUser,
    delUser,
    patchUser,
};
