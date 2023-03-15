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
const user_respository_1 = require("../repositories/user.respository");
class UserService {
    static saveUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            //const response: CustomResponse<UserResponse> = UserRequestValidator.validate(request);
            //if(response.hasErrors()) {
            //return [response.toDto(), HTTP_STATUS.BAD_REQUEST];
            //}
            const newId = yield user_respository_1.UserRepository.getNewId();
            console.log(newId);
            //const result = await UserRepository.saveUser(new User((newId || 0),request.username, request.email, request.password, request.role));
            //return newId;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map