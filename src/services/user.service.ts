import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.respository";
import { UserRequest } from "../resources/request/user.request";
import { UserResponse } from "../resources/response/user.response";
import { CustomResponse } from "../utils/custom-response";
import { HTTP_STATUS } from "../utils/http-status.enum";
import { UserRequestValidator } from "../validators/user-request.validator";
import * as b from "bcrypt";
import { RowDataPacket } from "mysql2";
import { UserAuthRequest } from "../resources/request/user-auth.request";

export class UserService {
    static async saveUser(request: UserRequest): Promise<[object, HTTP_STATUS]> {
        const response: CustomResponse<UserResponse> = UserRequestValidator.validate(request);
        if(response.hasErrors()) {
            return [response.toDto(), HTTP_STATUS.BAD_REQUEST];
        }
        const newIdQueryResult: object = await UserRepository.getNewId();
        const newId: (number | null) = newIdQueryResult[0][0]['NEW_ID'];
        const userWithSameEmail = await UserRepository.getUserByEmail(request.email);
        if(userWithSameEmail == null) {
            response.addError("Email already exists");
            return [response.toDto(), HTTP_STATUS.BAD_REQUEST];
        }
        const user: User = new User((newId || 1),request.username, request.email, request.password, request.role);
        const encriptedPassword = b.hashSync(user.password, 2);
        user.password = encriptedPassword;
        const result = await UserRepository.saveUser(user);
        return [new UserResponse(user.id, user.username, user.email, user.password, user.role), HTTP_STATUS.OK];
    }
    static async logIn(request: UserAuthRequest): Promise<[object, HTTP_STATUS]> {
        let result: RowDataPacket[][] = await UserRepository.getUserByEmail(request.email);
        let user: UserResponse[] = result[0] as UserResponse[];
        if(user.length === 0) {
            return [{ message: "User with given email does not exist" }, HTTP_STATUS.BAD_REQUEST];
        }
        return [{ user }, HTTP_STATUS.OK];
    }
}