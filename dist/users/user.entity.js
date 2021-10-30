"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const region_entity_1 = require("../regions/region.entity");
const atelier_entity_1 = require("../ateliers/atelier.entity");
const brand_entity_1 = require("../brands/brand.entity");
const site_entity_1 = require("../sites/site.entity");
const place_entity_1 = require("../places/place.entity");
const clim_entity_1 = require("../clims/clim.entity");
const generator_entity_1 = require("../generators/generator.entity");
let User = class User extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.token = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "firstname" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "lastname" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => region_entity_1.Region, (region) => region.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdRegions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => region_entity_1.Region, (region) => region.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedRegions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => atelier_entity_1.Atelier, (atelier) => atelier.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdAteliers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => atelier_entity_1.Atelier, (atelier) => atelier.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedAteliers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => brand_entity_1.Brand, (brand) => brand.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdBrands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => brand_entity_1.Brand, (brand) => brand.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedBrands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => site_entity_1.Site, (site) => site.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdSites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => site_entity_1.Site, (site) => site.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedSites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => place_entity_1.Place, (place) => place.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdPlaces", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => place_entity_1.Place, (place) => place.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedPlaces", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clim_entity_1.Clim, (clim) => clim.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdClims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clim_entity_1.Clim, (clim) => clim.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedClims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => generator_entity_1.Generator, (generator) => generator.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdGenerators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => generator_entity_1.Generator, (generator) => generator.createdBy),
    __metadata("design:type", Array)
], User.prototype, "updatedGenerators", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users"),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map