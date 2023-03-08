import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.respository";
import { UserRequest } from "../resources/request/user.request";

export class UserService {
    static async saveUser(request: UserRequest) {
        const result = await UserRepository.saveUser(new User(0,request.username, request.email, request.password, request.role));
        
    }
}