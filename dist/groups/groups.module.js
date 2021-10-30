"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsModule = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const groups_resolver_1 = require("./groups.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const sites_module_1 = require("../sites/sites.module");
const group_entity_1 = require("./group.entity");
let GroupsModule = class GroupsModule {
};
GroupsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([group_entity_1.Group]), users_module_1.UsersModule, sites_module_1.SitesModule],
        providers: [groups_service_1.GroupsService, groups_resolver_1.GroupsResolver]
    })
], GroupsModule);
exports.GroupsModule = GroupsModule;
//# sourceMappingURL=groups.module.js.map