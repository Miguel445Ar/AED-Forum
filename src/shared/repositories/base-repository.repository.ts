import dbConnection from "../db/dbConnection";
import { IQueryable } from "../utils/queryable.interface";

export class BaseRepository<T extends IQueryable> {
    constructor(protected readonly tableName: string) {}
    public async save(model: T): Promise<any> {
        return await (await dbConnection).query(`INSERT INTO ${this.tableName} ${model.toQuery()}`);
    }
    public async getAll(): Promise<any> {
        return await (await dbConnection).query(`SELECT * FROM ${this.tableName}`);
    }
    public async saveAll(models: T[]) {
        let queries: string = "";
        models.forEach((model: IQueryable) => { queries = queries.concat(`INSERT INTO ${this.tableName} ${model.toQuery()};`); });
        return await (await dbConnection).execute(queries);
    }
    public async getNewId(): Promise<any> {
        return await (await dbConnection).query(`SELECT MAX(id)+1 AS NEW_ID FROM ${this.tableName}`);
    }
    public async complete(): Promise<void> {
        return (await dbConnection).commit();
    }

}