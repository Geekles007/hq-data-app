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
exports.BaseEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const luxon_1 = require("luxon");
let BaseEntity = class BaseEntity {
    constructor() {
        this.id = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, graphql_1.Field)(Type => graphql_1.ID),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: luxon_1.DateTime.now().toUTC().toISO(), type: "timestamp" }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: luxon_1.DateTime.now().toUTC().toISO(), type: "timestamp" }),
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
BaseEntity = __decorate([
    (0, graphql_1.ObjectType)()
], BaseEntity);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map