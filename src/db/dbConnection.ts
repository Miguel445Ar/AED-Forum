import mysql, { MysqlError } from "mysql";
import { DbConfig } from "../utils/db-config.interface";


export default (function dbConf(): DbConfig {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        port: parseInt(process.env.MYSQL_DB_PORT, null),
        database: process.env.MYSQL_DB_DATABASE
    });

   function query(sql: string, args?: any): Promise<any | MysqlError> {
        return new Promise((resolve, reject) => {
            connection.query(sql,args,(err: MysqlError, result: any) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    function close(): Promise<string | MysqlError> {
        return new Promise((resolve, reject) => {
            connection.end( (err: MysqlError) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve("Connection was successfully closed");
            });
        });
    }
    return { query, close } as DbConfig;
})();