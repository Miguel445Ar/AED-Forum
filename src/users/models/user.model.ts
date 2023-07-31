import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
import { USER_ROLE } from "../utils/user-role";
@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column({
        length: 150
    })
    username: string;
    @Column({
        length: 255
    })
    email: string;
    @Column({
        length: 255
    })
    password: string;
    @Column({
        type: "enum",
        enum: USER_ROLE,
        default: USER_ROLE.ADMIN,
        nullable: false,
        update: false
    })
    role: USER_ROLE;
    @Column({
        nullable: false,
        type: "bool",
        name: "enabled",
        update: true
    })
    enabled: boolean
}