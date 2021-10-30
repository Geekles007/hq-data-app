import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {SitesModule} from "../sites/sites.module";
import {Group} from "./group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UsersModule, SitesModule],
  providers: [GroupsService, GroupsResolver]
})
export class GroupsModule {}
