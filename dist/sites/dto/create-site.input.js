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
exports.CreateSiteInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateSiteInput = class CreateSiteInput {
    constructor() {
        this.name = "";
        this.reference = "";
    }
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSiteInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSiteInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSiteInput.prototype, "reference", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSiteInput.prototype, "regionId", void 0);
CreateSiteInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSiteInput);
exports.CreateSiteInput = CreateSiteInput;
//# sourceMappingURL=create-site.input.js.map