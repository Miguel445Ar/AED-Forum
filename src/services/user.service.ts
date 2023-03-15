import { UserRepository } from "../repositories/user.respository";
import { UserRequest } from "../resources/request/user.request";
import { UserResponse } from "../resources/response/user.response";
import { CustomResponse } from "../utils/custom-response";
import { HTTP_STATUS } from "../utils/http-status.enum";
import { UserRequestValidator } from "../validators/user-request.validator";

export class UserService {
    static async saveUser(request: UserRequest) {
        //const response: CustomResponse<UserResponse> = UserRequestValidator.validate(request);
        //if(response.hasErrors()) {
            //return [response.toDto(), HTTP_STATUS.BAD_REQUEST];
        //}
        const newId = await UserRepository.getNewId();
        console.log(newId);
        //const result = await UserRepository.saveUser(new User((newId || 0),request.username, request.email, request.password, request.role));
        //return newId;
    }
}