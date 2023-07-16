import { randomUUID } from "crypto";
import { IQueryable } from "../../shared/utils/queryable.interface";

export class ConfirmationToken implements IQueryable {
    private readonly token: string;
    private readonly expirationDate: Date;
    private readonly confirmedDate: Date;
    constructor(
        private readonly id: number,
        private readonly userId: string,
        private readonly createdAt: Date,
    ) {
        this.token = randomUUID();
        this.expirationDate = new Date(this.createdAt.getTime() + 15*60000);
        this.confirmedDate = null;
    }
    public toQuery(): string {
        return `VALUES (${this.id}, ${this.token}, ${this.createdAt.toISOString()}, ${this.expirationDate.toISOString()}, ${this.confirmedDate.toISOString()}, ${this.userId});`;
    }
}