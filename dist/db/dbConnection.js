"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
exports.default = (function dbConf() {
    const connection = mysql_1.default.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        port: parseInt(process.env.MYSQL_DB_PORT, null),
        database: process.env.MYSQL_DB_DATABASE
    });
    function query(sql, args) {
        return new Promise((resolve, reject) => {
            connection.query(sql, args, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    function close() {
        return new Promise((resolve, reject) => {
            connection.end((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Connection was successfully closed");
            });
        });
    }
    return { query, close };
})();
//# sourceMappingURL=dbConnection.js.map