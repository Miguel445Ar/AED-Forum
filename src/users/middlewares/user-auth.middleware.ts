import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../utils/http-status.enum";

export interface CustomRequest extends Request {
    token: string | jwt.JwtPayload;
}

export function auth(req: Request, res: Response, next: NextFunction) {
    if(!req.headers) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            reason: "You must include headers in request"
        })
        return;
    }
    const hasJWTAuh: boolean = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer';
    if(!hasJWTAuh){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            reason: "You must include a Bearer authorization header"
        })
        return;
    }
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET);
        (req as CustomRequest).token = decoded;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            reason: "Invalid token"
        })
    }
}