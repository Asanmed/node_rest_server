const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

//sacamos el password y la versión del body, el _id es el nombre que le da mongo por defecto a la id, la extraemos también para cambiarle el nombre por "id" por estética
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
};
module.exports = model('User', UserSchema);
