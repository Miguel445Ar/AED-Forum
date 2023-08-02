import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";


@Entity({ name: "confirmation_tokens"})
export class ConfirmationToken {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(type => User, { cascade: ["update"] })
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ name: "created_at", nullable: false })
    createdAt: Date;

    @Column({ length: 100 })
    token: string;

    @CreateDateColumn({ name: "expiration_date", nullable: false })
    expirationDate: Date;

    @UpdateDateColumn({ name: "confirmed_date", nullable: true })
    confirmedDate?: Date;
}