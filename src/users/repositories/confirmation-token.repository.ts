import { ConfirmationToken } from "../models/confirmation-token.model";
import { datasource } from "../../shared/db/dbConnection";
import { EntityManager, Repository } from "typeorm";

export class ConfirmationTokenRepository extends Repository<ConfirmationToken> {
    constructor() {
       super(ConfirmationToken, new EntityManager(datasource));
    }
    public async getById(id: number): Promise<ConfirmationToken> {
        return await this.findOneBy({ id });
    }
    public async getByToken(token: string): Promise<ConfirmationToken> {
        return await this.findOneBy({ token });
    }
}