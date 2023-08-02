import { FieldPacket, RowDataPacket } from "mysql2";
import { ConfirmationToken } from "../models/confirmation-token.model";
import { ConfirmationTokenRepository } from "../repositories/confirmation-token.repository";
import { HTTP_STATUS } from "../../shared/utils/http-status.enum";
import { User } from "../models/user.model";
import { UserService } from "./user.service";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export abstract class ConfirmationTokenService {
    public static confirmationTokenRepository: ConfirmationTokenRepository = new ConfirmationTokenRepository();
    public static async createConfirmationTokenByUserId(userId: number): Promise<[string,HTTP_STATUS]> {
        
        const existingUser: User = await UserService.userRepository.findOneBy({ id: userId });
        if(existingUser === null) {
            return ["User with given id does not exists", HTTP_STATUS.BAD_REQUEST];
        }
        const currentDate = new Date();
        const confirmationToken: ConfirmationToken = await ConfirmationTokenService.confirmationTokenRepository
        .save({
            id: null,
            user: existingUser,
            token: uuidv4(),
            createdAt: currentDate,
            expirationDate: moment(currentDate).add(30,"minutes").toDate()
        } satisfies ConfirmationToken);
        return [confirmationToken.token, HTTP_STATUS.CREATED];
    }
    public static async updateConfirmationToken(token: string): Promise<[object, HTTP_STATUS]> {
        const confirmationToken: ConfirmationToken = await ConfirmationTokenService.confirmationTokenRepository
            .getByToken(token);
        if(confirmationToken === null) {
            return [{ message: "Confirmation token with given token does not exists" }, HTTP_STATUS.BAD_REQUEST];
        }
        if(confirmationToken.confirmedDate !== null) {
            return [{ message: "Confirmation token is already confirmed"}, HTTP_STATUS.BAD_REQUEST];
        }
        confirmationToken.confirmedDate = new Date();
        confirmationToken.user.enabled = true;
        const updatedConfirmationToken = await ConfirmationTokenService.confirmationTokenRepository.save(confirmationToken);
        return [{ message: "User account was confirmed successfully"}, HTTP_STATUS.OK];
    }
}