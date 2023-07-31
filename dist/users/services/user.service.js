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
const user_respository_1 = require("../repositories/user.respository");
const http_status_enum_1 = require("../../shared/utils/http-status.enum");
const user_request_validator_1 = require("../validators/user-request.validator");
const b = __importStar(require("bcrypt"));
const user_auth_request_validator_1 = require("../validators/user-auth-request.validator");
class UserService {
    static saveUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorResponse = user_request_validator_1.UserRequestValidator.validate(request);
            if (errorResponse.hasErrors()) {
                return [errorResponse.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const userWithSameEmail = yield UserService.userRepository.findByEmail(request.email);
            if (userWithSameEmail !== null) {
                errorResponse.addError("Email already exists");
                return [errorResponse.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const user = yield UserService.userRepository.save({
                id: null,
                email: request.email,
                username: request.username,
                password: b.hashSync(request.password, 2),
                role: request.role,
                enabled: false
            });
            return [{ user }, http_status_enum_1.HTTP_STATUS.CREATED];
        });
    }
    static logIn(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorResponse = user_auth_request_validator_1.UserAuthRequestValidator.validate(request);
            if (errorResponse.hasErrors()) {
                return [errorResponse.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const currentUser = yield UserService.userRepository.findByEmail(request.email);
            if (currentUser === null) {
                return [{ message: "User with given email does not exist" }, http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            if (!currentUser.enabled) {
                return [{ message: "User account has not been confirmed yet" }, http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const passwordMatches = yield b.compare(request.password, currentUser.password);
            if (!passwordMatches) {
                return [{ message: "Given password does not match" }, http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const token = jsonwebtoken_1.default.sign({ id: currentUser.id, email: currentUser.email, createdAt: new Date().getTime() }, process.env.API_SECRET, { expiresIn: "7d" });
            return [{ user: currentUser, token }, http_status_enum_1.HTTP_STATUS.OK];
        });
    }
}
exports.UserService = UserService;
UserService.userRepository = new user_respository_1.UserRepository();
//# sourceMappingURL=user.service.js.map