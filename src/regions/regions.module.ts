import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsResolver } from './regions.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Region} from "./region.entity";
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Region]), UsersModule],
  providers: [RegionsService, RegionsResolver],
  exports: [RegionsService]
})
export class RegionsModule {}
