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
exports.Atelier = void 0;
const user_entity_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const region_entity_1 = require("../regions/region.entity");
const clim_entity_1 = require("../clims/clim.entity");
let Atelier = class Atelier extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.name = "";
        this.reference = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "name" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Atelier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "reference" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Atelier.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdAteliers, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Atelier.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedAteliers, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Atelier.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (region) => region.ateliers, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "regionId" }),
    (0, graphql_1.Field)(type => region_entity_1.Region),
    __metadata("design:type", region_entity_1.Region)
], Atelier.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clim_entity_1.Clim, (clim) => clim.atelier),
    __metadata("design:type", Array)
], Atelier.prototype, "clims", void 0);
Atelier = __decorate([
    (0, typeorm_1.Entity)("ateliers"),
    (0, graphql_1.ObjectType)()
], Atelier);
exports.Atelier = Atelier;
//# sourceMappingURL=atelier.entity.js.map