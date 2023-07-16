import { USER_ROLE } from "../../utils/user-role";

export class UserRequest {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: USER_ROLE
    ) {}
}