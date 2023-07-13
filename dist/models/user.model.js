"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(_id, _username, _email, _password, _role) {
        this._id = _id;
        this._username = _username;
        this._email = _email;
        this._password = _password;
        this._role = _role;
    }
    toQuery() {
        return `VALUES (${this._id}, ${this._username}, ${this._email}, ${this._password}, ${this._role})`;
    }
    get id() { return this._id; }
    get username() { return this._username; }
    get email() { return this._email; }
    get password() { return this._password; }
    get role() { return this._role; }
    getPayload() {
        return {
            id: this._id
        };
    }
    set password(password) {
        this._password = password;
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map