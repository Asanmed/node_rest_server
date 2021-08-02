const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    id: {
        type: String,
        //required: [true, 'id is required'],
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
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
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

//extract password and version from body
//_id is the name given by mongodb, we extract it and replace it for id for readability and stetic reasons
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
};
module.exports = model('User', UserSchema);
