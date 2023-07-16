"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const user_respository_1 = require("../repositories/user.respository");
const user_response_1 = require("../resources/response/user.response");
const http_status_enum_1 = require("../utils/http-status.enum");
const user_request_validator_1 = require("../validators/user-request.validator");
const b = __importStar(require("bcrypt"));
class UserService {
    static saveUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = user_request_validator_1.UserRequestValidator.validate(request);
            if (response.hasErrors()) {
                return [response.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const newIdQueryResult = yield user_respository_1.UserRepository.getNewId();
            const newId = newIdQueryResult[0][0]['NEW_ID'];
            const queryResult = yield user_respository_1.UserRepository.getUserByEmail(request.email);
            const usersWithSameEmail = queryResult[0];
            if (usersWithSameEmail.length > 0) {
                response.addError("Email already exists");
                return [response.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const user = new user_model_1.User((newId || 1), request.username, request.email, request.password, request.role);
            const encriptedPassword = b.hashSync(user.password, 2);
            user.password = encriptedPassword;
            const result = yield user_respository_1.UserRepository.saveUser(user);
            return [new user_response_1.UserResponse(user.id, user.username, user.email, user.password, user.role), http_status_enum_1.HTTP_STATUS.CREATED];
        });
    }
    static logIn(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_respository_1.UserRepository.getUserByEmail(request.email);
            let user = result[0];
            if (user.length === 0) {
                return [{ message: "User with given email does not exist" }, http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const passwordMatches = yield b.compare(request.password, user[0].password);
            if (!passwordMatches) {
                return [{ message: "Given password does not match" }, http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const token = jsonwebtoken_1.default.sign({ id: user[0].id, email: user[0].email, createdAt: new Date().getTime() }, process.env.API_SECRET, { expiresIn: "7d" });
            return [{ user: user[0], token }, http_status_enum_1.HTTP_STATUS.OK];
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map