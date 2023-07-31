"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthRequestValidator = void 0;
const custom_response_1 = require("../../shared/utils/custom-response");
class UserAuthRequestValidator {
    static validate(request) {
        const { email, password } = request;
        const response = new custom_response_1.CustomResponse();
        if (email === undefined || password === undefined) {
            response.addError("Is missing one or more properties, check api doc");
            return response;
        }
        if (email === null || password === null) {
            response.addError("One or more properties are null, check api doc");
            return response;
        }
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(email) === false) {
            response.addError("Mail does not match with the given format: example@sample.com");
        }
        if (!(password.length > 5 && password.length <= 30)) {
            response.addError("Password length must be between 5 and 30 characters");
        }
        return response;
    }
}
exports.UserAuthRequestValidator = UserAuthRequestValidator;
//# sourceMappingURL=user-auth-request.validator.js.map