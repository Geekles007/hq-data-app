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
exports.BrandsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const token_decorator_1 = require("../decorators/token.decorator");
const brand_entity_1 = require("./brand.entity");
const brands_service_1 = require("./brands.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const create_brand_input_1 = require("./dto/create-brand.input");
let BrandsResolver = class BrandsResolver {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    findAllBrand(first, after) {
        return this.brandsService.findAll(first, after);
    }
    findBrandById(id) {
        return this.brandsService.findOne(id);
    }
    createOrEditBrand(createBrandInput, token) {
        return this.brandsService.createOrEdit(createBrandInput, token);
    }
    deleteBrands(brandIds) {
        return this.brandsService.delete(brandIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [brand_entity_1.Brand]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BrandsResolver.prototype, "findAllBrand", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => brand_entity_1.Brand),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandsResolver.prototype, "findBrandById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => brand_entity_1.Brand),
    __param(0, (0, graphql_1.Args)('createBrandInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_input_1.CreateBrandInput, String]),
    __metadata("design:returntype", Promise)
], BrandsResolver.prototype, "createOrEditBrand", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "brandIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BrandsResolver.prototype, "deleteBrands", null);
BrandsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsResolver);
exports.BrandsResolver = BrandsResolver;
//# sourceMappingURL=brands.resolver.js.map