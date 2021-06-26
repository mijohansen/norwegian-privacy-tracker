import {HttpFunction} from "@google-cloud/functions-framework";
import {checkConnection} from "@privacy-tracker/storage";


/**
 * Fetches and stores
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
export const scheduler: HttpFunction = async (req, res) => {
  const rows = await checkConnection()
  res.send({
    "hello": "world",
    rows
  })
};

