"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestValidator = void 0;
const custom_response_1 = require("../utils/custom-response");
const user_role_1 = require("../utils/user-role");
class UserRequestValidator {
    static validate(request) {
        const { username, email, password, role } = request;
        const response = new custom_response_1.CustomResponse();
        if (username === undefined || email === undefined || password === undefined
            || role === undefined) {
            response.addError("Is missing one or more properties, check api doc");
            return response;
        }
        if (username === null || email === null || password === null
            || role === null) {
            response.addError("One or more properties are null, check api doc");
            return response;
        }
        if (!(username.length > 5 && username.length <= 20)) {
            response.addError("Username length must be between 5 and 20 characters");
        }
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(email) === false) {
            response.addError("Mail does not match with the given format: example@sample.com");
        }
        if (!(password.length > 5 && password.length <= 30)) {
            response.addError("Password length must be between 5 and 30 characters");
        }
        if (!(role === user_role_1.USER_ROLE.ADMIN || role === user_role_1.USER_ROLE.USER)) {
            response.addError("Role must be Admin or User");
        }
        return response;
    }
}
exports.UserRequestValidator = UserRequestValidator;
//# sourceMappingURL=user-request.validator.js.map