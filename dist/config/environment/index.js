"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
exports.port = port;
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
exports.env = env;
//# sourceMappingURL=index.js.map