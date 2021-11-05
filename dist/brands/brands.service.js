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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const brand_entity_1 = require("./brand.entity");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
let BrandsService = class BrandsService {
    constructor(brandsRepository, usersService) {
        this.brandsRepository = brandsRepository;
        this.usersService = usersService;
    }
    async create(data, connected) {
        try {
            const newBrand = await this.brandsRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { createdBy: connected, updatedBy: connected }));
            return this.brandsRepository.save(newBrand);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.brandsRepository.createQueryBuilder("brands")
            .where("brands.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.brandsRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const [result, total] = await this.brandsRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy"]
        });
        try {
            return {
                data: result,
                count: total
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        return await this.brandsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy"]
        });
    }
    async update(id, data, connected) {
        var _a;
        let brand = await this.brandsRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy"]
        });
        if (brand) {
            brand.updatedBy = connected;
            brand.name = data.name && (data === null || data === void 0 ? void 0 : data.name) !== "" ? data === null || data === void 0 ? void 0 : data.name : brand.name;
            brand.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.brandsRepository.save(brand);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.brandsRepository.createQueryBuilder("brands")
            .where("brands.name = :name", { name: data.name }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This brand already exists!");
            }
        }
    }
};
BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(brand_entity_1.Brand)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], BrandsService);
exports.BrandsService = BrandsService;
//# sourceMappingURL=brands.service.js.map