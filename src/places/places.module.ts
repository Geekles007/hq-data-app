import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {Place} from "./place.entity";
import {SitesModule} from "../sites/sites.module";

@Module({
  imports: [TypeOrmModule.forFeature([Place]), UsersModule, SitesModule],
  providers: [PlacesService, PlacesResolver],
  exports: [PlacesService]
})
export class PlacesModule {}
