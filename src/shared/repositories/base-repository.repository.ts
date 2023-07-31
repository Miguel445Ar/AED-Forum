import dbConnection from "../db/dbConnection";
import { IQueryable } from "../utils/queryable.interface";

export class BaseRepository<T extends IQueryable> {
    constructor(protected readonly tableName: string) {}
}