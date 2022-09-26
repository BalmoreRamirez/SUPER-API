const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            search: '/api/buscar',
            categories: '/api/categorias',
            product: '/api/productos',
            user: '/api/usuarios',
            uploads: '/api/uploads',
        }

        // connect to database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // route application
        this.routes();
    }

// end construct

    // connect to database
    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // reading and parsing the body
        this.app.use(express.json());

        // Directory public
        this.app.use(express.static('public'));

        // File-upload - load file
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.search, require('../routes/buscar'));
        this.app.use(this.paths.categories, require('../routes/categorias'));
        this.app.use(this.paths.product, require('../routes/productos'));
        this.app.use(this.paths.user, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('***RUN SERVER IN THE PORT******', this.port);
        });
    }

}

module.exports = Server;
