import dbConnection from "../../shared/db/dbConnection";
import { IQueryable } from "../../shared/utils/queryable.interface";

export class BaseRepository<T extends IQueryable> {
    constructor(private readonly tableName: string) {}
    async save(model: T): Promise<any> {
        return await (await dbConnection).query(`INSERT INTO ${this.tableName} ${model.toQuery()}`);
    }
    async getAll(): Promise<any> {
        return await (await dbConnection).query(`SELECT * FROM ${this.tableName}`);
    }
    async saveAll(models: T[]) {
        let queries: string = "";
        models.forEach((model: IQueryable) => { queries = queries.concat(`INSERT INTO ${this.tableName} ${model.toQuery()};`); });
        return await (await dbConnection).execute(queries);
    }
    async getNewId(): Promise<any> {
        return await (await dbConnection).query(`SELECT MAX(id)+1 AS NEW_ID FROM ${this.tableName}`);
    }
    async complete(): Promise<void> {
        return (await dbConnection).commit();
    }
}