import {IProvider} from "../providers/IProvider";
import {Harvi} from "../Harvi";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export abstract class Provider<T> implements IProvider<T> {


    name: string;
    private modelProvider;

    constructor(name: string, schema: any, private populate?: string) {
        this.name = name;
        let mSchema = new Schema(schema);
        this.modelProvider = mongoose.model(this.name, mSchema);
    }


    findAsync(query: any): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            let querying = this.modelProvider.find(query);
            if (this.populate) {
                querying = querying.populate(this.populate);
            }

            querying.exec((err, founds: Array<T>) => {
                if (err) {
                    Harvi.logger.error(err);
                    reject(err);
                } else {
                    resolve(founds);
                }
            })

        });
    }

    async findOneAsync(id: string): Promise<T> {
        let founds = await this.findAsync({_id: id});
        if (founds[0]) {
            return founds[0];
        } else {
            return null;
        }
    }


    async findOrCreateAsync(query: any): Promise<T> {
        let found: Array<T> = await this.findAsync(query);
        if (found.length > 0) {
            //Should be never > 1
            return found[0];
        } else {
            return await this.createAsync(query);
        }
    }

    createAsync(data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.modelProvider.create(data, (err, created: T) => {
                if (err) {
                    Harvi.logger.error(err);
                    reject(err);
                } else {
                    resolve(created);
                }
            });
        });
    }

    updateAsync(id: string, data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.modelProvider.update({_id: id}, data, (err, updated: T) => {
                if (err) {
                    Harvi.logger.error(err);
                    reject(err);
                } else {
                    resolve(updated);
                }
            });
        });
    }

    deleteAsync(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.modelProvider.remove({_id: id}, (err, created: T) => {
                if (err) {
                    Harvi.logger.error(err);
                    reject(err);
                } else {
                    resolve(created);
                }
            });
        });
    }

}