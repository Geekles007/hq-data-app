"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesModule = void 0;
const common_1 = require("@nestjs/common");
const sites_service_1 = require("./sites.service");
const sites_resolver_1 = require("./sites.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const regions_module_1 = require("../regions/regions.module");
const site_entity_1 = require("./site.entity");
let SitesModule = class SitesModule {
};
SitesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([site_entity_1.Site]), users_module_1.UsersModule, regions_module_1.RegionsModule],
        providers: [sites_service_1.SitesService, sites_resolver_1.SitesResolver],
        exports: [sites_service_1.SitesService]
    })
], SitesModule);
exports.SitesModule = SitesModule;
//# sourceMappingURL=sites.module.js.map