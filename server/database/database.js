import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();

export const db = mysql.createConnection(process.env.SQL_HOST)

/* 
    export const db = mysql.createConnection({
        host: SQL_HOST,
        user: SQL_USER,
        password: SQL_PASSWORD,
        database: SQL_DATABASE,
    });
*/