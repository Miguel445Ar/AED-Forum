import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.respository";
import { UserRequest } from "../resources/request/user.request";
import { UserResponse } from "../resources/response/user.response";
import { CustomResponse } from "../../shared/utils/custom-response";
import { HTTP_STATUS } from "../../shared/utils/http-status.enum";
import { UserRequestValidator } from "../validators/user-request.validator";
import * as b from "bcrypt";
import { RowDataPacket } from "mysql2";
import { UserAuthRequest } from "../resources/request/user-auth.request";
import { ConfirmationTokenService } from "./confirmation-token.service";
import { USER_ROLE } from "../utils/user-role";
import { UserAuthRequestValidator } from "../validators/user-auth-request.validator";

export abstract class UserService {
    private static userRepository: UserRepository = new UserRepository();
    static async saveUser(request: UserRequest): Promise<[object, HTTP_STATUS]> {
        const errorResponse: CustomResponse<UserResponse> = UserRequestValidator.validate(request);
        if(errorResponse.hasErrors()) {
            return [errorResponse.toDto(), HTTP_STATUS.BAD_REQUEST];
        }

        const userWithSameEmail: User = await UserService.userRepository.findByEmail(request.email);

        if(userWithSameEmail !== null) {
            errorResponse.addError("Email already exists");
            return [errorResponse.toDto(), HTTP_STATUS.BAD_REQUEST];
        }

        const user: User = await UserService.userRepository.save({
            id: null,
            email: request.email,
            username: request.username,
            password: b.hashSync(request.password, 2),
            role: request.role,
            enabled: false
        } satisfies User);

        return [{ user }, HTTP_STATUS.CREATED];
    }
    static async logIn(request: UserAuthRequest): Promise<[object, HTTP_STATUS]> {
        const errorResponse: CustomResponse<UserResponse> = UserAuthRequestValidator.validate(request);
        if(errorResponse.hasErrors()) {
            return [errorResponse.toDto(), HTTP_STATUS.BAD_REQUEST];
        }

        const currentUser: User = await UserService.userRepository.findByEmail(request.email);
        if(currentUser === null) {
            return [{ message: "User with given email does not exist" }, HTTP_STATUS.BAD_REQUEST];
        }
        if(!currentUser.enabled) {
            return [{ message: "User account has not been confirmed yet" }, HTTP_STATUS.BAD_REQUEST];
        }
        const passwordMatches: boolean = await b.compare(request.password, currentUser.password);
        if(!passwordMatches) {
            return [{ message: "Given password does not match" }, HTTP_STATUS.BAD_REQUEST];
        }
        const token: string = jwt.sign(
            { id: currentUser.id, email: currentUser.email, createdAt: new Date().getTime() }, 
            process.env.API_SECRET,
            { expiresIn: "7d" }
        );
        return [{ user: currentUser, token }, HTTP_STATUS.OK];
    }
}