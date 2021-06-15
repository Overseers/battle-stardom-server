import express from "express";
import router from "./routes";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import config from "../util/config";
import { v4 as uuid } from "uuid";

export default () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // app.use(helmet());

  // app.use(cors({
  //     origin: 'localhost:8080'
  // }));

  app.use((req, res, next) => {
    if (!req.cookies?.id) {
      res.cookie(
        "id",
        jwt.sign({ createdAt: new Date() }, config.sessionSecret, {
          expiresIn: "1h",
        })
      );
    }
    next();
  });

  // app.use((request, response, next) => {
  //     response.header('Content-Security-Policy', 'img-src \'self\'');
  //     next();
  // });

  // app.use(session({
  //     name: 'cookieId',
  //     secret: config.sessionSecret,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //         secure: config.nodeEnv !== 'dev'
  //     }
  // }));

  // app.use((request: any, _, next) => {
  //     if (!request.session.uuid) {
  //         request.session.uuid = uuid();
  //     }
  //     console.log(request.session);
  //     next();
  // });

  app.use(router);

  return app;
};
