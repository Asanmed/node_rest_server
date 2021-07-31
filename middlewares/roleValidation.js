const { response, request } = require('express');

const isAdmin = (req, res, next) => {
    console.log(req.body);
    if (!req.user) {
        return res.status(500).json({
            msg: 'tried to verify role without verifying token first',
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin`,
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'tried to verify role without verifying token first',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `user has no rights to perform this action, roles needed: ${roles}`,
            });
        }

        next();
    };
};

module.exports = {
    isAdmin,
    hasRole,
};
