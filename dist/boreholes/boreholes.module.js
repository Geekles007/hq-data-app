"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoreholesModule = void 0;
const common_1 = require("@nestjs/common");
const boreholes_service_1 = require("./boreholes.service");
const boreholes_resolver_1 = require("./boreholes.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const sites_module_1 = require("../sites/sites.module");
const borehole_entity_1 = require("./borehole.entity");
let BoreholesModule = class BoreholesModule {
};
BoreholesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([borehole_entity_1.Borehole]), users_module_1.UsersModule, sites_module_1.SitesModule],
        providers: [boreholes_service_1.BoreholesService, boreholes_resolver_1.BoreholesResolver]
    })
], BoreholesModule);
exports.BoreholesModule = BoreholesModule;
//# sourceMappingURL=boreholes.module.js.map