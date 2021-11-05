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
exports.PaginateUserResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../user.entity");
let PaginateUserResult = class PaginateUserResult {
    constructor() {
        this.data = [];
        this.count = 0;
    }
};
__decorate([
    (0, graphql_1.Field)(type => [user_entity_1.User], { nullable: false }),
    __metadata("design:type", Array)
], PaginateUserResult.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], PaginateUserResult.prototype, "count", void 0);
PaginateUserResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginateUserResult);
exports.PaginateUserResult = PaginateUserResult;
//# sourceMappingURL=PaginateSiteResult.js.map