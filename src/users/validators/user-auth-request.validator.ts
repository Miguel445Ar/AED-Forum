import { CustomResponse } from "../../shared/utils/custom-response";
import { UserAuthRequest } from "../resources/request/user-auth.request";
import { UserResponse } from "../resources/response/user.response";

export abstract class UserAuthRequestValidator {
    static validate(request: UserAuthRequest): CustomResponse<UserResponse> {
        const { email, password } = request;
        const response: CustomResponse<UserResponse> = new CustomResponse<UserResponse>();
        if(email === undefined || password === undefined) {
            response.addError("Is missing one or more properties, check api doc");
            return response;
        }
        if(email === null || password === null) {
            response.addError("One or more properties are null, check api doc");
            return response;
        }

        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(regex.test(email) === false) {
            response.addError("Mail does not match with the given format: example@sample.com");
        }

        if(!(password.length > 5 && password.length <= 30)) {
            response.addError("Password length must be between 5 and 30 characters")
        }
        return response;
    }
}