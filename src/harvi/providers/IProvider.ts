export interface IProvider<T> {

    name: string;

    findAsync(query: any): Promise<Array<T>>

    findOneAsync(query: any): Promise<T>

    findOrCreateAsync(query: any): Promise<T>;

    createAsync(data: any): Promise<T>;

    updateAsync(id: string, data: any): Promise<T>;

    deleteAsync(id: string): Promise<T>;

}
