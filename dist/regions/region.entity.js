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
exports.Region = void 0;
const user_entity_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const atelier_entity_1 = require("../ateliers/atelier.entity");
const site_entity_1 = require("../sites/site.entity");
let Region = class Region extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.name = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "name" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Region.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdRegions, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Region.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedRegions, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Region.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => atelier_entity_1.Atelier, (atelier) => atelier.region),
    __metadata("design:type", Array)
], Region.prototype, "ateliers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => site_entity_1.Site, (site) => site.region),
    __metadata("design:type", Array)
], Region.prototype, "sites", void 0);
Region = __decorate([
    (0, typeorm_1.Entity)("regions"),
    (0, graphql_1.ObjectType)()
], Region);
exports.Region = Region;
//# sourceMappingURL=region.entity.js.map