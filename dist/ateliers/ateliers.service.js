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
exports.AteliersService = void 0;
const common_1 = require("@nestjs/common");
const atelier_entity_1 = require("../ateliers/atelier.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const regions_service_1 = require("../regions/regions.service");
let AteliersService = class AteliersService {
    constructor(ateliersRepository, usersService, regionsService) {
        this.ateliersRepository = ateliersRepository;
        this.usersService = usersService;
        this.regionsService = regionsService;
    }
    async create(data, connected) {
        const region = (data === null || data === void 0 ? void 0 : data.regionId) ? await this.regionsService.findOne(data === null || data === void 0 ? void 0 : data.regionId) : undefined;
        try {
            const newAtelier = await this.ateliersRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { region: region, createdBy: connected, updatedBy: connected }));
            return this.ateliersRepository.save(newAtelier);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.ateliersRepository.createQueryBuilder("ateliers")
            .where("ateliers.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.ateliersRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const ateliers = await this.ateliersRepository.find({
            take: first,
            skip: after,
            relations: ["region", "createdBy", "updatedBy"],
        });
        try {
            return ateliers;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        return await this.ateliersRepository.findOneOrFail(id, {
            relations: ["region", "createdBy", "updatedBy"]
        });
    }
    async update(id, data, connected) {
        var _a;
        const region = (data === null || data === void 0 ? void 0 : data.regionId) ? await this.regionsService.findOne(data === null || data === void 0 ? void 0 : data.regionId) : undefined;
        let atelier = await this.ateliersRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["region", "createdBy"]
        });
        if (atelier) {
            atelier.updatedBy = connected;
            atelier.name = data.name;
            atelier.region = region;
            atelier.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.ateliersRepository.save(atelier);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.ateliersRepository.createQueryBuilder("ateliers")
            .where("ateliers.reference = :reference", { reference: data.reference }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This atelier already exists!");
            }
        }
    }
};
AteliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atelier_entity_1.Atelier)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        regions_service_1.RegionsService])
], AteliersService);
exports.AteliersService = AteliersService;
//# sourceMappingURL=ateliers.service.js.map