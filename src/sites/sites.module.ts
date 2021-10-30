import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesResolver } from './sites.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {RegionsModule} from "../regions/regions.module";
import {Site} from "./site.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Site]), UsersModule, RegionsModule],
  providers: [SitesService, SitesResolver],
  exports: [SitesService]
})
export class SitesModule {}
