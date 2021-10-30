import { Module } from '@nestjs/common';
import { AteliersService } from './ateliers.service';
import { AteliersResolver } from './ateliers.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {Atelier} from "./atelier.entity";
import {RegionsModule} from "../regions/regions.module";

@Module({
  imports: [TypeOrmModule.forFeature([Atelier]), UsersModule, RegionsModule],
  providers: [AteliersService, AteliersResolver],
  exports: [AteliersService]
})
export class AteliersModule {}
