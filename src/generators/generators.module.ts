import { Module } from '@nestjs/common';
import { GeneratorsService } from './generators.service';
import { GeneratorsResolver } from './generators.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {BrandsModule} from "../brands/brands.module";
import {SitesModule} from "../sites/sites.module";
import {Generator} from "./generator.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Generator]), UsersModule, BrandsModule, SitesModule],
  providers: [GeneratorsService, GeneratorsResolver]
})
export class GeneratorsModule {}
