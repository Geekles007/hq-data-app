import { Site } from "./site.entity";
import { SitesService } from "./sites.service";
import { CreateSiteInput } from "./dto/create-site.input";
import { PaginateSiteResult } from "./dto/PaginateSiteResult";
export declare class SitesResolver {
    private sitesService;
    constructor(sitesService: SitesService);
    findAllSite(first: number, after: number): Promise<PaginateSiteResult>;
    findSiteById(id: string): Promise<Site>;
    createOrEditSite(createSiteInput: CreateSiteInput, token: string): Promise<Site | null>;
    deleteSites(siteIds: Array<string>): Promise<boolean | null>;
}
