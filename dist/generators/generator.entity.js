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
exports.Generator = exports.State = void 0;
const user_entity_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const brand_entity_1 = require("../brands/brand.entity");
const site_entity_1 = require("../sites/site.entity");
var State;
(function (State) {
    State["f"] = "F";
    State["p"] = "P";
})(State = exports.State || (exports.State = {}));
(0, graphql_1.registerEnumType)(State, {
    name: "State"
});
let Generator = class Generator extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.reference = "";
        this.numSeries = "";
        this.state = State.f;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "reference" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Generator.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "num_series" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Generator.prototype, "numSeries", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "observation" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Generator.prototype, "observation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: State, name: "state" }),
    (0, graphql_1.Field)(type => State, { nullable: true }),
    __metadata("design:type", String)
], Generator.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", name: "power" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Generator.prototype, "power", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdGenerators, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Generator.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedGenerators, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Generator.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.generators, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "siteId" }),
    (0, graphql_1.Field)(type => site_entity_1.Site, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], Generator.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, (brand) => brand.generators, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "brandId" }),
    (0, graphql_1.Field)(type => brand_entity_1.Brand, { nullable: true }),
    __metadata("design:type", brand_entity_1.Brand)
], Generator.prototype, "brand", void 0);
Generator = __decorate([
    (0, typeorm_1.Entity)("generators"),
    (0, graphql_1.ObjectType)()
], Generator);
exports.Generator = Generator;
//# sourceMappingURL=generator.entity.js.map