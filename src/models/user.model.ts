import { USER_ROLE } from "../utils/user-role";

export class User {
    constructor(
        private _id: number,
        private _username: string,
        private _email: string,
        private _password: string,
        private _role: USER_ROLE
    ) {}
    public get id(): number { return this._id; }
    public get username(): string { return this._username; }
    public get email(): string { return this._email; }
    public get password(): string { return this._password; }
    public get role(): USER_ROLE { return this._role; }
}