export class UserAuthRequest {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
}