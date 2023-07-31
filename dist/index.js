"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv_1.default.config();
const email_controller_1 = __importDefault(require("./users/controllers/email.controller"));
const user_controller_1 = __importDefault(require("./users/controllers/user.controller"));
const confirmation_token_controller_1 = __importDefault(require("./users/controllers/confirmation-token.controller"));
const user_auth_middleware_1 = require("./users/middlewares/user-auth.middleware");
const dbConnection_1 = __importDefault(require("./shared/db/dbConnection"));
const entity_manager_1 = __importDefault(require("./shared/db/entity-manager"));
// Datasource config
(0, dbConnection_1.default)().then((datasource) => {
    entity_manager_1.default.setEntityManager(datasource);
    const app = (0, express_1.default)();
    const PORT = parseInt(process.env.SERVER_PORT, null);
    app.use(express_1.default.json());
    app.use("/users", user_controller_1.default);
    app.use("/confirmation-tokens", confirmation_token_controller_1.default);
    app.post("/email", user_auth_middleware_1.auth, email_controller_1.default.sendMailToAdmin);
    app.listen(PORT, () => {
        // console.log(`Server running on port ${PORT}`);
        process.stdout.write(`Server running on port ${PORT}\n`);
    });
})
    .catch(error => { throw new Error(error); });
//# sourceMappingURL=index.js.map