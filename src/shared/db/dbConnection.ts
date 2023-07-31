import { createConnection, Connection} from "mysql2/promise";
import { DataSource } from "typeorm";
import { User } from "../../users/models/user.model";


const getDataSource = async (): Promise<DataSource> => {
    const datasource = new DataSource({
        type: "mysql",
        host: process.env.MYSQL_DB_HOST,
        port: parseInt(process.env.MYSQL_DB_PORT, null),
        username: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_DATABASE,
        entities: [User],
        synchronize: true,
        logging: true
    });
    try {
        const appDatasource: DataSource = await datasource.initialize();
        return appDatasource;
    }catch(error) {
        console.error(error);
        throw new Error(error as string);
    }
}


// const connection = async (): Promise<Connection> => {
//     return await createConnection({
//         host: process.env.MYSQL_DB_HOST,
//         user: process.env.MYSQL_DB_USER,
//         password: process.env.MYSQL_DB_PASSWORD,
//         port: parseInt(process.env.MYSQL_DB_PORT, null),
//         database: process.env.MYSQL_DB_DATABASE
//     })
//     .then( (connection: Connection) => connection)
//     .catch( reason => { throw reason; });
// }

export default getDataSource;