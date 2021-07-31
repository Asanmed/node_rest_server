const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.SECRET_OR_PRIVATE_KEYS,
            {
                expiresIn: '4h',
            },
            (err, token) => {
                if (err) {
                    console.log(error);
                    reject('could not generate token');
                }
                resolve(token);
            }
        );
    });
};

module.exports = { generateJWT };
