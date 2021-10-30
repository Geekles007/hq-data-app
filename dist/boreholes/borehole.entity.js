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
exports.Borehole = void 0;
const user_entity_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const site_entity_1 = require("../sites/site.entity");
const luxon_1 = require("luxon");
let Borehole = class Borehole extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.reference = "";
        this.location = "";
        this.doneBy = "";
        this.pompe = "";
        this.observation = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "reference" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Borehole.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "location" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: "" }),
    __metadata("design:type", String)
], Borehole.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", default: "", name: "done_by" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: "" }),
    __metadata("design:type", String)
], Borehole.prototype, "doneBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", default: "", name: "pompe" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: "" }),
    __metadata("design:type", String)
], Borehole.prototype, "pompe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", default: "", name: "observation" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: "" }),
    __metadata("design:type", String)
], Borehole.prototype, "observation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: luxon_1.DateTime.now().toString(), type: "date" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Borehole.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0, name: "depth" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Borehole.prototype, "depth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0, name: "debit_cube" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Borehole.prototype, "debitCube", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0, name: "cost" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Borehole.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0, name: "depth_cube_h" }),
    (0, graphql_1.Field)({ nullable: true, defaultValue: 0 }),
    __metadata("design:type", Number)
], Borehole.prototype, "debitCubeH", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => {
        return user_entity_1.User;
    }, (user) => user.createdBoreholes, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Borehole.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedBoreholes, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Borehole.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.boreholes, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "siteId" }),
    (0, graphql_1.Field)(type => site_entity_1.Site, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], Borehole.prototype, "site", void 0);
Borehole = __decorate([
    (0, typeorm_1.Entity)("boreholes"),
    (0, graphql_1.ObjectType)()
], Borehole);
exports.Borehole = Borehole;
//# sourceMappingURL=borehole.entity.js.map