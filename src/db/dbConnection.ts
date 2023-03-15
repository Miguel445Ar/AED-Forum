import { createConnection, Connection} from "mysql2/promise";


const connection = async () => { 
    return await createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        port: parseInt(process.env.MYSQL_DB_PORT, null),
        database: process.env.MYSQL_DB_DATABASE
    });
}

export default await connection()
.then( (connection: Connection) => connection)
.catch( reason => { throw reason; });