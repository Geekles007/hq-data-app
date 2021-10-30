import { Module } from '@nestjs/common';
import { BoreholesService } from './boreholes.service';
import { BoreholesResolver } from './boreholes.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {SitesModule} from "../sites/sites.module";
import {Borehole} from "./borehole.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Borehole]), UsersModule, SitesModule],
  providers: [BoreholesService, BoreholesResolver]
})
export class BoreholesModule {}
