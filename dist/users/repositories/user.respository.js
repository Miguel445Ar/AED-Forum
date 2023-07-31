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
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
const typeorm_1 = require("typeorm");
const dbConnection_1 = require("../../shared/db/dbConnection");
class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(user_model_1.User, new typeorm_1.EntityManager(dbConnection_1.datasource));
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneBy({ email: email });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.respository.js.map