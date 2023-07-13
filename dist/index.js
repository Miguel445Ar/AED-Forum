"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv_1.default.config();
const email_controller_1 = __importDefault(require("./controllers/email.controller"));
const user_pb_1 = require("./proto-models/user_pb");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_auth_middleware_1 = require("./middlewares/user-auth.middleware");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.SERVER_PORT, null);
/*app.get("/", (req,res) => {
    res.sendFile("./static/index.html", { root: process.cwd() })
})*/
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(201).send("Hello world");
});
app.get("/users", (req, res) => {
    const user = new user_pb_1.Person({ id: 1, userName: "Miguel" });
    const data = user.toBinary();
    res.type("binary").send(data);
});
app.use("/users", user_controller_1.default);
app.post("/email", user_auth_middleware_1.auth, email_controller_1.default.sendMailToAdmin);
app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
    process.stdout.write(`Server running on port ${PORT}\n`);
});
//# sourceMappingURL=index.js.map