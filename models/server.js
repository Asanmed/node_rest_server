const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    //config middlewares

    middlewares() {
        //cors
        this.app.use(cors());

        //read and parse body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    //config routes

    routes() {
        this.app.use('/api/users', require('../routes/user'));
    }

    //config listeners

    listen() {
        this.app.listen(this.port, () => {
            console.log(`CORS enabled, server running on port ${this.port}`);
        });
    }
}

module.exports = Server;
