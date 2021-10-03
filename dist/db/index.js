"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_mysql_1 = __importDefault(require("serverless-mysql"));
const environment_1 = require("../config/environment");
dotenv_1.default.config();
exports.client = (0, serverless_mysql_1.default)({
    config: {
        host: environment_1.env.host,
        database: environment_1.env.db_name,
        user: environment_1.env.username,
        password: environment_1.env.password,
    }
});
//# sourceMappingURL=index.js.map