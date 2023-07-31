"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../users/models/user.model");
const getDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    const datasource = new typeorm_1.DataSource({
        type: "mysql",
        host: process.env.MYSQL_DB_HOST,
        port: parseInt(process.env.MYSQL_DB_PORT, null),
        username: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_DATABASE,
        entities: [user_model_1.User],
        synchronize: true,
        logging: true
    });
    try {
        const appDatasource = yield datasource.initialize();
        return appDatasource;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
// const connection = async (): Promise<Connection> => {
//     return await createConnection({
//         host: process.env.MYSQL_DB_HOST,
//         user: process.env.MYSQL_DB_USER,
//         password: process.env.MYSQL_DB_PASSWORD,
//         port: parseInt(process.env.MYSQL_DB_PORT, null),
//         database: process.env.MYSQL_DB_DATABASE
//     })
//     .then( (connection: Connection) => connection)
//     .catch( reason => { throw reason; });
// }
exports.default = getDataSource;
//# sourceMappingURL=dbConnection.js.map