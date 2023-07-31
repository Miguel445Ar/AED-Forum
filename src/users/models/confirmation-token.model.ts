import { randomUUID } from "crypto";

export class ConfirmationToken {
    private readonly id: number;
    private readonly userId: string;
    private readonly createdAt: Date;
    private readonly token: string;
    private readonly expirationDate: Date;
    private confirmedDate: Date;
    constructor(
        id: number,
        userId: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;

        this.token = randomUUID();
        this.expirationDate = new Date(this.createdAt.getTime() + 15*60000);
        this.confirmedDate = null;
    }
    public toQuery(): string {
        return `VALUES (${this.id}, ${this.token}, ${this.createdAt.toISOString()}, ${this.expirationDate.toISOString()}, ${this.confirmedDate.toISOString()}, ${this.userId});`;
    }
    public getId(): number {
        return this.id;
    }
    public getToken(): string {
        return this.token;
    }
    public getConfirmedDate(): (Date | null) {
        return this.confirmedDate
    }
}