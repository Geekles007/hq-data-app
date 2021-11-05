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
exports.BoreholesService = void 0;
const common_1 = require("@nestjs/common");
const borehole_entity_1 = require("./borehole.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const sites_service_1 = require("../sites/sites.service");
let BoreholesService = class BoreholesService {
    constructor(boreholesRepository, usersService, sitesService) {
        this.boreholesRepository = boreholesRepository;
        this.usersService = usersService;
        this.sitesService = sitesService;
    }
    async create(data, connected) {
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        try {
            const newBorehole = await this.boreholesRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { site: site, createdBy: connected, updatedBy: connected }));
            return this.boreholesRepository.save(newBorehole);
        }
        catch (error) {
            throw new Error("Something went wrong -> " + error.message);
        }
    }
    async delete(ids) {
        var _a;
        const dataToRemove = (_a = await this.boreholesRepository.createQueryBuilder("boreholes")
            .where("boreholes.id IN (:...ids)", {
            ids: ids
        }).getMany()) !== null && _a !== void 0 ? _a : [];
        try {
            if (dataToRemove.length > 0) {
                const deleted = await this.boreholesRepository.remove(dataToRemove);
                return true;
            }
        }
        catch (e) {
            throw new Error("We can't delete those users.");
        }
        return null;
    }
    async findAll(first, after) {
        const [result, total] = await this.boreholesRepository.findAndCount({
            take: first,
            skip: after,
            relations: ["createdBy", "updatedBy", "site"],
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
        return await this.boreholesRepository.findOneOrFail(id, {
            relations: ["createdBy", "updatedBy", "site"]
        });
    }
    async update(id, data, connected) {
        var _a;
        const site = (data === null || data === void 0 ? void 0 : data.siteId) ? await this.sitesService.findOne(data === null || data === void 0 ? void 0 : data.siteId) : undefined;
        let borehole = await this.boreholesRepository.findOneOrFail({
            where: { id: (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "" },
            relations: ["createdBy", "site"]
        });
        if (borehole) {
            borehole.updatedBy = connected;
            borehole.reference = data.reference && data.reference !== "" ? data.reference : borehole === null || borehole === void 0 ? void 0 : borehole.reference;
            borehole.location = data.location && data.location !== "" ? data.location : borehole === null || borehole === void 0 ? void 0 : borehole.location;
            borehole.depth = data.depth ? data.depth : borehole === null || borehole === void 0 ? void 0 : borehole.depth;
            borehole.debitCubeH = data.debitCubeH ? data.debitCubeH : borehole === null || borehole === void 0 ? void 0 : borehole.debitCubeH;
            borehole.cost = data.cost ? data.cost : borehole === null || borehole === void 0 ? void 0 : borehole.cost;
            borehole.doneBy = data.doneBy && data.doneBy !== "" ? data.doneBy : borehole === null || borehole === void 0 ? void 0 : borehole.doneBy;
            borehole.date = data.date && data.date !== "" ? data.date : borehole === null || borehole === void 0 ? void 0 : borehole.date;
            borehole.pompe = data.pompe && data.pompe !== "" ? data.pompe : borehole === null || borehole === void 0 ? void 0 : borehole.pompe;
            borehole.debitCube = data.debitCube ? data.debitCube : borehole === null || borehole === void 0 ? void 0 : borehole.debitCube;
            borehole.observation = data.observation && data.observation !== "" ? data.observation : borehole === null || borehole === void 0 ? void 0 : borehole.observation;
            borehole.reference = data.reference;
            borehole.site = site;
            borehole.updatedAt = new Date(luxon_1.DateTime.now().toUTC().toISO());
            return await this.boreholesRepository.save(borehole);
        }
        else {
            throw new Error("Something went wrong.");
        }
    }
    async createOrEdit(data, token) {
        const connected = await this.usersService.getConnectedId(token);
        const exists = await this.boreholesRepository.createQueryBuilder("boreholes")
            .where("boreholes.reference = :reference", { reference: data.reference }).getOne();
        if (data === null || data === void 0 ? void 0 : data.id) {
            return this.update(data === null || data === void 0 ? void 0 : data.id, data, connected);
        }
        else {
            if (!exists) {
                return this.create(data, connected);
            }
            else {
                throw new Error("This borehole already exists!");
            }
        }
    }
};
BoreholesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borehole_entity_1.Borehole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        sites_service_1.SitesService])
], BoreholesService);
exports.BoreholesService = BoreholesService;
//# sourceMappingURL=boreholes.service.js.map