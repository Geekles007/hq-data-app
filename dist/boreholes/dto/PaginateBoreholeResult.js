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
exports.PaginateBoreholeResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const borehole_entity_1 = require("../borehole.entity");
let PaginateBoreholeResult = class PaginateBoreholeResult {
    constructor() {
        this.data = [];
        this.count = 0;
    }
};
__decorate([
    (0, graphql_1.Field)(type => [borehole_entity_1.Borehole], { nullable: false }),
    __metadata("design:type", Array)
], PaginateBoreholeResult.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], PaginateBoreholeResult.prototype, "count", void 0);
PaginateBoreholeResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginateBoreholeResult);
exports.PaginateBoreholeResult = PaginateBoreholeResult;
//# sourceMappingURL=PaginateBoreholeResult.js.map