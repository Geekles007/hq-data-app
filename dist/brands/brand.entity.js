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
exports.Brand = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const base_entity_1 = require("../entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const clim_entity_1 = require("../clims/clim.entity");
const generator_entity_1 = require("../generators/generator.entity");
let Brand = class Brand extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.name = "";
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "name" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdBrands, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Brand.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedBrands, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Brand.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clim_entity_1.Clim, (clim) => clim.brand),
    __metadata("design:type", Array)
], Brand.prototype, "clims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => generator_entity_1.Generator, (generator) => generator.brand),
    __metadata("design:type", Array)
], Brand.prototype, "generators", void 0);
Brand = __decorate([
    (0, typeorm_1.Entity)("brands"),
    (0, graphql_1.ObjectType)()
], Brand);
exports.Brand = Brand;
//# sourceMappingURL=brand.entity.js.map