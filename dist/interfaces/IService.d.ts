export interface IService<T, V> {
    findAll: (first: number, after?: string) => Promise<T[]>;
    findOne: (id: string) => Promise<T>;
    create: (data: V) => Promise<T>;
    update?: (id: string, data: V) => Promise<T | null>;
    delete?: (ids: Array<string>) => Promise<null | boolean>;
    login?: (login: string, password: string) => Promise<T | undefined>;
}
