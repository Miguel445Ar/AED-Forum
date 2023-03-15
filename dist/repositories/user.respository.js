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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
class UserRepository {
    static saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = user.role;
            return yield dbConnection_1.default.query(`INSERT INTO users VALUES(${user.id},
            ${user.username}),${user.email},${user.password},${role});`);
        });
    }
    static findUserByCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbConnection_1.default.query(`SELECT * FROM users where users.email = ${email}
         and users.password = ${password}`);
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbConnection_1.default.query(`SELECT * FROM users`);
        });
    }
    static deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbConnection_1.default.query(`DELETE FROM users where id = ${id};`);
        });
    }
    static getNewId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dbConnection_1.default.query(`SELECT MAX(id)+1 FROM users`);
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.respository.js.map