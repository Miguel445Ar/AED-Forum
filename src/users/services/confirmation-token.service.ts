import { FieldPacket, RowDataPacket } from "mysql2";
import { ConfirmationToken } from "../models/confirmation-token.model";
import { ConfirmationTokenRepository } from "../repositories/confirmation-token.repository";
import { HTTP_STATUS } from "../../shared/utils/http-status.enum";

export abstract class ConfirmationTokenService {
    // public static confirmationTokenRepository: ConfirmationTokenRepository = new ConfirmationTokenRepository();
    // public static async createConfirmationTokenByUserId(userId: number): Promise<[string, HTTP_STATUS]> {
    //     const result: RowDataPacket[][] = await this.confirmationTokenRepository.getNewId(); 
    //     const newId: (number | null) = result[0][0]['NEW_ID'];
    //     const confirmationToken: ConfirmationToken = new ConfirmationToken(
    //         (newId || 1),
    //         userId.toString(),
    //         new Date()
    //     );
    //     const confirmationTokenSavedResult = await this.confirmationTokenRepository.save(confirmationToken);
    //     return [confirmationToken.getToken(), HTTP_STATUS.CREATED];
    // }
    // public static async updateConfirmationToken(token: string): Promise<[object, HTTP_STATUS]> {
    //     const queryResult: ConfirmationToken[] = 
    //     await this.confirmationTokenRepository.getConfirmationTokenByToken(token) as ConfirmationToken[];
    //     const confirmationToken: ConfirmationToken = queryResult[0];
    //     if(!confirmationToken) {
    //         return [{ message: "Confirmation token with given token does not exists"}, HTTP_STATUS.BAD_REQUEST];
    //     }
    //     if(confirmationToken.getConfirmedDate() !== null) {
    //         return [{ message: "Confirmation token is already confirmed"}, HTTP_STATUS.BAD_REQUEST];
    //     }
    //     const result = await this.confirmationTokenRepository.updateConfirmationToken(
    //         new Date().toISOString(),
    //         confirmationToken.getId()
    //     );
    //     return [{ message: "User account was confirmed successfully"}, HTTP_STATUS.OK];
    // }
}