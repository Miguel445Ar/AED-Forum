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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const user_respository_1 = require("../repositories/user.respository");
const http_status_enum_1 = require("../utils/http-status.enum");
const user_request_validator_1 = require("../validators/user-request.validator");
class UserService {
    static saveUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = user_request_validator_1.UserRequestValidator.validate(request);
            if (response.hasErrors()) {
                return [response.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
            }
            const newIdQueryResult = yield user_respository_1.UserRepository.getNewId();
            const newId = newIdQueryResult[0][0]['NEW_ID'];
            const result = yield user_respository_1.UserRepository.saveUser(new user_model_1.User((newId || 1), request.username, request.email, request.password, request.role));
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map