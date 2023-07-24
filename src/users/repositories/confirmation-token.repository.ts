import { ConfirmationToken } from "../models/confirmation-token.model";
import { BaseRepository } from "../../shared/repositories/base-repository.repository";
import dbConnection from "../../shared/db/dbConnection";
import { FieldPacket, RowDataPacket } from "mysql2";

export class ConfirmationTokenRepository extends BaseRepository<ConfirmationToken> {
    constructor() {
        super("aed.confirmation_tokens");
    }
    public async updateConfirmationToken(confirmedDate: string, confirmationTokenId: number) {
        return (await dbConnection).query(`UPDATE ${this.tableName} SET confirmed_at = '${confirmedDate}' WHERE id = ${confirmationTokenId};`);
    }
    public async getConfirmationTokenByToken(token: string): Promise<RowDataPacket[]> {
        return (await dbConnection).query(`SELECT * FROM ${this.tableName} WHERE token = '${token}';`)
        .then((value: [RowDataPacket[], FieldPacket[]]) => value[0])
        .catch( reason => { throw new Error(reason as string); });
    }
}