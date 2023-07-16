import { USER_ROLE } from "../../utils/user-role";

export class UserResponse {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public password: string,
        public role: USER_ROLE
    ) {}
}