import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from "path";
import {UsersModule} from "../users/users.module";
import {CommonModule} from "../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import dotenv from 'dotenv';
import {env} from "../config/environment";

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(),  'src/schema.gql'),
            sortSchema: true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: env.host,
            port: 3306,
            username: env.username,
            password: env.password,
            database: env.db_name,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}