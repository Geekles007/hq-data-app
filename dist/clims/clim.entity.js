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
exports.Clim = exports.Etat = void 0;
const user_entity_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
const place_entity_1 = require("../places/place.entity");
const brand_entity_1 = require("../brands/brand.entity");
const atelier_entity_1 = require("../ateliers/atelier.entity");
var Etat;
(function (Etat) {
    Etat["o"] = "o";
    Etat["n"] = "n";
})(Etat = exports.Etat || (exports.Etat = {}));
(0, graphql_1.registerEnumType)(Etat, {
    name: "Etat"
});
let Clim = class Clim extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.reference = "";
        this.state = Etat.o;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "reference" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Clim.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Etat, name: "state" }),
    (0, graphql_1.Field)(type => Etat, { nullable: false }),
    __metadata("design:type", String)
], Clim.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", name: "power" }),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], Clim.prototype, "power", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdClims, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Clim.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.updatedClims, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "updated_by" }),
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Clim.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_entity_1.Place, (place) => place.clims, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "placeId" }),
    (0, graphql_1.Field)(type => place_entity_1.Place, { nullable: true }),
    __metadata("design:type", place_entity_1.Place)
], Clim.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelier_entity_1.Atelier, (atelier) => atelier.clims, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "atelierId" }),
    (0, graphql_1.Field)(type => atelier_entity_1.Atelier, { nullable: true }),
    __metadata("design:type", atelier_entity_1.Atelier)
], Clim.prototype, "atelier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, (brand) => brand.clims, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "brandId" }),
    (0, graphql_1.Field)(type => brand_entity_1.Brand, { nullable: true }),
    __metadata("design:type", brand_entity_1.Brand)
], Clim.prototype, "brand", void 0);
Clim = __decorate([
    (0, typeorm_1.Entity)("clims"),
    (0, graphql_1.ObjectType)()
], Clim);
exports.Clim = Clim;
//# sourceMappingURL=clim.entity.js.map