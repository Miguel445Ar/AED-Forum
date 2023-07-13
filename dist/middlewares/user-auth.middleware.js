"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_enum_1 = require("../utils/http-status.enum");
function auth(req, res, next) {
    if (!req.headers) {
        res.status(http_status_enum_1.HTTP_STATUS.BAD_REQUEST).json({
            reason: "You must include headers in request"
        });
        return;
    }
    const hasJWTAuh = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer';
    if (!hasJWTAuh) {
        res.status(http_status_enum_1.HTTP_STATUS.BAD_REQUEST).json({
            reason: "You must include a Bearer authorization header"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET);
        req.token = decoded;
        next();
    }
    catch (error) {
        res.status(http_status_enum_1.HTTP_STATUS.BAD_REQUEST).json({
            reason: "Invalid token"
        });
    }
}
exports.auth = auth;
//# sourceMappingURL=user-auth.middleware.js.map