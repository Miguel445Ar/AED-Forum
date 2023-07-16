import { UserRequest } from "../resources/request/user.request";
import { UserResponse } from "../resources/response/user.response";
import { CustomResponse } from "../utils/custom-response";
import { USER_ROLE } from "../utils/user-role";

export abstract class UserRequestValidator {
    static validate(request: UserRequest): CustomResponse<UserResponse> {
        const { username, email, password, role } = request;
        const response: CustomResponse<UserResponse> = new CustomResponse<UserResponse>();
        if(username === undefined || email === undefined || password === undefined
            || role === undefined) {
            response.addError("Is missing one or more properties, check api doc");
            return response;
        }
        if(username === null || email === null || password === null
            || role === null) {
            response.addError("One or more properties are null, check api doc");
            return response;
        }

        if(!(username.length > 5 && username.length <= 20)) {
            response.addError("Username length must be between 5 and 20 characters");
        }

        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(regex.test(email) === false) {
            response.addError("Mail does not match with the given format: example@sample.com");
        }

        if(!(password.length > 5 && password.length <= 30)) {
            response.addError("Password length must be between 5 and 30 characters")
        }

        if(!(role === USER_ROLE.ADMIN || role === USER_ROLE.USER)) {
            response.addError("Role must be Admin or User");
        }
        return response;
    }
}