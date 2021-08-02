const bcryptjs = require('bcryptjs'); //password encrytion

const Users = require('../models/user'); //mongoose will add the (s) at the end

//validations are made through middlewares, check routes aechives

const getUsers = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;

    //users aree never phisically deleted from DB, they have (status:true) or (status:false)
    const queryExistingUser = { status: true };

    const [total, data] = await Promise.all([
        //ejecutes all promises
        Users.countDocuments(queryExistingUser),
        Users.find(queryExistingUser)
            .skip(parseInt(from))
            .limit(parseInt(limit)),
    ]);
    res.json({ total, data });
};

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await Users.findById(id).exec();
    res.json({ user });
};

const putUser = async (req, res) => {
    const { id } = req.params;
    const { _id, google, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await Users.findByIdAndUpdate(id, rest, { new: true }); //new: true is needed for the modified object to be returned
    res.json({ msg: `user updated`, user });
};

const postUser = async (req, res) => {
    const body = req.body;

    const { password } = req.body;

    const user = new Users(body);

    //password encryption

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save to DB

    await user.save();

    res.json(user);
};

const delUser = async (req, res) => {
    const { id } = req.params;

    const user = await Users.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    );
    res.json({ user });
};

module.exports = {
    getUsers,
    getUser,
    putUser,
    postUser,
    delUser,
};
