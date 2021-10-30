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
exports.GeneratorsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const token_decorator_1 = require("../decorators/token.decorator");
const create_generator_input_1 = require("./dto/create-generator.input");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const generators_service_1 = require("./generators.service");
const generator_entity_1 = require("./generator.entity");
let GeneratorsResolver = class GeneratorsResolver {
    constructor(generatorsService) {
        this.generatorsService = generatorsService;
    }
    findAllGenerator(first, after) {
        return this.generatorsService.findAll(first, after);
    }
    findGeneratorById(id) {
        return this.generatorsService.findOne(id);
    }
    createOrEditGenerator(createGeneratorInput, token) {
        return this.generatorsService.createOrEdit(createGeneratorInput, token);
    }
    deleteGenerators(generatorIds) {
        return this.generatorsService.delete(generatorIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [generator_entity_1.Generator]),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GeneratorsResolver.prototype, "findAllGenerator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => generator_entity_1.Generator),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneratorsResolver.prototype, "findGeneratorById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => generator_entity_1.Generator),
    __param(0, (0, graphql_1.Args)('createGeneratorInput')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_generator_input_1.CreateGeneratorInput, String]),
    __metadata("design:returntype", Promise)
], GeneratorsResolver.prototype, "createOrEditGenerator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "generatorIds", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], GeneratorsResolver.prototype, "deleteGenerators", null);
GeneratorsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [generators_service_1.GeneratorsService])
], GeneratorsResolver);
exports.GeneratorsResolver = GeneratorsResolver;
//# sourceMappingURL=generators.resolver.js.map