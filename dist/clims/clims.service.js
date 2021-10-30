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
exports.ClimsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
const clim_entity_1 = require("./clim.entity");
const brands_service_1 = require("../brands/brands.service");
const ateliers_service_1 = require("../ateliers/ateliers.service");
const places_service_1 = require("../places/places.service");
let ClimsService = class ClimsService {
    constructor(climsRepository, usersService, placesService, ateliersService, brandsService) {
        this.climsRepository = climsRepository;
        this.usersService = usersService;
        this.placesService = placesService;
        this.ateliersService = ateliersService;
        this.brandsService = brandsService;
    }
    async create(data, connected) {
        const place = (data === null || data === void 0 ? void 0 : data.placeId) ? await this.placesService.findOne(data === null || data === void 0 ? void 0 : data.placeId) : undefined;
        const atelier = (data === null || data === void 0 ? void 0 : data.atelierId) ? await this.ateliersService.findOne(data === null || data === void 0 ? void 0 : data.atelierId) : undefined;
        const brand = (data === null || data === void 0 ? void 0 : data.brandId) ? await this.brandsService.findOne(data === null || data === void 0 ? void 0 : data.brandId) : undefined;
        try {
            const newClim = await this.climsRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { place: place, atelier: atelier, brand: brand, createdBy: connected, updatedBy: connected }));
            return this.climsRepository.save(newClim);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.climsRepository.createQueryBuilder("clims")
            .where("clims.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.climsRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const clims = await this.climsRepository.find({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "place", "atelier", "brand"],
        });
        try {
            return clims;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        return await this.climsRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "place", "atelier", "brand"]
        });
    }
    async update(id, data, connected) {
        var _a;
        const place = (data === null || data === void 0 ? void 0 : data.placeId) ? await this.placesService.findOne(data === null || data === void 0 ? void 0 : data.placeId) : undefined;
        const atelier = (data === null || data === void 0 ? void 0 : data.atelierId) ? await this.ateliersService.findOne(data === null || data === void 0 ? void 0 : data.atelierId) : undefined;
        const brand = (data === null || data === void 0 ? void 0 : data.brandId) ? await this.brandsService.findOne(data === null || data === void 0 ? void 0 : data.brandId) : undefined;
        let clim = await this.climsRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy", "place", "atelier", "brand"]
        });
        if (clim) {
            clim.updatedBy = connected;
            clim.reference = data.reference && data.reference !== "" ? data.reference : clim === null || clim === void 0 ? void 0 : clim.reference;
            clim.state = data.etat ? data.etat : clim === null || clim === void 0 ? void 0 : clim.state;
            clim.power = data.power ? data.power : clim === null || clim === void 0 ? void 0 : clim.power;
            clim.reference = data.reference;
            clim.place = place;
            clim.atelier = atelier;
            clim.brand = brand;
            clim.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.climsRepository.save(clim);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.climsRepository.createQueryBuilder("clims")
            .where("clims.reference = :reference", { reference: data.reference }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This clim already exists!");
            }
        }
    }
};
ClimsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(clim_entity_1.Clim)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        places_service_1.PlacesService,
        ateliers_service_1.AteliersService,
        brands_service_1.BrandsService])
], ClimsService);
exports.ClimsService = ClimsService;
//# sourceMappingURL=clims.service.js.map