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
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const base_entity_1 = require("../entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const site_entity_1 = require("../sites/site.entity");
let Group = class Group extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.name = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "name" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdGroups, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Group.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedGroups, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Group.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.groups, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "siteId" }),
    (0, graphql_1.Field)(type => site_entity_1.Site, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], Group.prototype, "site", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)("groups"),
    (0, graphql_1.ObjectType)()
], Group);
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map