const bcryptjs = require('bcryptjs'); //para encriptar la contraseña

const Users = require('../models/user'); //recordar que mongoose le pone el la s User(s)

const getUsers = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;

    const queryExistingUser = { status: true };

    const [total, data] = await Promise.all([
        //ejecuta todas las promesas
        Users.countDocuments(queryExistingUser),
        Users.find(queryExistingUser) //muestra usuarios existentes (status:true)
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

    const user = await Users.findByIdAndUpdate(id, rest, { new: true }); //new: true es para que devuelva el objeto ya modificado
    res.json({ msg: 'put API - user controller', user });
};

const postUser = async (req, res) => {
    const body = req.body;

    const { password } = req.body;

    const user = new Users(body);

    //validacciones se manejan en los middlewares de las routes

    //encriptar password

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en la base de datos

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
