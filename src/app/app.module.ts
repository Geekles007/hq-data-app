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
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(),  'src/schema.gql'),
            sortSchema: true,
            context: ({req}) => ({ headers: req.headers })
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.host,
            port: parseInt(env?.port ?? "5432"),
            username: env.username,
            password: env.password,
            database: env.db_name,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}