import { Module } from '@nestjs/common';
import { ClimsService } from './clims.service';
import { ClimsResolver } from './clims.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {Clim} from "./clim.entity";
import {PlacesModule} from "../places/places.module";
import {AteliersModule} from "../ateliers/ateliers.module";
import {BrandsModule} from "../brands/brands.module";

@Module({
  imports: [TypeOrmModule.forFeature([Clim]), UsersModule, PlacesModule, AteliersModule, BrandsModule],
  providers: [ClimsService, ClimsResolver]
})
export class ClimsModule {}
