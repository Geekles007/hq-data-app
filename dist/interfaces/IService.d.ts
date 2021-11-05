import { User } from "../users/user.entity";
export interface IService<T, V> {
    findAll: (first: number, after?: number) => Promise<any>;
    findOne: (id: string) => Promise<T>;
    create: (data: V) => Promise<T>;
    update?: (id: string, data: V) => Promise<T | null>;
    delete?: (ids: Array<string>) => Promise<null | boolean>;
    login?: (login: string, password: string) => Promise<T | undefined>;
}
export interface BaseService<T, V> {
    findAll: (first: number, after?: number) => any;
    findOne: (id: string) => Promise<T>;
    create: (data: V, connected?: User) => Promise<T>;
    update?: (id: string, data: V, connected?: User) => Promise<T | null>;
    delete?: (ids: Array<string>) => Promise<null | boolean>;
}
