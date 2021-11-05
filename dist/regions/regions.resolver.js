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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const regions_service_1 = require("./regions.service");
const create_region_input_1 = require("./dto/create-region.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const region_entity_1 = require("./region.entity");
const token_decorator_1 = require("../decorators/token.decorator");
const PaginateResult_1 = require("./dto/PaginateResult");
let RegionsResolver = class RegionsResolver {
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    findAllRegion(first, after) {
        return this.regionsService.findAll(first, after);
    }
    findRegionById(id) {
        return this.regionsService.findOne(id);
    }
    createOrEditRegion(createRegionInput, token) {
        return this.regionsService.createOrEdit(createRegionInput, token);
    }
    deleteRegions(regionIds) {
        return this.regionsService.delete(regionIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => PaginateResult_1.PaginateResult),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RegionsResolver.prototype, "findAllRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => region_entity_1.Region),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsResolver.prototype, "findRegionById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => region_entity_1.Region),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_input_1.CreateRegionInput, String]),
    __metadata("design:returntype", Promise)
], RegionsResolver.prototype, "createOrEditRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "ids", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RegionsResolver.prototype, "deleteRegions", null);
RegionsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsResolver);
exports.RegionsResolver = RegionsResolver;
//# sourceMappingURL=regions.resolver.js.map