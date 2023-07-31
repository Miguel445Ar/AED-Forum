import { createConnection, Connection} from "mysql2/promise";
import { DataSource } from "typeorm";
import { User } from "../../users/models/user.model";

export const datasource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT, null),
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
    dropSchema: false
});

const getDataSource = async (): Promise<DataSource> => {
    try {
        const appDatasource: DataSource = await datasource.initialize();
        return appDatasource;
    }catch(error) {
        console.error(error);
        throw new Error(error as string);
    }
}

export default getDataSource;