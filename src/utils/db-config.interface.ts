import { MysqlError } from "mysql";

export interface DbConfig {
    query: (sql: string, args?: any) => Promise<any | MysqlError>;
    close: () => Promise<string | MysqlError>;
}