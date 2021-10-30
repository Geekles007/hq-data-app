import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from "path";
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {env} from "../config/environment";
import {AuthModule} from "../auth/auth.module";
import { RegionsModule } from 'src/regions/regions.module';
import {AteliersModule} from "../ateliers/ateliers.module";
import {BrandsModule} from "../brands/brands.module";
import {SitesModule} from "../sites/sites.module";
import { PlacesModule } from 'src/places/places.module';
import {ClimsModule} from "../clims/clims.module";
import {GeneratorsModule} from "../generators/generators.module";
import {GroupsModule} from "../groups/groups.module";
import {BoreholesModule} from "../boreholes/boreholes.module";

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
        RegionsModule,
        AuthModule,
        AteliersModule,
        BrandsModule,
        SitesModule,
        PlacesModule,
        ClimsModule,
        GeneratorsModule,
        GroupsModule,
        BoreholesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}