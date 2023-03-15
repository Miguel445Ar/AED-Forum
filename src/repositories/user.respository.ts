import dbConnection from "../db/dbConnection";
import { User } from "../models/user.model";

export abstract class UserRepository {
    private static tableName: string = "users";

    static async saveUser(user: User): Promise<any> {
        const role: string = user.role as string;
        return await dbConnection.query(`INSERT INTO ${UserRepository.tableName} VALUES(${user.id},
            ${user.username}),${user.email},${user.password},${role});`);
    }
    static async findUserByCredentials(email: string, password: string): Promise<any> {
        return await dbConnection.query(`SELECT * FROM ${UserRepository.tableName} where users.email = ${email}
         and users.password = ${password}`);
    }
    static async getAllUsers(): Promise<any> {
        return await dbConnection.query(`SELECT * FROM ${UserRepository.tableName}`);
    }
    static async deleteUserById(id: number): Promise<any> {
        return await dbConnection.query(`DELETE FROM ${UserRepository.tableName} where id = ${id};`);
    }
    static async getNewId(): Promise<any> {
        return await dbConnection.query(`SELECT MAX(id)+1 FROM ${UserRepository.tableName}`);
    }
}