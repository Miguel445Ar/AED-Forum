"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationToken = void 0;
const crypto_1 = require("crypto");
class ConfirmationToken {
    constructor(id, userId, createdAt) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.token = (0, crypto_1.randomUUID)();
        this.expirationDate = new Date(this.createdAt.getTime() + 15 * 60000);
        this.confirmedDate = null;
    }
    toQuery() {
        return `VALUES (${this.id}, ${this.token}, ${this.createdAt.toISOString()}, ${this.expirationDate.toISOString()}, ${this.confirmedDate.toISOString()}, ${this.userId});`;
    }
    getId() {
        return this.id;
    }
    getToken() {
        return this.token;
    }
    getConfirmedDate() {
        return this.confirmedDate;
    }
}
exports.ConfirmationToken = ConfirmationToken;
//# sourceMappingURL=confirmation-token.model.js.map