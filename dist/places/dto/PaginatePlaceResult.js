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
exports.PaginatePlaceResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const place_entity_1 = require("../place.entity");
let PaginatePlaceResult = class PaginatePlaceResult {
    constructor() {
        this.data = [];
        this.count = 0;
    }
};
__decorate([
    (0, graphql_1.Field)(type => [place_entity_1.Place], { nullable: false }),
    __metadata("design:type", Array)
], PaginatePlaceResult.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], PaginatePlaceResult.prototype, "count", void 0);
PaginatePlaceResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatePlaceResult);
exports.PaginatePlaceResult = PaginatePlaceResult;
//# sourceMappingURL=PaginatePlaceResult.js.map