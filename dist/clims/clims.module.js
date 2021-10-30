"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClimsModule = void 0;
const common_1 = require("@nestjs/common");
const clims_service_1 = require("./clims.service");
const clims_resolver_1 = require("./clims.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const clim_entity_1 = require("./clim.entity");
const places_module_1 = require("../places/places.module");
const ateliers_module_1 = require("../ateliers/ateliers.module");
const brands_module_1 = require("../brands/brands.module");
let ClimsModule = class ClimsModule {
};
ClimsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([clim_entity_1.Clim]), users_module_1.UsersModule, places_module_1.PlacesModule, ateliers_module_1.AteliersModule, brands_module_1.BrandsModule],
        providers: [clims_service_1.ClimsService, clims_resolver_1.ClimsResolver]
    })
], ClimsModule);
exports.ClimsModule = ClimsModule;
//# sourceMappingURL=clims.module.js.map