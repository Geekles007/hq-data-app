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
exports.Site = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const base_entity_1 = require("../entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const region_entity_1 = require("../regions/region.entity");
const place_entity_1 = require("../places/place.entity");
const generator_entity_1 = require("../generators/generator.entity");
const group_entity_1 = require("../groups/group.entity");
const borehole_entity_1 = require("../boreholes/borehole.entity");
let Site = class Site extends base_entity_1.BaseEntity {
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
], Site.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "reference" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Site.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdSites, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Site.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedSites, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Site.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (region) => region.sites, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "regionId" }),
    (0, graphql_1.Field)(type => region_entity_1.Region),
    __metadata("design:type", region_entity_1.Region)
], Site.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => place_entity_1.Place, (place) => place.site),
    __metadata("design:type", Array)
], Site.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => generator_entity_1.Generator, (generator) => generator.site),
    __metadata("design:type", Array)
], Site.prototype, "generators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_entity_1.Group, (group) => group.site),
    __metadata("design:type", Array)
], Site.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borehole_entity_1.Borehole, (borehole) => borehole.site),
    __metadata("design:type", Array)
], Site.prototype, "boreholes", void 0);
Site = __decorate([
    (0, typeorm_1.Entity)("sites"),
    (0, graphql_1.ObjectType)()
], Site);
exports.Site = Site;
//# sourceMappingURL=site.entity.js.map