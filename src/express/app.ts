import express from 'express';
import router from './routes';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import config from '../util/config';

export default () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // app.use(helmet());

    // app.use(cors({
    //     origin: 'localhost:8080'
    // }));

    // app.use((request, response, next) => {
    //     response.header('Content-Security-Policy', 'img-src \'self\'');
    //     next();
    // });

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: config.nodeEnv !== 'dev'
        }
    }));

    app.use(router);

    return app;
};
