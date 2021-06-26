import {Connection} from "mysql2/promise";
import * as mysql from "mysql2/promise";

let connection: Connection;
export const getDbConnection = async () => {
    if (!connection) {
        console.log("creating a new db connection")
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            socketPath: process.env.MYSQL_SOCKET_PATH
        });
    }
    return connection
}
