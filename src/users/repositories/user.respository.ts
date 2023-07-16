import dbConnection from "../../shared/db/dbConnection";
import { User } from "../models/user.model";
import { BaseRepository } from "./base-repository.repository";


export abstract class UserRepository {
    private static tableName: string = "aed.users";

    static async saveUser(user: User): Promise<any> {
        const role: string = user.role as string;
        return await (await dbConnection).query(`INSERT INTO ${UserRepository.tableName} VALUES(${user.id},
            '${user.username}','${user.email}','${user.password}','${role}');`);
    }
    static async findUserByCredentials(email: string, password: string): Promise<any> {
        return await (await dbConnection).query(`SELECT * FROM ${UserRepository.tableName} where users.email = '${email}'`);
    }
    static async getAllUsers(): Promise<any> {
        return await (await dbConnection).query(`SELECT * FROM ${UserRepository.tableName}`);
    }
    static async deleteUserById(id: number): Promise<any> {
        return await (await dbConnection).query(`DELETE FROM ${UserRepository.tableName} where id = ${id};`);
    }
    static async getNewId(): Promise<any> {
        return await (await dbConnection).query(`SELECT MAX(id)+1 AS NEW_ID FROM ${UserRepository.tableName}`);
    }
    static async getUserByEmail(email: string): Promise<any> {
        return (await dbConnection).query(`SELECT * FROM ${UserRepository.tableName} WHERE email = '${email}';`)
    }
}