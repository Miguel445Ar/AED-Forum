import express from "express";
import * as core from "express-serve-static-core";
import dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import EmailController from "./controllers/email.controller";
import { Person } from "./proto-models/user_pb";
import UserController from "./controllers/user.controller";

dotenv.config();

const app: core.Express = express();
const PORT: number = parseInt(process.env.SERVER_PORT, null);

/*app.get("/", (req,res) => {
    res.sendFile("./static/index.html", { root: process.cwd() })
})*/

app.use(express.json());

app.get("/", (req, res) => {
    res.status(201).send("Hello world");
});

app.get("/users", (req, res) => {
    const user: Person = new Person({ id: 1, userName: "Miguel"});
    const data: Uint8Array = user.toBinary();
    res.type("binary").send(data);
})

app.use("/auth", UserController);

app.post("/email", EmailController.sendMailToAdmin);

app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
    process.stdout.write(`Server running on port ${PORT}\n`);
});


