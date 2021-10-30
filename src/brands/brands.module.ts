import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {Brand} from "./brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), UsersModule],
  providers: [BrandsService, BrandsResolver],
  exports: [BrandsService]
})
export class BrandsModule {}
