import { Brand } from "./brand.entity";
import { BrandsService } from "./brands.service";
import { CreateBrandInput } from "./dto/create-brand.input";
export declare class BrandsResolver {
    private brandsService;
    constructor(brandsService: BrandsService);
    findAllBrand(first: number, after: number): Promise<Brand[]>;
    findBrandById(id: string): Promise<Brand>;
    createOrEditBrand(createBrandInput: CreateBrandInput, token: string): Promise<Brand | null>;
    deleteBrands(brandIds: Array<string>): Promise<boolean | null>;
}