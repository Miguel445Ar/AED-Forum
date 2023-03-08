import dbConnection from "../db/dbConnection";
import { User } from "../models/user.model";

export class UserRepository {
    static async saveUser(user: User): Promise<any> {
        const role: string = user.role as string;
        return await dbConnection.query(`INSERT INTO users VALUES(${user.id},
            ${user.username}),${user.email},${user.password},${role});`);
    }
    static async findUserByCredentials(email: string, password: string): Promise<any> {
        return await dbConnection.query(`SELECT * FROM users where users.email = ${email}
         and users.password = ${password}`);
    }
    static async getAllUsers(): Promise<any> {
        return await dbConnection.query(`SELECT * FROM users`);
    }
    static async deleteUserById(id: number): Promise<any> {
        return await dbConnection.query(`DELETE FROM users where id = ${id};`);
    }
}