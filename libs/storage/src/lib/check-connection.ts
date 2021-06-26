import {getDbConnection} from "./get-db-connection";


export const checkConnection = async (): Promise<Boolean> => {
    const connection = await getDbConnection();
    const [rows] = await connection.execute("select now() as column1")
    return (rows[0].column1.toISOString().length === "2021-06-25T17:52:41.000Z".length)
}


