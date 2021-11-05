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
exports.PaginateAtelierResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const atelier_entity_1 = require("../atelier.entity");
let PaginateAtelierResult = class PaginateAtelierResult {
    constructor() {
        this.data = [];
        this.count = 0;
    }
};
__decorate([
    (0, graphql_1.Field)(type => [atelier_entity_1.Atelier], { nullable: false }),
    __metadata("design:type", Array)
], PaginateAtelierResult.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], PaginateAtelierResult.prototype, "count", void 0);
PaginateAtelierResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginateAtelierResult);
exports.PaginateAtelierResult = PaginateAtelierResult;
//# sourceMappingURL=PaginateResult.js.map