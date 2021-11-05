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
exports.GroupsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const groups_service_1 = require("../groups/groups.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const group_entity_1 = require("../groups/group.entity");
const create_group_input_1 = require("../groups/dto/create-group.input");
const token_decorator_1 = require("../decorators/token.decorator");
const PaginateGroupResult_1 = require("./dto/PaginateGroupResult");
let GroupsResolver = class GroupsResolver {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    findAllGroup(first, after) {
        return this.groupsService.findAll(first, after);
    }
    findGroupById(id) {
        return this.groupsService.findOne(id);
    }
    createOrEditGroup(createGroupInput, token) {
        return this.groupsService.createOrEdit(createGroupInput, token);
    }
    deleteGroups(groupIds) {
        return this.groupsService.delete(groupIds);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => PaginateGroupResult_1.PaginateGroupResult),
    __param(0, (0, graphql_1.Args)('first')),
    __param(1, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GroupsResolver.prototype, "findAllGroup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => group_entity_1.Group),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupsResolver.prototype, "findGroupById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => group_entity_1.Group),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, token_decorator_1.TokenReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_input_1.CreateGroupInput, String]),
    __metadata("design:returntype", Promise)
], GroupsResolver.prototype, "createOrEditGroup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "ids", type: () => [graphql_1.ID] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], GroupsResolver.prototype, "deleteGroups", null);
GroupsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsResolver);
exports.GroupsResolver = GroupsResolver;
//# sourceMappingURL=groups.resolver.js.map