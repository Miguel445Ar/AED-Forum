"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor() {
        this._errors = [];
        this._resource = null;
    }
    addError(error) {
        this._errors.push(error);
    }
    hasErrors() {
        return this._errors.length > 0;
    }
    get resource() {
        return this._resource;
    }
    set resource(resource) {
        this._resource = resource;
    }
    get errors() {
        return this._errors;
    }
    toDto() {
        if (this.hasErrors()) {
            return {
                errors: this._errors
            };
        }
        return { data: this._resource };
    }
}
exports.CustomResponse = CustomResponse;
//# sourceMappingURL=custom-response.js.map