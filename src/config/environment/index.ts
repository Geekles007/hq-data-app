import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
    development: process.env.NODE_ENV === 'development',
    test: process.env.NODE_ENV === 'test',
    staging: process.env.NODE_ENV === 'staging',
    production: process.env.NODE_ENV === 'production',
    host: process.env.MYSQL_HOST,
    db_name: process.env.DB_NAME,
    username: process.env.USERNAME,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    email: process.env.EMAIL,
    passwordGmail: process.env.PASSWORD_GMAIL
};

export { port, env };