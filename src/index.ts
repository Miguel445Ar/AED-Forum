import express from "express";
import "reflect-metadata";
import * as core from "express-serve-static-core";
import dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import EmailController from "./users/controllers/email.controller";
import UserController from "./users/controllers/user.controller";
import ConfirmationTokenController from "./users/controllers/confirmation-token.controller";
import { auth } from "./users/middlewares/user-auth.middleware";
import getDataSource from "./shared/db/dbConnection";
import { DataSource } from "typeorm";


// Datasource config
getDataSource().then( (datasource: DataSource) => {
    const app: core.Express = express();
    const PORT: number = parseInt(process.env.SERVER_PORT, null);
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.use("/users", UserController);
    app.use("/confirmation-tokens", ConfirmationTokenController);
    app.post("/email", auth, EmailController.sendMailToAdmin);
    app.listen(PORT, () => {
        // console.log(`Server running on port ${PORT}`);
        process.stdout.write(`Server running on port ${PORT}\n`);
    });
})
.catch( error => { throw new Error(error as string); })


