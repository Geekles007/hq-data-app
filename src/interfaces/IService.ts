export interface IService<T, V> {
    findAll(): Promise<Array<T>>;
    create(data: V): Promise<T>;
}