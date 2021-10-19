"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const environment_1 = require("../config/environment");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: environment_1.env.host,
                port: parseInt((_a = environment_1.env === null || environment_1.env === void 0 ? void 0 : environment_1.env.port) !== null && _a !== void 0 ? _a : "5432"),
                username: environment_1.env.username,
                password: environment_1.env.password,
                database: environment_1.env.db_name,
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            users_module_1.UsersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map