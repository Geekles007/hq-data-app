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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const region_entity_1 = require("./region.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const users_service_1 = require("../users/users.service");
let RegionsService = class RegionsService {
    constructor(regionsRepository, usersService) {
        this.regionsRepository = regionsRepository;
        this.usersService = usersService;
    }
    async create(data, connected) {
        try {
            const newRegion = await this.regionsRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { createdBy: connected, updatedBy: connected }));
            return this.regionsRepository.save(newRegion);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.regionsRepository.createQueryBuilder("regions")
            .where("regions.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.regionsRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const regions = await this.regionsRepository.find({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy"]
        });
        try {
            return regions;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        return await this.regionsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy"]
        });
    }
    async update(id, data, connected) {
        var _a;
        let region = await this.regionsRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy"]
        });
        if (region) {
            region.updatedBy = connected;
            region.name = data.name && (data === null || data === void 0 ? void 0 : data.name) !== "" ? data === null || data === void 0 ? void 0 : data.name : region === null || region === void 0 ? void 0 : region.name;
            region.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.regionsRepository.save(region);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.regionsRepository.createQueryBuilder("regions")
            .where("regions.name = :name", { name: data.name }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This region already exists!");
            }
        }
    }
};
RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RegionsService);
exports.RegionsService = RegionsService;
//# sourceMappingURL=regions.service.js.map